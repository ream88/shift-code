/* global chrome, fetch */

function getURL () {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get({
      url: 'https://4uw1u63j59.execute-api.eu-west-1.amazonaws.com/production'
    }, (items) => resolve(items.url))
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

function setIcon (icon) {
  chrome.browserAction.setIcon({ path: iconPaths(icon) })

  // Reset the icon after 2,5 seconds
  setTimeout(() => chrome.browserAction.setIcon({ path: iconPaths('icon') }), 2500)
}

const iconPaths = (icon) => ({
  16: `/assets/${icon}_16.png`,
  32: `/assets/${icon}_32.png`,
  48: `/assets/${icon}_48.png`,
  128: `/assets/${icon}_128.png`
})

chrome.browserAction.onClicked.addListener(() => {
  getURL()
    .then(fetch)
    .then((response) => response.json())
    .then(copyToClipboard)
    .then(() => setIcon('yes'))
    .catch(() => setIcon('nope'))
})
