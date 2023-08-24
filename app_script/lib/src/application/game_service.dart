import 'package:app_script/src/data/game_repository.dart';
import 'package:app_script/src/domain/game.dart';
import 'package:google_apps_script/google_apps_script.dart';

class GameService {
  const GameService(this.ss);

  final Spreadsheet ss;

  Iterable<Game> findByTitles(Set<String> titles) {
    final repo = GameRepository(ss: ss);
    return repo.findByTitles(titles).map(toModel);
  }

  Game toModel(GameRow row) {
    return Game(
      title: row.title,
    );
  }
}
