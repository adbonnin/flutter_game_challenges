import 'package:app_script/src/data/repository.dart';

class GameRepository extends Repository<GameRow> {
  static const sheetName = 'Jeux vidéo';

  GameRepository({
    required super.ss,
    super.name = sheetName,
  });

  Iterable<GameRow> findByTitles(Set<String> titles) {
    bool predicateFn(List<dynamic> row) {
      final title = row[GameRow.titleIndex];
      return titles.contains(title);
    }

    return findAll(predicateFn);
  }

  @override
  GameRow? fromRow(List<dynamic> row) {
    if (row.length < 2) {
      print("Invalid Game row length; "
          "length: ${row.length}");
      return null;
    }

    final title = row[GameRow.titleIndex];
    final igdb = row[GameRow.igdbIndex];

    if (title is! String) {

      print("Missing required Game row fields; "
          "title: $title, "
          "igdb: $igdb");
      return null;
    }

    return GameRow(
      title: title,
      igdbId: igdb is String ? igdb : null,
    );
  }

  @override
  List<dynamic> toRow(GameRow value) {
    return [
      value.title,
      value.igdbId,
    ];
  }
}

class GameRow {
  static const titleIndex = 0;
  static const igdbIndex = 1;

  const GameRow({
    required this.title,
    this.igdbId,
  });

  final String title;
  final String? igdbId;
}
