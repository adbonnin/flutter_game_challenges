import 'package:flutter/cupertino.dart';
import 'package:flutter_game_challenges/src/app.dart';

void main() {
  const config = Config(
    name: String.fromEnvironment('NAME'),
    appDeploymentId: String.fromEnvironment('APP_DEPLOYMENT_ID'),
  );

  runApp(const MyApp(config));
}
