import 'package:dio/dio.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/application/game_challenges_client.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/domain/twitch_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'igdb_client.g.dart';

@Riverpod(keepAlive: true)
IgdbClient igdbClient(IgdbClientRef ref) {
  return IgdbClient(ref);
}

class IgdbClient {
  IgdbClient(
    Ref ref,
  ) : httpClient = buildHttpClient(ref);

  final Dio httpClient;

  static Dio buildHttpClient(Ref ref) {
    final httpClient = Dio(
      BaseOptions(
        baseUrl: 'https://api.igdb.com/v4',
      ),
    );

    httpClient.interceptors.add(IgdbAuthInterceptor(ref));
    return httpClient;
  }

  Future<List<int>> getCover(String id) async {
    final resp = await httpClient.get('/covers/$id');
    return [0];
  }
}

class IgdbAuthInterceptor extends Interceptor {
  IgdbAuthInterceptor(
    this.ref,
  ) : authTime = DateTime.now();

  final Ref ref;

  DateTime authTime;
  TwitchAuh? auth;

  @override
  Future<void> onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    final now = DateTime.now();
    var tmpAuth = auth;

    if (tmpAuth == null || tmpAuth.hasExpired(now, authTime)) {
      tmpAuth = await _refreshAuth(now);
    }

    options.headers['Client-ID'] = tmpAuth.clientId;
    options.headers['Authorization'] = 'Bearer ${tmpAuth.accessToken}';
    handler.next(options);
  }

  Future<TwitchAuh> _refreshAuth(DateTime now) async {
    final newAuth = await ref.read(gameChallengeClientProvider).authenticateToTwitch();
    authTime = now;
    return auth = newAuth;
  }
}
