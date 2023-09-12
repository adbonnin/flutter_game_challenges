import 'package:json_annotation/json_annotation.dart';

part 'game.g.dart';

@JsonSerializable()
class Game {
  const Game({
    required this.title,
  });

  final String title;

  factory Game.fromJson(Map<String, dynamic> json) => //
      _$GameFromJson(json);

  Map<String, dynamic> toJson() => //
      _$GameToJson(this);
}
