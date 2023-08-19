class AchievementRepository {
  constructor(ss) {
    this.ss = ss;
  }

  /**
   * @param {string} challenge
   * @returns {Achievement[]}
   */
  findAchievementsByChallenge(challenge) {
    const sheet = this.ss.getSheetByName(SHEETS.achievements._name);
    const predicate = (value) => challenge == value[SHEETS.achievements.challenge];

    const values = _filterSheetContent(sheet, predicate);
    return this._toAchievements(values);
  }

  /**
   * @param {Object[][]} values
   * @returns {Achievement[]}
   */
  _toAchievements(values) {

    function toAchievement(value) {
      return new Achievement(
        value[SHEETS.achievements.challenge],
        value[SHEETS.achievements.participant],
        value[SHEETS.achievements.date],
      );
    }

    return values.map(toAchievement);
  }
}

class Achievement {
  constructor(challenge, participant, date) {
    this.challenge = challenge;
    this.participant = participant;
    this.date = date;
  }
}