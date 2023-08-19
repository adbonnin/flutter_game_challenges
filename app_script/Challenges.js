/**
 * @param {SpreadsheetApp.Spreadsheet} ss
 * @returns {Object[]}
 */
function getChallenges(ss) {
  const sheet = ss.getSheetByName(SHEETS.challenges._name);

  const values = _filterSheetContent(sheet);
  return toChallenges(values);
}

/**
 * @param {SpreadsheetApp.Spreadsheet} ss
 * @param {string} title
 * @returns {Object[]}
 */
function findChallengeByTitle(ss, title) {
  const sheet = ss.getSheetByName(SHEETS.challenges._name);
  const predicate = (value) => value[SHEETS.challenges.title] === title;

  const values = _filterSheetContent(sheet, predicate);
  return _first(toChallenges(values));
}

/**
 * @param {SpreadsheetApp.Spreadsheet} ss
 * @param {string} game
 * @returns {Object[]}
 */
function findChallengesByGame(ss, game) {
  const sheet = ss.getSheetByName(SHEETS.challenges._name);
  const predicate = (value) => value[SHEETS.challenges.game] === game;

  const values = _filterSheetContent(sheet, predicate);
  return toChallenges(values);
}

/**
 * @param {SpreadsheetApp.Spreadsheet} ss
 * @param {Object[][]} values
 * @returns {Object[]}
 */
function toChallenges(values) {

  function toChallenge(value) {
    return {
      title: value[SHEETS.challenges.title],
      game: value[SHEETS.challenges.game], 
      creator: value[SHEETS.challenges.creator],
      description: value[SHEETS.challenges.description],
    }
  }

  return values.map(toChallenge);
}

/**
 * @param {SpreadsheetApp.Spreadsheet} ss
 * @param {Object[][]} values
 * @returns {Object[]}
 */
function toChallengesDetails(ss, challenges) {
  const gameTitles = _uniqueValues(challenges, 'game');
  const gamesByTitle = _keyBy(findGamesByTitles(ss, gameTitles), 'title');
  
  function fixAchievement(achivement) {
    delete achivement.challenge;
    return achivement;
  }

  function toDetail(challenge) {
    const game = gamesByTitle.get(challenge.game);
    const achievements = findAchievementsByChallenge(ss, challenge.title) || [];

    return {
      ...challenge,
      game: game,
      achivements: achievements.map(fixAchievement),
    }
  }

  return challenges.map(toDetail);
}
