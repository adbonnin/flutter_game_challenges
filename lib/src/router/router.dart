import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/presentation/challenge_details/challenge_details_screen.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/presentation/challenge_list/challenge_list_screen.dart';
import 'package:flutter_game_challenges/src/features/settings/presentation/settings_screen.dart';
import 'package:flutter_game_challenges/src/features/home/presentation/home_shell_scaffold.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'router.g.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'root');
final _shellNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'shell');
final _challengesNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'challenges');
final _settingsNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'settings');

@Riverpod(keepAlive: true)
GoRouter router(RouterRef ref) {
  return GoRouter(
    routes: $appRoutes,
    redirect: (c, s) => _redirect(c, ref, s),
    refreshListenable: _RouterChangeNotifier(ref),
    debugLogDiagnostics: kDebugMode,
    navigatorKey: _rootNavigatorKey,
    initialLocation: const ChallengeListRoute().location,
  );
}

Future<String?> _redirect(BuildContext context, Ref ref, GoRouterState state) async {
  return null;
}

class _RouterChangeNotifier extends ChangeNotifier {
  _RouterChangeNotifier(Ref ref);
}

@TypedStatefulShellRoute<HomeShellRoute>(
  branches: [
    TypedStatefulShellBranch<ChallengesBranch>(
      routes: [
        TypedGoRoute<ChallengeListRoute>(
          path: '/challenges',
          routes: [
            TypedGoRoute<ChallengeDetailsRoute>(
              path: ':title',
            ),
          ],
        ),
      ],
    ),
    TypedStatefulShellBranch<SettingsBranch>(
      routes: [
        TypedGoRoute<SettingsRoute>(
          path: '/games',
        )
      ],
    ),
  ],
)
class HomeShellRoute extends StatefulShellRouteData {
  const HomeShellRoute();

  static final $navigatorKey = _shellNavigatorKey;

  @override
  Widget builder(BuildContext context, GoRouterState state, StatefulNavigationShell navigationShell) {
    return HomeShellScaffold(
      navigationShell: navigationShell,
    );
  }
}

class ChallengesBranch extends StatefulShellBranchData {
  const ChallengesBranch();

  static final $navigatorKey = _challengesNavigatorKey;
}

class SettingsBranch extends StatefulShellBranchData {
  const SettingsBranch();

  static final $navigatorKey = _settingsNavigatorKey;
}

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

class SettingsRoute extends GoRouteData {
  const SettingsRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const SettingsScreen();
  }
}
