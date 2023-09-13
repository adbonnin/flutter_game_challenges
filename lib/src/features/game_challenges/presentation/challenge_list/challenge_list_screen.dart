import 'package:flutter/material.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/application/challenge_providers.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/domain/challenge.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/presentation/challenge_list/challenge_grid_view.dart';
import 'package:flutter_game_challenges/src/router/main_scaffold.dart';
import 'package:flutter_game_challenges/src/widgets/async_value_widget.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ChallengeListScreen extends ConsumerWidget {
  const ChallengeListScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final asyncChallenges = ref.watch(challengesProvider);

    return MainScaffold(
      body: AsyncValueWidget<List<Challenge>>(
        value: asyncChallenges,
        data: (challenges) => ChallengesGridView(challenges),
      ),
    );
  }
}
