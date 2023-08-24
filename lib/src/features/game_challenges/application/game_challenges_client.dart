import 'package:dio/dio.dart';
import 'package:flutter_game_challenges/src/app.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/domain/achievement.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/domain/challenge.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/domain/twitch_auth.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'game_challenges_client.g.dart';

@Riverpod(keepAlive: true)
GameChallengeClient gameChallengeClient(GameChallengeClientRef ref) {
  final config = ref.watch(configProvider);
  return GameChallengeClient(config.appDeploymentId);
}

class GameChallengeClient {
  GameChallengeClient(
    String projectId,
  ) : httpClient = buildHttpClient(projectId);

  final Dio httpClient;

  static Dio buildHttpClient(String projectId) {
    return Dio(
      BaseOptions(
        baseUrl: 'https://script.google.com/macros/s/$projectId/exec',
      ),
    );
  }

  Future<List<Challenge>> getChallenges() async {
    final resp = await _get('getChallenges');
    return Challenge.fromJsonList(resp.data);
  }

  Future<Challenge> getChallenge(String title) async {
    final queryParameters = {
      'title': title,
    };

    final resp = await _get(
      'getChallenge',
      queryParameters: queryParameters,
    );

    return Challenge.fromJson(resp.data);
  }

  Future<List<Achievement>> getAchievementsByChallenge(String challenge) async {
    final queryParameters = {
      'challenge': challenge,
    };

    final resp = await _get(
      'getAchievementsByChallenge',
      queryParameters: queryParameters,
    );

    return Achievement.fromJsonList(resp.data);
  }

  Future<TwitchAuh> authenticateToTwitch() async {
    final resp = await _get('authenticateToTwitch');
    return TwitchAuh.fromJson(resp.data);
  }

  Future<Response<dynamic>> _get(String action, {Map<String, dynamic>? queryParameters}) {
    return httpClient.get(
      '',
      queryParameters: {
        ...(queryParameters ?? const <String, dynamic>{}),
        'action': action,
      },
    );
  }
}
