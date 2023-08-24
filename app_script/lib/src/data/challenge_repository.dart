import 'package:app_script/src/data/repository.dart';

class ChallengeRepository extends Repository<ChallengeRow> {
  static const sheetName = 'Défis';

  const ChallengeRepository({
    required super.ss,
    super.name = sheetName,
  });

  @override
  ChallengeRow? fromRow(List<dynamic> row) {
    if (row.length < 4) {
      print("Invalid Challenge row length; "
          "length: ${row.length}");
      return null;
    }

    final title = row[ChallengeRow.challengeIndex];
    final game = row[ChallengeRow.gameIndex];
    final participant = row[ChallengeRow.participantIndex];
    final description = row[ChallengeRow.dateIndex];

    if (title is! String || game is! String) {
      print("Missing required Challenge row fields; "
          "title: $title, "
          "game: $game");
      return null;
    }

    return ChallengeRow(
      title: title,
      game: game,
      creator: participant is String ? participant : null,
      description: description is String ? description : null,
    );
  }

  @override
  List<dynamic> toRow(ChallengeRow value) {
    return [
      value.title,
      value.game,
      value.creator,
      value.description,
    ];
  }
}

class ChallengeRow {
  static const challengeIndex = 0;
  static const gameIndex = 1;
  static const participantIndex = 2;
  static const dateIndex = 3;

  const ChallengeRow({
    required this.title,
    required this.game,
    this.creator,
    this.description,
  });

  final String title;
  final String game;
  final String? creator;
  final String? description;
}
