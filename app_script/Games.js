/**
 * @returns {Object[]}
 */
function getGames(ss) {
  const sheet = ss.getSheetByName(SHEETS.games._name);

  const values = _filterSheetContent(sheet);
  return toGames(values);
}

/**
 * @param {SpreadsheetApp.Spreadsheet} ss
 * @param {Set<string>} titles
 * @returns {Object[]}
 */
function findGamesByTitles(ss, titles) {
  const sheet = ss.getSheetByName(SHEETS.games._name);
  const predicate = (value) => titles.has(value[SHEETS.games.title]);

  const values = _filterSheetContent(sheet, predicate);
  return toGames(values);
}

/**
 * @param {SpreadsheetApp.Spreadsheet} ss
 * @param {string} title
 * @returns {Object}
 */
function findGameByTitle(ss, title) {
  const sheet = ss.getSheetByName(SHEETS.games._name);
  const predicate = (value) => value[SHEETS.games.title] == title;

  const values = _filterSheetContent(sheet, predicate);
  return _first(toGames(values));
}

/**
 * @param {Object[][]} values
 * @returns {Object[]}
 */
function toGames(values) {

  function toGame(value) {
    return {
      title: value[SHEETS.games.title],
      theGamesDBId: value[SHEETS.games.theGamesDBId] || null,
    };
  }

  return values.map(toGame);
}

/**
 * @param {SpreadsheetApp.Spreadsheet} ss
 * @param {Object[]} games
 * @returns {Object}
 */
function toGamesDetails(ss, games) {
  
  function fixChallenge(challenge) {
    delete challenge.game;
    return challenge;
  }
  
  function toDetails(game) {
    const challenges = findChallengesByGame(ss, game.title);

    return {
      ...game,
      challenges: challenges.map(fixChallenge),
    };
  }

  return games.map(toDetails);
}
