// background.js
// Author:
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the browser level activities (e.g. tab management, etc.)
// License: MIT


//send message to JS running site-side
function sendToPopup(messageContent){
    chrome.runtime.sendMessage({content: messageContent}, (r) => {});
}

function sendToTab(messageContent){
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {content: messageContent}, (response) => {
            
        });
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message.startsWith('gui-')){
        switch(request.message.substring(4, 0)){
            case "recording":
            break;
            case "stop":
            break;
            case "play":
            break;
            case "clear":
            break;                
        }
    }
});