import 'package:json_annotation/json_annotation.dart';

part 'twitch_auth.g.dart';

@JsonSerializable()
class TwitchAuh {
  const TwitchAuh({
    required this.clientId,
    required this.accessToken,
    required this.expiresIn,
    required this.tokenType,
  });

  final String clientId;
  final String accessToken;
  final int expiresIn;
  final String tokenType;

  bool hasExpired(DateTime now, DateTime authTime) {
    return now.isAfter(authTime.add(Duration(seconds: expiresIn)));
  }

  factory TwitchAuh.fromJson(Map<String, dynamic> json) => //
      _$TwitchAuhFromJson(json);

  Map<String, dynamic> toJson() => //
      _$TwitchAuhToJson(this);
}
