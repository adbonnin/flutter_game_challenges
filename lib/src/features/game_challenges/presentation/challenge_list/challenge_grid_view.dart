import 'package:flutter/material.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/domain/challenge.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/presentation/challenge_list/challenge_card.dart';
import 'package:flutter_game_challenges/src/router/router.dart';

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
        crossAxisCount: 2,
        childAspectRatio: 1.4,
      ),
      itemBuilder: (_, index) => _buildItem(context, challenges[index]),
      itemCount: challenges.length,
    );
  }

  Widget _buildItem(BuildContext context, Challenge challenge) {
    return ChallengeCard(
      challenge,
      onPressed: () => _onChallengeCardPressed(context, challenge),
    );
  }

  void _onChallengeCardPressed(BuildContext context, Challenge challenge) {
    ChallengeDetailsRoute(title: challenge.title).go(context);
  }
}
