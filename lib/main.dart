import 'package:flutter/cupertino.dart';
import 'package:flutter_game_challenges/src/app.dart';

void main() {
  const config = Config(
    name: String.fromEnvironment('NAME'),
    appDeploymentId: String.fromEnvironment('APP_DEPLOYMENT_ID'),
    theGamesDbApiKey: String.fromEnvironment('THE_GAME_DB_API_KEY'),
  );

  runApp(const MyApp(config));
}
