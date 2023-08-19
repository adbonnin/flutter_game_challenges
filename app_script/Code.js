// API Documentation : https://developers.google.com/apps-script/reference/spreadsheet?hl=en

const SHEETS = {
  achievements: {
    _name: 'Réussites',
    challenge: 0,
    participant: 1,
    date: 2,
  },
  challenges: {
    _name: 'Défis',
    title: 0,
    game: 1,
    creator: 2,
    description: 3,
  },
  games: {
    _name: 'Jeux vidéo',
    title: 0,
    theGamesDBId: 1,
  },
  participants: {
    _name: 'Participants',
    name: 0,
  },
}

function doGet(request) {
  const action = request.parameter.action;

  if (action == 'getChallenges') {
    return doGetChallenges();
  }

  if (action == 'getGames') {
    return doGetGames();
  }

  if (action == 'getGameDetails') {
    return doGetGameDetails(request.parameter.game);
  }

  if (action == 'getAchievementsByChallenge') {
    return doGetAchievementsByChallenge(request.parameter.challenge);
  }
}

function doGetChallenges() {
  const ss = SpreadsheetApp.getActive();

  const challenges = getChallenges(ss);
  return _createJsonOutput(challenges);
}

function doGetGames() {
  const ss = SpreadsheetApp.getActive();

  const games = getGames(ss);
  return _createJsonOutput(games);
}

/**
 * @param {string} game
 */
function doGetGameDetails(title) {
  const ss = SpreadsheetApp.getActive();

  const game = findGameByTitle(ss, title);
  const gameDetails = game && _first(toGamesDetails(ss, [game]));
  return _createJsonOutput(gameDetails);
}

/**
 * @param {string} challenge
 */
function doGetAchievementsByChallenge(challenge) {
  const ss = SpreadsheetApp.getActive();

  function fixAchivement(achivement) {
    delete achivement.challenge;
    return achivement;
  }

  const achievements = findAchievementsByChallenge(ss, challenge);
  return _createJsonOutput(achievements.map(fixAchivement));
}

/**
 * @param {Object} value
 */
function _createJsonOutput(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON)
}