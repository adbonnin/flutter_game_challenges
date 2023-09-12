import 'package:flutter_game_challenges/src/features/game_challenges/data/game_challenges_client.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/domain/achievement.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'achievement_providers.g.dart';

@riverpod
Future<List<Achievement>> achievements(AchievementsRef ref, String challenge) {
  return ref.read(gameChallengeClientProvider).getAchievementsByChallenge(challenge);
}
