import 'package:flutter/material.dart';
import 'package:flutter_game_challenges/src/l10n/app_localizations_context.dart';
import 'package:flutter_game_challenges/src/router/router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

part 'app.g.dart';

@Riverpod(keepAlive: true)
Config config(ConfigRef ref) {
  throw UnimplementedError("Environment provider must be overridden");
}

void launchApp(Config config) {
  final overrides = [
    configProvider.overrideWithValue(config),
  ];

  runApp(
    ProviderScope(
      overrides: overrides,
      child: const MyApp(),
    ),
  );
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);

    return MaterialApp.router(
      onGenerateTitle: (context) => context.loc.app_title,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blueAccent),
        useMaterial3: true,
      ),
      routerConfig: router,
      localizationsDelegates: AppLocalizations.localizationsDelegates,
      supportedLocales: AppLocalizations.supportedLocales,
    );
  }
}

class Config {
  const Config({
    required this.name,
    required this.appDeploymentId,
  });

  final String name;
  final String appDeploymentId;
}
