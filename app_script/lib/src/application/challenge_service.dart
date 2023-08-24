import 'package:app_script/src/application/game_service.dart';
import 'package:app_script/src/data/challenge_repository.dart';
import 'package:app_script/src/domain/challenge.dart';
import 'package:collection/collection.dart';
import 'package:google_apps_script/google_apps_script.dart';

class ChallengeService {
  const ChallengeService(this.ss);

  final Spreadsheet ss;

  Iterable<Challenge> getAll() {
    final repo = ChallengeRepository(ss: ss);
    return toModels(repo.getAll());
  }

  Iterable<Challenge> toModels(Iterable<ChallengeRow> rows) {
    final gameService = GameService(ss);

    final gameTitles = rows.map((r) => r.game).toSet();
    final games = gameService.findByTitles(gameTitles);
    final gamesByTitle = games.groupFoldBy((g) => g.title, (g1, g2) => g2);

    Challenge? toValue(ChallengeRow row) {
      final game = gamesByTitle[row.game];

      if (game == null) {
        print("Achievement game can't be found; "
            "achievement: ${row.title}, "
            "game: ${row.game}");
        return null;
      }

      return Challenge(
        title: row.title,
        game: game,
      );
    }

    return rows.map(toValue).whereType<Challenge>();
  }
}
