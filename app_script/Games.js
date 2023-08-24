class GameRepository {
  constructor(ss) {
    this.ss = ss;
  }

  /**
   * @param {string[]} titles
   * @returns {Object[]}
   */ 
  findByTitles(titles) {
    const sheet = this.ss.getSheetByName(SHEETS.games._name);
    const predicate = (value) => titles.includes(value[SHEETS.games.title]);

    const values = _filterSheetContent(sheet, predicate);
    return this._toGames(values);
  }

  /**
   * @param {Object[][]} values
   * @returns {Object[]}
   */
  _toGames(values) {
    return values.map(this._toGame);
  }

  /**
   * @param {Object[]} value
   * @returns {Object}
   */
  _toGame(value) {
    return {
      title: value[SHEETS.games.title],
      igdbId: value[SHEETS.games.igdbId] || null,
    }
  }
}
