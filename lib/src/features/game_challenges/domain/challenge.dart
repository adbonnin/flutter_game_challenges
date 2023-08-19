import 'package:flutter_game_challenges/src/features/game_challenges/domain/game.dart';
import 'package:flutter_game_challenges/src/utils/json.dart';
import 'package:json_annotation/json_annotation.dart';

part 'challenge.g.dart';

@JsonSerializable()
class Challenge {
  const Challenge({
    required this.title,
    required this.game,
    this.creator = '',
    this.description = '',
  });

  final String title;
  final Game game;
  final String creator;
  final String description;

  factory Challenge.fromJson(Map<String, dynamic> json) => //
      _$ChallengeFromJson(json);

  static List<Challenge> fromJsonList(Object? json) => //
      Json.fromList(json, Challenge.fromJson);

  Map<String, dynamic> toJson() => //
      _$ChallengeToJson(this);
}
