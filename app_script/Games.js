class GameRepository extends Repository {
  constructor(ss) {
    super(ss, SHEETS.games._name)
  }

  /**
   * @param {string[]} titles
   * @returns {Object[]}
   */
  findByTitles(titles) {
    const predicate = (value) => titles.includes(value[SHEETS.games.title])
    return this.findAll(predicate)
  }

  /**
   * @param {Object[]} row
   * @returns {Object}
   */
  fromRow(row) {
    return {
      title: String(row[SHEETS.games.title]),
    }
  }
}
