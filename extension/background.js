/* global chrome, fetch */

const LAMBDA_URL = 'https://4uw1u63j59.execute-api.eu-west-1.amazonaws.com/production'
const REWARDS_URL = 'https://shift.gearboxsoftware.com/rewards'

function getURL () {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get({ url: LAMBDA_URL }, (items) => resolve(items.url))
  })
}

function copyToClipboard (text) {
  const textarea = document.createElement('textarea')
  document.body.appendChild(textarea)
  textarea.value = text
  textarea.focus()
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

function checkLastCode (code) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get({ code: null }, (storage) => {
      if (code === storage.code) {
        reject(new Error('No new code found!'))
      } else {
        chrome.storage.sync.set({ code }, () => resolve(code))
      }
    })
  })
}

function setIcon (icon) {
  chrome.browserAction.setIcon({ path: iconPaths(icon) })

  // Reset the icon after 2,5 seconds
  setTimeout(() => chrome.browserAction.setIcon({ path: iconPaths('icon') }), 2500)
}

function iconPaths (icon) {
  return {
    16: `/assets/${icon}_16.png`,
    32: `/assets/${icon}_32.png`,
    48: `/assets/${icon}_48.png`,
    128: `/assets/${icon}_128.png`
  }
}

function createNotification (code) {
  const notification = {
    type: 'basic',
    iconUrl: '/assets/icon_128.png',
    title: 'Borderlands SHiFT Code',
    message: 'A new SHiFT code is available!'
  }

  chrome.notifications.create(notification)
  chrome.notifications.onClicked.addListener(() => {
    chrome.tabs.create({ url: REWARDS_URL }, () => {
      copyToClipboard(code)
      setIcon('yes')
    })
  })
}

chrome.browserAction.onClicked.addListener(() => {
  getURL()
    .then(fetch)
    .then((response) => response.json())
    .then(copyToClipboard)
    .then(() => setIcon('yes'))
    .catch(() => setIcon('nope'))
})

chrome.alarms.create('checkForNewCode', {
  when: Date.now() + 1000,
  periodInMinutes: 60
})

chrome.alarms.onAlarm.addListener((alarm) => {
  getURL()
    .then(fetch)
    .then((response) => response.json())
    .then(checkLastCode)
    .then(createNotification)
    .catch(console.warn)
})
