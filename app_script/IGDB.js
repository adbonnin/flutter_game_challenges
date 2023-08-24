class IGDBClient {

  /**
   * @param {string} search
   * @param {int} limit
   */
  searchGames(search, limit) {

    const params = {
      fields: 'name,cover,first_release_date,platforms',
      search: `"${search}"`,
      limit: limit || 12,
    }

    return this._query('games', params)
  }

  /**
   * @param {string[]} ids
   * @returns {Object[]}
   */
  findPlatformsByIds(ids) {

    const params = {
      fields: 'name',
      where: `id = (${ids.join(',')})`,
      limit: 500,
    }

    return this._query('platforms', params)
  }

  /**
   * @param {string} resource
   * @param {Object} params
   */
  _query(resource, params) {
    const auth = this._authenticateToTwitch()

    const headers = {
      'Client-ID': auth.clientId,
      'Authorization': 'Bearer ' + auth.accessToken,
    }

    const payload = Object.entries(params || {})
      .map((e) => `${e[0]} ${e[1]};`)
      .join('');

    const options = {
      'method': 'post',
      'headers': headers,
      'payload': payload
    }

    const response = UrlFetchApp.fetch('https://api.igdb.com/v4/' + resource, options)
    const content = response.getContentText()
    return JSON.parse(content)
  }

  _authenticateToTwitch() {
    const scriptProperties = PropertiesService.getScriptProperties()

    const properties = scriptProperties.getProperties()
    const clientId = properties['IGDB_CLIENT_ID']
    const clientSecret = properties['IGDB_CLIENT_SECRET']

    return authenticateToTwitch(clientId, clientSecret)
  }
}

class IGDBGameVoBuilder {
  /**
   * @param {IGDBClient} ss
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * @param {Object} game
   * @returns {Object}
   */
  buildVo(game) {
    return game && _first(this.buildVos([game]));
  }

  /**
   * @param {Object[]} games
   * @returns {Object[]}
   */
  buildVos(games) {
    const platformIds = _uniqueValues(games, 'platforms');
    const platformsById = _keyBy(this.client.findPlatformsByIds(platformIds), 'id')

    function toVo(game) {
      return {
        ...game,
        platforms: _filterNotNil(game.platforms.map((p) => platformsById.get(p))),
      };
    }

    return games.map(toVo);
  }
}
