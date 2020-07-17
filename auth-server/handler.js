"use strict";

const axios = require("axios");

module.exports.getAccessToken = async (event) => {
  const MEETUP_OAUTH_URL =
    "https://secure.meetup.com/oauth2/access" +
    "?client_id=hctp7f58q3afe9mvsfnt68cvus" +
    "&client_secret=ui3si6a0rugvcnfd36v7v3sbjq" +
    "&grant_type=authorization_code" +
    "&redirect_uri=http://smurphyk.github.io/meetup/" +
    "&code=" +
    event.pathParameters.code;

  const info = await axios.post(MEETUP_OAUTH_URL);

  return {
    statusCode: 200,
    body: JSON.stringify({
      access_token: info.data.access_token,
      refresh_token: info.data.refresh_token,
    }),
  };
};
