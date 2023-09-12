import 'package:flutter/material.dart';
import 'package:flutter_game_challenges/src/features/game_challenges/domain/challenge.dart';

class ChallengeCard extends StatelessWidget {
  const ChallengeCard(
    this.challenge, {
    super.key,
    this.onPressed,
  });

  final Challenge challenge;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(24),
      ),
      clipBehavior: Clip.antiAliasWithSaveLayer,
      child: InkWell(
        onTap: onPressed,
        child: SizedBox(
          width: 185,
          height: 265,
          child: Stack(
            children: [
              Positioned(
                left: 0,
                right: 0,
                bottom: 0,
                child: Container(
                  color: theme.colorScheme.primary.withOpacity(0.9),
                  child: Padding(
                    padding: const EdgeInsets.all(12),
                    child: Text(
                      challenge.game.title,
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
