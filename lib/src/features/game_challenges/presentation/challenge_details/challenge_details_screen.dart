import 'package:flutter/material.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/application/achievement_providers.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/domain/achievement.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/presentation/achievement_list/achievement_list_view.dart';
import 'package:flutter_game_challenges/src/widgets/async_value_widget.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ChallengeDetailsScreen extends ConsumerWidget {
  const ChallengeDetailsScreen({
    super.key,
    required this.title,
  });

  final String title;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final asyncAchievements = ref.watch(achievementsProvider(title));

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: theme.textTheme.headlineLarge,
        ),
        Expanded(
          child: AsyncValueWidget<List<Achievement>>(
            value: asyncAchievements,
            data: (achievements) => AchievementListView(
              achievements: achievements,
            ),
          ),
        ),
      ],
    );
  }
}
