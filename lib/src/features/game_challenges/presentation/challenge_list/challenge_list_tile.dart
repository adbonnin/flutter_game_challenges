import 'package:flutter/material.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/domain/challenge.dart';

class ChallengeListTile extends StatelessWidget {
  const ChallengeListTile(
    this.challenge, {
    super.key,
    this.onTap,
  });

  final Challenge challenge;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.antiAliasWithSaveLayer,
      child: ListTile(
        onTap: onTap,
        title: Text(challenge.title),
      ),
    );
  }
}
