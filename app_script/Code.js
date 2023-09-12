// API Documentation : https://developers.google.com/apps-script/reference/spreadsheet?hl=en
// Create a Custom HTML Form for Google Sheets using Google Apps Script : https://www.youtube.com/watch?v=SnzFCC3tkZY

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
    igdbId: 1,
  },
  users: {
    _name: 'Utilisateurs',
    name: 0,
    username: 1,
    hashedPassword: 2,
    admin: 3,
    authToken: 4,
  },
}

const _TEST_CHALLENGE = 'Manège arc en ciel'
const _TEST_SEARCH = 'Mario Galaxy'

function test() {
  doSearchIGDBGame(_TEST_SEARCH)
}

function doGet(request) {
  const parameter = request.parameter
  const action = parameter.action

  if (action === 'getChallenges') {
    return doGetChallenges()
  }

  if (action === 'getChallenge') {
    return doGetChallenge(parameter.title)
  }

  if (action === 'getAchievementsByChallenge') {
    return doGetAchievementsByChallenge(parameter.challenge)
  }
}

function doGetChallenges() {
  const ss = SpreadsheetApp.getActive()
  const repo = new ChallengeRepository(ss)
  const voBuilder = new ChallengeVoBuilder(ss)

  const challenges = repo.findAll()
  const vos = voBuilder.buildVos(challenges)
  return _createJsonOutput(vos)
}

/**
 * @param {string} title
 */
function doGetChallenge(title) {
  const ss = SpreadsheetApp.getActive()
  const repo = new ChallengeRepository(ss)
  const voBuilder = new ChallengeVoBuilder(ss)

  const challenge = repo.findByTitle(title)
  const vo = voBuilder.buildVo(challenge)
  return _createJsonOutput(vo)
}

/**
 * @param {string} challenge
 */
function doGetAchievementsByChallenge(challenge) {
  const ss = SpreadsheetApp.getActive()
  const repo = new AchievementRepository(ss)

  function fixAchievement(achievement) {
    delete achievement.challenge
    return achievement
  }

  const achievements = repo.findByChallenge(challenge)
  const vos = achievements.map(fixAchievement)
  return _createJsonOutput(vos)
}

/**
 * @param {Object} value
 */
function _createJsonOutput(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON)
}
