import 'package:flutter/material.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/presentation/challenges/challenges_screen.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final configProvider = Provider<Config>((_) => //
    throw UnimplementedError("Environment provider must be overridden"));

class MyApp extends StatelessWidget {
  const MyApp(
    this.config, {
    super.key,
  });

  final Config config;

  @override
  Widget build(BuildContext context) {
    return ProviderScope(
      overrides: [
        configProvider.overrideWithValue(config),
      ],
      child: MaterialApp(
        title: 'Defis Jeux Vidéo',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.blueAccent),
          useMaterial3: true,
        ),
        home: const ChallengesScreen(),
      ),
    );
  }
}

class Config {
  const Config({
    required this.name,
    required this.appDeploymentId,
    required this.theGamesDbApiKey,
  });

  final String name;
  final String appDeploymentId;
  final String theGamesDbApiKey;
}
