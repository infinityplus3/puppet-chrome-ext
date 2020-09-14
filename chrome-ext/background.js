console.log("background running")
let active = false
chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.sendMessage(tab.id, {
    running: !active
  })
  active = !active
})
