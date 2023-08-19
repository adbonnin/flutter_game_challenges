
/**
 * @param {SpreadsheetApp.Spreadsheet} ss
 * @param {Set<string>} challenge
 * @returns {Object[]}
 */
function findAchievementsByChallenge(ss, challenge) {
  const sheet = ss.getSheetByName(SHEETS.achievements._name);
  const predicate = (value) => challenge == value[SHEETS.achievements.challenge];

  const values = _filterSheetContent(sheet, predicate);
  return toAchievements(values);
}

/**
 * @param {SpreadsheetApp.Spreadsheet} ss
 * @param {Object[][]} values
 * @returns {Object[]}
 */
function toAchievements(values) {

  function toAchievement(value) {
    return {
      challenge: value[SHEETS.achievements.challenge],
      participant: value[SHEETS.achievements.participant],
      date: value[SHEETS.achievements.date],
    };
  }

  return values.map(toAchievement);
}
