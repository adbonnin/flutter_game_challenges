class GameRepository {
  constructor(ss) {
    this.ss = ss;
  }

  /**
 * @returns {Game[]}
 */
  getGames() {
    const sheet = this.ss.getSheetByName(SHEETS.games._name);

    const values = _filterSheetContent(sheet);
    return this._toGames(values);
  }

  /**
   * @param {Set<string>} titles
   * @returns {Game[]}
   */
  findGamesByTitles(titles) {
    const sheet = this.ss.getSheetByName(SHEETS.games._name);
    const predicate = (value) => titles.has(value[SHEETS.games.title]);

    const values = _filterSheetContent(sheet, predicate);
    return this._toGames(values);
  }

  /**
   * @param {string} title
   * @returns {Game}
   */
  findGameByTitle(title) {
    const sheet = this.ss.getSheetByName(SHEETS.games._name);
    const predicate = (value) => value[SHEETS.games.title] == title;

    const values = _filterSheetContent(sheet, predicate);
    return _first(this._toGames(values));
  }

  /**
   * @param {Object[][]} values
   * @returns {Game[]}
   */
  _toGames(values) {

    function toGame(value) {
      return new Game(
        value[SHEETS.games.title],
        value[SHEETS.games.theGamesDBId] || null,
      );
    }

    return values.map(toGame);
  }

  /**
   * @param {Game[]} games
   * @returns {Object}
   */
  toDetails(games) {
    const challengeRepo = new ChallengeRepository(this.ss);

    function fixChallenge(challenge) {
      delete challenge.game;
      return challenge;
    }

    function toDetails(game) {
      const challenges = challengeRepo.findChallengesByGame(game.title);

      return {
        ...game,
        challenges: challenges.map(fixChallenge),
      };
    }

    return games.map(toDetails);
  }
}

class Game {
  constructor(title, theGamesDBId) {
    this.title = title,
    this.theGamesDBId = theGamesDBId;
  }
}

