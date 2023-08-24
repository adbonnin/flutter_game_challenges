import {ChallengeRepository} from "./repositories/ChallengeRepository";
import {ChallengeVoBuilder} from "./vo/ChallengeVoBuilder";
import DoGet = GoogleAppsScript.Events.DoGet;
import TextOutput = GoogleAppsScript.Content.TextOutput;

export const SHEETS = {
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
  participants: {
    _name: 'Participants',
    name: 0,
  },
}

function doGet(e: DoGet) {
  const parameter = e.parameter
  const action = parameter.action

  if (action == 'getChallenges') {
    return doGetChallenges()
  }

  // if (action == 'getChallenge') {
  //   return doGetChallenge(parameter.title);
  // }
}

function doGetChallenges(): TextOutput {
  const ss = SpreadsheetApp.getActive()
  const repo = new ChallengeRepository(ss)
  const voBuilder = new ChallengeVoBuilder(ss)

  const challenges = repo.getAll()
  const vos = voBuilder.buildVos(challenges)
  return _createOutput(vos)
}

// function doGetChallenge(title: String): TextOutput {
//   const ss = SpreadsheetApp.getActive()
//   const repo = new ChallengeRepository(ss)
//   const voBuilder = new ChallengeVoBuilder(ss)
//
//   const challenge = repo.findByTitle(title)
//   const vo = voBuilder.buildVo(challenge)
//   return _createOutput(vos)
// }

function _createOutput(value: any): TextOutput {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON)
}

