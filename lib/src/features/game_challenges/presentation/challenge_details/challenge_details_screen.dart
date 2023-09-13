import 'package:flutter/material.dart';
import 'package:flutter_game_challenges/src/router/main_scaffold.dart';

class ChallengeDetailsScreen extends StatelessWidget {
  const ChallengeDetailsScreen({
    super.key,
    required this.title,
  });

  final String title;

  @override
  Widget build(BuildContext context) {
    return MainScaffold(
      body: Center(
        child: Text(title),
      ),
    );
  }
}
