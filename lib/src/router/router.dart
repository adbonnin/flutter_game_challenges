import 'package:flutter/widgets.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/presentation/challenge_details/challenge_details_screen.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/presentation/challenge_list/challenge_list_screen.dart';
import 'package:go_router/go_router.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'router.g.dart';

@Riverpod(keepAlive: true)
GoRouter router(RouterRef ref) {
  return GoRouter(
    routes: $appRoutes,
  );
}

@TypedGoRoute<ChallengeListRoute>(
  path: '/',
  routes: [
    TypedGoRoute<ChallengeDetailsRoute>(
      path: ':title',
    ),
  ],
)
class ChallengeListRoute extends GoRouteData {
  const ChallengeListRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const ChallengeListScreen();
  }
}

class ChallengeDetailsRoute extends GoRouteData {
  const ChallengeDetailsRoute({required this.title});

  final String title;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return ChallengeDetailsScreen(title: title);
  }
}
