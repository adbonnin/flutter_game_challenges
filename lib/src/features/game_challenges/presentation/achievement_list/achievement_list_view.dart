import 'package:flutter/material.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/domain/achievement.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/presentation/achievement_list/achievement_list_tile.dart';

class AchievementListView extends StatelessWidget {
  const AchievementListView({
    super.key,
    required this.achievements,
  });

  final List<Achievement> achievements;

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemBuilder: _buildItem,
      itemCount: achievements.length,
    );
  }

  Widget _buildItem(BuildContext context, int index) {
    final achievement = achievements[index];

    return AchievementListTile(
      achievement,
    );
  }
}
