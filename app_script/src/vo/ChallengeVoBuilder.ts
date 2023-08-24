import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import {GameRepository} from "../repositories/GameRepository";
import {_keyBy, _uniqueValues} from "../utils/ListUtils";
import {ChallengeRow} from "../repositories/ChallengeRepository";
import {Challenge} from "../domain/Challenge";

export class ChallengeVoBuilder {

  constructor(public ss: Spreadsheet) {
  }

  buildVos(rows: ChallengeRow[]): Challenge[] {
    const gamesRepo = new GameRepository(this.ss)

    const gameTitles = _uniqueValues(rows, (s) => s.game);
    const games = gamesRepo.findByTitles(gameTitles);
    const gamesByTitle = _keyBy(games, (g) => g.title);

    function toVo(row: ChallengeRow): Challenge {
      return {
        ...row,
        game: gamesByTitle[row.game],
      }
    }

    return rows.map(toVo)
  }
}