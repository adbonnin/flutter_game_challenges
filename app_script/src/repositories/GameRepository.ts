import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import {Repository} from "./_Repository";
import {SHEETS} from "../Code";

export class GameRepository extends Repository<GameRow> {
  constructor(ss: Spreadsheet) {
    super(ss, SHEETS.games._name)
  }

  findByTitles(titles: Set<string>): GameRow[] {
    return this.findAll((value) => titles.has(value[SHEETS.games.title]));
  }

  toValue(object: any[]): GameRow | null {
    const title = object[SHEETS.games.title]
    const igdbId = object[SHEETS.games.igdbId]

    if (title == typeof String) {
      return null;
    }

    return {
      title: title,
      igdbId: igdbId == typeof String ? igdbId : null,
    }
  }
}

export interface GameRow {
  title: string
  igdbId: string
}
