import 'package:flutter/material.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/application/challenge_providers.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/domain/challenge.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/presentation/challenge_list/challenge_list_view.dart';
import 'package:flutter_game_challenges/src/l10n/app_localizations_context.dart';
import 'package:flutter_game_challenges/src/router/main_scaffold.dart';
import 'package:flutter_game_challenges/src/router/router.dart';
import 'package:flutter_game_challenges/src/widgets/async_value_widget.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ChallengeListScreen extends ConsumerWidget {
  const ChallengeListScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);
    final asyncChallenges = ref.watch(challengesProvider);

    return MainScaffold(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            context.loc.challenge_list_title,
            style: theme.textTheme.headlineLarge,
          ),
          Expanded(
            child: AsyncValueWidget<List<Challenge>>(
              value: asyncChallenges,
              data: (challenges) => ChallengesListView(
                challenges: challenges,
                onChallengePressed: (c) => _onChallengePressed(context, c),
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _onChallengePressed(BuildContext context, Challenge challenge) {
    ChallengeDetailsRoute(title: challenge.title).go(context);
  }
}
