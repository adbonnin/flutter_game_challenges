import 'package:flutter/material.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/domain/challenge.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/presentation/challenges/challenge_card.dart';

class ChallengesGridView extends StatelessWidget {
  const ChallengesGridView(
    this.challenges, {
    super.key,
  });

  final List<Challenge> challenges;

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3,
        childAspectRatio: 1.4,
      ),
      itemBuilder: (_, index) => _buildItem(challenges[index]),
      itemCount: challenges.length,
    );
  }

  Widget _buildItem(Challenge game) {
    return ChallengeCard(game);
  }
}
