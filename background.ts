function sendToTab(messageContent){
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {message: messageContent}, (response) => {
            
        });
    });
}