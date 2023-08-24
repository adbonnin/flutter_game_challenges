class AchievementRepository {
  /**
   * @param {SpreadsheetApp.Spreadsheet} ss
   */
  constructor(ss) {
    this.ss = ss;
  }

  /**
   * @param {string} challenge
   * @returns {Object[]}
   */
  findByChallenge(challenge) {
    const sheet = this.ss.getSheetByName(SHEETS.achievements._name);
    const predicate = (value) => challenge == value[SHEETS.achievements.challenge];

    const values = _filterSheetContent(sheet, predicate);
    return this._toAchievements(values);
  }

  /**
   * @param {Object[][]} values
   * @returns {Object[]}
   */
  _toAchievements(values) {
    return values.map(this._toAchievement);
  }

  /**
   * @param {Object[]} value
   * @returns {Object}
   */
  _toAchievement(value) {
    return {
      challenge: value[SHEETS.achievements.challenge],
      participant: value[SHEETS.achievements.participant],
      date: value[SHEETS.achievements.date],
    }
  }
}