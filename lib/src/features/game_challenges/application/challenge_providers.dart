import 'package:flutter_game_challenges/src/features/game_challenges/data/game_challenges_client.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/domain/challenge.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'challenge_providers.g.dart';

@riverpod
Future<List<Challenge>> challenges(ChallengesRef ref) {
  return ref.read(gameChallengeClientProvider).getChallenges();
}

@riverpod
Future<Challenge> challenge(ChallengeRef ref, String title) {
  return ref.read(gameChallengeClientProvider).getChallenge(title);
}
