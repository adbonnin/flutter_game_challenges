class AchievementRepository extends Repository {
  /**
   * @param {SpreadsheetApp.Spreadsheet} ss
   */
  constructor(ss) {
    super(ss, SHEETS.achievements._name);
  }

  /**
   * @param {string} challenge
   * @returns {Object[]}
   */
  findByChallenge(challenge) {
    const predicate = (value) => value[SHEETS.achievements.challenge] === challenge;
    return this.findAll(predicate);
  }

  /**
   * @param {Object[]} value
   * @returns {Object}
   */
  fromRow(value) {
    return {
      challenge: String(value[SHEETS.achievements.challenge]),
      participant: String(value[SHEETS.achievements.participant]),
      date: Date(value[SHEETS.achievements.date]) || null,
    }
  }
}