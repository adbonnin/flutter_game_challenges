import 'package:flutter_game_challenges/src/utils/json.dart';
import 'package:json_annotation/json_annotation.dart';

part 'game.g.dart';

@JsonSerializable()
class Game {
  const Game({
    required this.title,
    this.theGamesDBId,
  });

  final String title;
  final int? theGamesDBId;

  factory Game.fromJson(Map<String, dynamic> json) => //
      _$GameFromJson(json);

  Map<String, dynamic> toJson() => //
      _$GameToJson(this);
}
