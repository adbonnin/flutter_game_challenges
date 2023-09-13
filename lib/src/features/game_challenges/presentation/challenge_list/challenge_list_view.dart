import 'package:flutter/material.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/domain/challenge.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/presentation/challenge_list/challenge_list_tile.dart';

class ChallengesListView extends StatelessWidget {
  const ChallengesListView({
    super.key,
    required this.challenges,
    required this.onChallengePressed,
  });

  final List<Challenge> challenges;
  final ValueChanged<Challenge> onChallengePressed;

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemBuilder: _buildItem,
      itemCount: challenges.length,
    );
  }

  Widget _buildItem(BuildContext context, int index) {
    final challenge = challenges[index];

    return ChallengeListTile(
      challenge,
      onTap: () => onChallengePressed(challenge),
    );
  }
}
