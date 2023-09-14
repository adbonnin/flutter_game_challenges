import 'package:flutter/material.dart';
import 'package:flutter_game_challenges/src/l10n/app_localizations_context.dart';

class SettingsScreen extends StatelessWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Text(
      context.loc.settings_title,
      style: theme.textTheme.headlineLarge,
    );
  }
}
