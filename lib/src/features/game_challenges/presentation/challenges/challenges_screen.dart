import 'package:flutter/material.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/application/game_challenges_providers.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/domain/challenge.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/presentation/challenges/challenge_card.dart';
import 'package:flutter_game_challenges/src/widgets/async_value_widget.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ChallengesScreen extends ConsumerWidget {
  const ChallengesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncChallenges = ref.watch(challengesProvider);

    return Scaffold(
      body: AsyncValueWidget<List<Challenge>>(
        value: asyncChallenges,
        data: (challenges) => GridView.builder(
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            childAspectRatio: 1.4,
          ),
          itemBuilder: (_, index) => _buildItem(challenges[index]),
          itemCount: challenges.length,
        ),
      ),
    );
  }

  Widget _buildItem(Challenge game) {
    return ChallengeCard(game);
  }
}
