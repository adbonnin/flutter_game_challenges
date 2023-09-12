/**
 * @param {string} clientId
 * @param {string} clientSecret
 * @returns {TwitchAuth}
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

  return {
    clientId: clientId,
    accessToken: json.access_token,
    expiresIn: json.expires_in,
  }
}
