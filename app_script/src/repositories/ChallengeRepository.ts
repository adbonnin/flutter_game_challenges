import {SHEETS} from "../Code";
import {Repository} from "./_Repository";
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;

export class ChallengeRepository extends Repository<ChallengeRow> {
  constructor(ss: Spreadsheet) {
    super(ss, SHEETS.challenges._name)
  }

  findByTitle(title: String): ChallengeRow {
    const predicate = (row) => row[SHEETS.challenges.title] === title;

    const rows = this.findAll(predicate);
    return rows && rows[0];
  }

  toValue(object: any[]): ChallengeRow | null {
    const title = object[SHEETS.challenges.title]
    const game = object[SHEETS.challenges.game]
    const creator = object[SHEETS.challenges.creator]
    const description = object[SHEETS.challenges.description]

    if (title != typeof String || game != typeof String) {
      return null
    }

    return {
      title: title,
      game: game,
      creator: creator == typeof String ? creator : null,
      description: description == typeof String ? description : null,
    };
  }
}

export interface ChallengeRow {
  title: string
  game: string
  creator?: string
  description?: string
}