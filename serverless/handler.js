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
      return /XBOne.*(?<shiftCode>([A-Z0-9]{5}-){4}[A-Z0-9]{5}).*/i

    case 'ps':
      return /PS.*(?<shiftCode>([A-Z0-9]{5}-){4}[A-Z0-9]{5}).*/i

    default:
      return /PC.*(?<shiftCode>([A-Z0-9]{5}-){4}[A-Z0-9]{5}).*/i
  }
}

function getShiftCode (text, regex) {
  // Check most recent style of tweets
  let result = /All\s+Platforms.*(?<shiftCode>([A-Z0-9]{5}-){4}[A-Z0-9]{5}).*/is.exec(text)
  if (result) {
    return result.groups.shiftCode
  }

  // Check for Borderlands 3
  result = /Borderlands\s+3.*(?<shiftCode>([A-Z0-9]{5}-){4}[A-Z0-9]{5}).*/is.exec(text)
  if (result) {
    return result.groups.shiftCode
  }

  // Check legacy platform specific tweets
  result = regex.exec(text)
  if (result) {
    return result.groups.shiftCode
  }

  return null
}

async function handler (event) {
  const regex = getRegex(event.path.substring(1))
  const headers = { headers: { Authorization: `Bearer ${process.env.TOKEN}` } }

  return fetch(`${url}?${params.toString()}`, headers)
    .then((response) => response.json())
    .then((tweets) => {
      const tweet = tweets.find((tweet) => getShiftCode(tweet.retweeted_status ? tweet.retweeted_status.full_text : tweet.full_text, regex))

      if (tweet) {
        return Promise.resolve(getShiftCode(tweet.retweeted_status ? tweet.retweeted_status.full_text : tweet.full_text, regex))
      } else {
        return Promise.reject(new Error('No SHiFT code found!'))
      }
    })
    .then((shiftCode) => ({ statusCode: 200, headers: corsHeaders, body: JSON.stringify(shiftCode) }))
    .catch(() => ({ statusCode: 204, headers: corsHeaders }))
}

module.exports = {
  fetch: handler,
  getShiftCode,
  getRegex
}
