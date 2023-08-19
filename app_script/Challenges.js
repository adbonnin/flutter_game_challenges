class ChallengeRepository {
  constructor(ss) {
    this.ss = ss;
  }

  /**
   * @returns {Object[]}
   */
  getChallenges() {
    const sheet = this.ss.getSheetByName(SHEETS.challenges._name);

    const values = _filterSheetContent(sheet);
    return this._toChallenges(values);
  }

  /**
   * @param {string} title
   * @returns {Challenge[]}
   */
  findChallengeByTitle(title) {
    const sheet = this.ss.getSheetByName(SHEETS.challenges._name);
    const predicate = (value) => value[SHEETS.challenges.title] === title;

    const values = _filterSheetContent(sheet, predicate);
    return _first(this._toChallenges(values));
  }

  /**
   * @param {string} game
   * @returns {Challenge[]}
   */
  findChallengesByGame(game) {
    const sheet = this.ss.getSheetByName(SHEETS.challenges._name);
    const predicate = (value) => value[SHEETS.challenges.game] === game;

    const values = _filterSheetContent(sheet, predicate);
    return this._toChallenges(values);
  }

  /**
   * @param {Object[][]} values
   * @returns {Challenge[]}
   */
  _toChallenges(values) {

    function toChallenge(value) {
      return new Challenge(
        value[SHEETS.challenges.title],
        value[SHEETS.challenges.game],
        value[SHEETS.challenges.creator],
        value[SHEETS.challenges.description],
      );
    }

    return values.map(toChallenge);
  }

  /**
   * @param {Challenge[]} values
   * @returns {Object[]}
   */
  toDetails(challenges) {
    const gamesRepo = new GameRepository(this.ss);
    const challengeRepo = new ChallengeRepository(this.ss);

    const gameTitles = _uniqueValues(challenges, 'game');
    const gamesByTitle = _keyBy(gamesRepo.findGamesByTitles(gameTitles), 'title');
    
    function fixAchievement(achivement) {
      delete achivement.challenge;
      return achivement;
    }

    function toDetail(challenge) {
      const game = gamesByTitle.get(challenge.game);
      const achievements = challengeRepo.findAchievementsByChallenge(challenge.title) || [];

      return {
        ...challenge,
        game: game,
        achivements: achievements.map(fixAchievement),
      }
    }

    return challenges.map(toDetail);
  }
}

class Challenge {
  constructor(title, game, creator, description) {
    this.title = title;
    this.game = game;
    this.creator = creator;
    this.description = description;
  }
}
