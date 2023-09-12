class ChallengeRepository extends Repository {
  /**
   * @param {SpreadsheetApp.Spreadsheet} ss
   */
  constructor(ss) {
    super(ss, SHEETS.challenges._name)
  }

  /**
   * @param {string} title
   * @returns {Object[]}
   */
  findByTitle(title) {
    const predicate = (value) => value[SHEETS.challenges.title] === title
    return _first(this.findAll(predicate))
  }

  /**
   * @param {Object[]} value
   * @returns {Object}
   */
  fromRow(value) {
    return {
      title: String(value[SHEETS.challenges.title]),
      game: String(value[SHEETS.challenges.game]),
      creator: String(value[SHEETS.challenges.creator]) || null,
      description: String(value[SHEETS.challenges.description]) || null,
    }
  }
}

class ChallengeVoBuilder extends VoBuilder {
  /**
   * @param {SpreadsheetApp.Spreadsheet} ss
   */
  constructor(ss) {
    super()
    this.ss = ss
  }

  /**
   * @param {Object[]} challenges
   * @returns {Object[]}
   */
  buildVos(challenges) {
    const gamesRepo = new GameRepository(this.ss)

    const gameTitles = _uniqueValues(challenges, 'game')
    const games = gamesRepo.findByTitles(gameTitles)
    const gamesByTitle = _keyBy(games, 'title')

    function toVo(challenge) {
      return {
        ...challenge,
        game: gamesByTitle.get(challenge.game) ?? {title: ''},
      }
    }

    return challenges.map(toVo);
  }
}
