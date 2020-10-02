function button(){
  chrome.storage.local.get(["running"], function(runnin){
    let running = !runnin.running
    console.log(running)
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            data: {
              running: running
            }
        });
    });
    chrome.storage.local.set({running: running}, function(){
      console.log(running)
    })
  })
}

chrome.storage.local.set({
  running: false
})
document.getElementById("startbtn").onclick = button
