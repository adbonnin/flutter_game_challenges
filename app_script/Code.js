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

const _DEBUG_CHALLENGE = null; // 'Manège arc en ciel';

function doGet(request) {
  const action = request.parameter.action;

  if (action == 'getChallenges') {
    return doGetChallenges();
  }

  if (action == 'getChallenge') {
    return doGetChallenge(request.parameter.title);
  }

  if (action == 'getAchievementsByChallenge') {
    return doGetAchievementsByChallenge(request.parameter.challenge);
  }
}

function doGetChallenges() {
  const ss = SpreadsheetApp.getActive();
  const repo = new ChallengeRepository(ss);
  const voBuilder = new ChallengeVoBuilder(ss);

  const challenges = repo.getAll();
  const vos = voBuilder.buildVos(challenges);
  return _createJsonOutput(vos);
}

/**
 * @param {string} title
 */
function doGetChallenge(title) {
  const ss = SpreadsheetApp.getActive();
  const repo = new ChallengeRepository(ss);
  const voBuilder = new ChallengeVoBuilder(ss);

  const challenge = repo.findByTitle(title || _DEBUG_CHALLENGE);
  const vo = voBuilder.buildVo(challenge);
  return _createJsonOutput(vo);
}

/**
 * @param {string} challenge
 */
function doGetAchievementsByChallenge(challenge) {
  const ss = SpreadsheetApp.getActive();
  const repo = new AchievementRepository(ss);

  function fixAchievement(achievement) {
    delete achievement.challenge;
    return achievement;
  }

  const achievements = repo.findByChallenge(challenge || _DEBUG_CHALLENGE);
  const vo = achievements.map(fixAchievement);
  return _createJsonOutput(vo);
}

/**
 * @param {Object} value
 */
function _createJsonOutput(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON)
}
