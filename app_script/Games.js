class Game {
  constructor(title, theGamesDBId) {
    this.title = title,
      this.theGamesDBId = theGamesDBId;
  }
}

class GameRepository {
  constructor(ss) {
    this.ss = ss;
  }

  /**
   * @param {Set<string>} titles
   * @returns {Game[]}
   */
  findByTitles(titles) {
    const sheet = this.ss.getSheetByName(SHEETS.games._name);
    const predicate = (value) => titles.has(value[SHEETS.games.title]);

    const values = _filterSheetContent(sheet, predicate);
    return this._toGames(values);
  }

  /**
   * @param {Object[][]} values
   * @returns {Game[]}
   */
  _toGames(values) {
    return values.map(this._toGame);
  }

  /**
   * @param {Object[]} value
   * @returns {Game}
   */
  _toGame(value) {
    return new Game(
      value[SHEETS.games.title],
      value[SHEETS.games.theGamesDBId] || null,
    );
  }
}
