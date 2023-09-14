import 'package:flutter/material.dart';
import 'package:flutter_adaptive_scaffold/flutter_adaptive_scaffold.dart';
import 'package:flutter_game_challenges/src/l10n/app_localizations_context.dart';
import 'package:go_router/go_router.dart';

class HomeShellScaffold extends StatelessWidget {
  const HomeShellScaffold({
    super.key,
    required this.navigationShell,
  });

  final StatefulNavigationShell navigationShell;

  @override
  Widget build(BuildContext context) {
    final currentIndex = navigationShell.currentIndex;

    return AdaptiveScaffold(
      selectedIndex: currentIndex,
      onSelectedIndexChange: _onSelectedIndexChange,
      destinations: [
        NavigationDestination(
          icon: const Icon(Icons.sports_esports_outlined),
          selectedIcon: const Icon(Icons.sports_esports),
          label: context.loc.challenge_list_title,
        ),
        NavigationDestination(
          icon: const Icon(Icons.settings_outlined),
          selectedIcon: const Icon(Icons.settings),
          label: context.loc.settings_title,
        ),
      ],
      body: (_) => Padding(
        padding: const EdgeInsets.all(12),
        child: navigationShell,
      ),
      useDrawer: false,
    );
  }

  void _onSelectedIndexChange(int index) {
    navigationShell.goBranch(index, initialLocation: index == navigationShell.currentIndex);
  }
}
