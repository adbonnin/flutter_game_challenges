import 'package:app_script/src/data/repository.dart';

class AchievementRepository extends Repository<AchievementRow> {
  static const sheetName = 'Réussites';

  AchievementRepository({
    required super.ss,
    super.name = sheetName,
  });

  @override
  AchievementRow? fromRow(List<dynamic> row) {
    if (row.length < 3) {
      print("Invalid Achievement row length; "
          "length: ${row.length}");
      return null;
    }

    final challenge = row[AchievementRow.challengeIndex];
    final participant = row[AchievementRow.participantIndex];
    final date = row[AchievementRow.dateIndex];

    if (challenge is! String || participant is! String) {
      print("Missing required Achievement row fields; "
          "challenge: $challenge, "
          "participant: $participant");
      return null;
    }

    return AchievementRow(
      challenge: challenge,
      participant: participant,
      date: date is DateTime ? date : null,
    );
  }

  @override
  List<dynamic> toRow(AchievementRow value) {
    return [
      value.challenge,
      value.participant,
      value.date,
    ];
  }
}

class AchievementRow {
  static const challengeIndex = 0;
  static const participantIndex = 1;
  static const dateIndex = 2;

  AchievementRow({
    required this.challenge,
    required this.participant,
    this.date,
  });

  final String challenge;
  final String participant;
  final DateTime? date;
}
