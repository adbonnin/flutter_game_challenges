import 'package:flutter/material.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/domain/achievement.dart';

class AchievementListTile extends StatelessWidget {
  const AchievementListTile(
    this.achievement, {
    super.key,
  });

  final Achievement achievement;

  @override
  Widget build(BuildContext context) {
    return Card(
      clipBehavior: Clip.antiAliasWithSaveLayer,
      child: ListTile(
        title: Text(achievement.participant),
      ),
    );
  }
}
