'use strict'

const fetch = require('node-fetch')
const { URLSearchParams } = require('url')

const url = 'https://api.twitter.com/1.1/statuses/user_timeline.json'
const params = new URLSearchParams({
  screen_name: 'borderlands',
  tweet_mode: 'extended',
  count: 100
})
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
}

function getRegex (platform) {
  switch (platform) {
    case 'xbox':
      return /(XBOne|All\s+Platforms).*(?<shiftCode>([A-Z0-9]{5}-){4}[A-Z0-9]{5}).*/i

    case 'ps':
      return /(PS|All\s+Platforms).*(?<shiftCode>([A-Z0-9]{5}-){4}[A-Z0-9]{5}).*/i

    default:
      return /(PC|All\s+Platforms).*(?<shiftCode>([A-Z0-9]{5}-){4}[A-Z0-9]{5}).*/i
  }
}

function getShiftCode (tweets, regex) {
  const text = tweets[0] && tweets[0].full_text
  const result = regex.exec(text)

  return result ? result.groups.shiftCode : null
}

function buildResponse (shiftCode) {
  if (shiftCode) {
    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify(shiftCode) }
  }
  return { statusCode: 204, headers: corsHeaders }
}

async function handler (event) {
  const regex = getRegex(event.path.substring(1))
  const headers = { headers: { Authorization: `Bearer ${process.env.TOKEN}` } }

  return fetch(`${url}?${params.toString()}`, headers)
    .then((response) => response.json())
    .then((tweets) => tweets.filter((tweet) => regex.test(tweet.full_text)))
    .then((tweets) => getShiftCode(tweets, regex))
    .then(buildResponse)
}

module.exports = {
  fetch: handler,
  getShiftCode,
  getRegex
}
