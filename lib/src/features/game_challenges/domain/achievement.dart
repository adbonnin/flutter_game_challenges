import 'package:flutter_game_challenges/src/utils/json.dart';
import 'package:json_annotation/json_annotation.dart';

part 'achievement.g.dart';

@JsonSerializable()
class Achievement {
  const Achievement({
    required this.participant,
    required this.date,
  });

  final String participant;
  final DateTime date;

  factory Achievement.fromJson(Map<String, dynamic> json) => //
      _$AchievementFromJson(json);

  static List<Achievement> fromJsonList(Object? json) => //
      Json.fromList(json, Achievement.fromJson);

  Map<String, dynamic> toJson() => //
      _$AchievementToJson(this);
}
