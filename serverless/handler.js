'use strict'

const fetch = require('node-fetch')
const { URLSearchParams } = require('url')

const check = /PC \/ Mac \/ Linux:\s*(.*)\s*/i
const url = 'https://api.twitter.com/1.1/statuses/user_timeline.json'
const params = new URLSearchParams({
  screen_name: 'borderlands',
  tweet_mode: 'extended',
  count: 50
})
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
}

function getShiftCode (tweets) {
  if (tweets[0]) {
    return tweets[0].full_text.match(check)[1]
  }
  return null
}

function buildResponse (shiftCode) {
  if (shiftCode) {
    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify(shiftCode) }
  }
  return { statusCode: 204, headers: corsHeaders }
}

module.exports.fetch = async () => (
  fetch(`${url}?${params.toString()}`, { headers: { 'Authorization': `Bearer ${process.env.TOKEN}` } })
    .then((response) => response.json())
    .then((tweets) => tweets.filter((tweet) => check.test(tweet.full_text)))
    .then(getShiftCode)
    .then(buildResponse)
)
