/* global chrome */

document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementById('url')
  const defaultUrl = document.getElementsByTagName('option')[0].value

  // Restore options
  chrome.storage.sync.get({
    url: defaultUrl
  }, (config) => {
    dropdown.value = config.url
  })

  // Store options
  dropdown.addEventListener('change', () => {
    chrome.storage.sync.set({
      url: dropdown.value
    })
  })
})
