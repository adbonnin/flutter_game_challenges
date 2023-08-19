class Challenge {
  constructor(title, game, creator, description) {
    this.title = title;
    this.game = game;
    this.creator = creator;
    this.description = description;
  }
}

class ChallengeRepository {
  constructor(ss) {
    this.ss = ss;
  }

  /**
   * @returns {Object[]}
   */
  getAll() {
    const sheet = this.ss.getSheetByName(SHEETS.challenges._name);

    const values = _filterSheetContent(sheet);
    return this._toChallenges(values);
  }

  /**
   * @param {string} title
   * @returns {Challenge[]}
   */
  findByTitle(title) {
    const sheet = this.ss.getSheetByName(SHEETS.challenges._name);
    const predicate = (value) => value[SHEETS.challenges.title] === title;

    const value = _first(_filterSheetContent(sheet, predicate));
    return this._toChallenge(value);
  }

  /**
   * @param {Object[][]} values
   * @returns {Challenge[]}
   */
  _toChallenges(values) {
    return values.map(this._toChallenge);
  }

  /**
   * @param {Object[][]} values
   * @returns {Challenge[]}
   */
  _toChallenge(value) {
    return new Challenge(
      value[SHEETS.challenges.title],
      value[SHEETS.challenges.game],
      value[SHEETS.challenges.creator],
      value[SHEETS.challenges.description],
    );
  }
}

/**
 * @extends VoBuilder<Challenge>
 */
class ChallengeVoBuilder {
  /**
   * @param {SpreadsheetApp.Spreadsheet} ss
   * @param {bool} details
   */
  constructor(ss, details) {
    this.ss = ss;
    this.details = details;
  }  
  
  /**
   * @param {Challenge} value
   * @param {bool} details
   * @returns {Object}
   */
  buildVo(challenge) {
    return challenge && _first(this.buildVos([challenge]));
  }

  /**
   * @param {Challenge[]} challenges
   * @param {bool} details
   * @returns {Object[]}
   */
  buildVos(challenges) {
    const details = this.details;
    const gamesRepo = new GameRepository(this.ss);
    const achievementRepo = new AchievementRepository(this.ss);

    const gameTitles = _uniqueValues(challenges, 'game');
    const gamesByTitle = _keyBy(gamesRepo.findByTitles(gameTitles), 'title');

    function fixAchievement(achievement) {
      delete achievement.challenge;
      return achievement;
    }

    function toVo(challenge) {
      var vo = {
        ...challenge,
        game: gamesByTitle.get(challenge.game),
      }

      if (details) {
        vo = {
          ...vo,
          achievements: achievementRepo.findByChallenge(challenge.title).map(fixAchievement),
        }
      }

      return vo;
    }

    return challenges.map(toVo);
  }
}
