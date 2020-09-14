let running = false
document.getElementById("showme").addEventListener("click", async function() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            data: {
              running: !running
            }
        });
        running = !running
    });
});
