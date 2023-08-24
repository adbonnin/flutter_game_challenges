import 'package:app_script/src/utils/json.dart';
import 'package:json_annotation/json_annotation.dart';

part 'achievement.g.dart';

@JsonSerializable()
class Achievement {
  const Achievement({
    required this.title,
  });

  final String title;

  factory Achievement.fromJson(Map<String, dynamic> json) => //
      _$AchievementFromJson(json);

  static List<Achievement> fromJsonList(Object? json) => //
      Json.fromList(json, Achievement.fromJson);

  Map<String, dynamic> toJson() => //
      _$AchievementToJson(this);
}
