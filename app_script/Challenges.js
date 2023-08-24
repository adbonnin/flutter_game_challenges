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
   * @returns {Object[]}
   */
  findByTitle(title) {
    const sheet = this.ss.getSheetByName(SHEETS.challenges._name);
    const predicate = (value) => value[SHEETS.challenges.title] === title;

    const value = _first(_filterSheetContent(sheet, predicate));
    return this._toChallenge(value);
  }

  /**
   * @param {Object[][]} values
   * @returns {Object[]}
   */
  _toChallenges(values) {
    return values.map(this._toChallenge);
  }

  /**
   * @param {Object[][]} values
   * @returns {Object}
   */
  _toChallenge(value) {
    return {
      title: value[SHEETS.challenges.title],
      game: value[SHEETS.challenges.game],
      creator: value[SHEETS.challenges.creator],
      description: value[SHEETS.challenges.description],
    }
  }
}

class ChallengeVoBuilder {
  /**
   * @param {SpreadsheetApp.Spreadsheet} ss
   */
  constructor(ss) {
    this.ss = ss;
  }

  /**
   * @param {Object} challenge
   * @returns {Object}
   */
  buildVo(challenge) {
    return challenge && _first(this.buildVos([challenge]));
  }

  /**
   * @param {Object[]} challenges
   * @returns {Object[]}
   */
  buildVos(challenges) {
    const gamesRepo = new GameRepository(this.ss);

    const gameTitles = _uniqueValues(challenges, 'game');
    const gamesByTitle = _keyBy(gamesRepo.findByTitles(gameTitles), 'title');

    function toVo(challenge) {
      return {
        ...challenge,
        game: gamesByTitle.get(challenge.game),
      };
    }

    return challenges.map(toVo);
  }
}
