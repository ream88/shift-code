'use strict'

const fetch = require('node-fetch')
const { URLSearchParams } = require('url')

const check = /PC.*(([A-Z0-9]{5}-){4}[A-Z0-9]{5}).*/i
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

function getShiftCode (tweets) {
  if (tweets[0]) {
    const match = tweets[0].full_text.match(check)
    return match && match[1] ? match[1] : null
  }
  return null
}

function buildResponse (shiftCode) {
  if (shiftCode) {
    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify(shiftCode) }
  }
  return { statusCode: 204, headers: corsHeaders }
}

async function handler () {
  return fetch(`${url}?${params.toString()}`, { headers: { 'Authorization': `Bearer ${process.env.TOKEN}` } })
    .then((response) => response.json())
    .then((tweets) => tweets.filter((tweet) => check.test(tweet.full_text)))
    .then(getShiftCode)
    .then(buildResponse)
}

module.exports = { fetch: handler, getShiftCode }
