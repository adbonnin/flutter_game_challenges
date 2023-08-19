/**
 * @param {string} clientId
 * @param {string} clientSecret
 * @returns {IGDBAuth}
 */
function authenticateToTwitch(clientId, clientSecret) {
  const formData = {
    'client_id': clientId,
    'client_secret': clientSecret,
    'grant_type': 'client_credentials',
  }

  const options = {
    'method': 'post',
    'payload': formData,
  }

  const response = UrlFetchApp.fetch('https://id.twitch.tv/oauth2/token', options);
  const json = JSON.parse(response.getContentText());

  return new TwitchAuth(
    json.access_token,
    json.expires_in,
    json.token_type,
  );
}

class TwitchAuth {
  constructor(accessToken, expiresIn, tokenType) {
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
    this.tokenType = tokenType;
  }
}
