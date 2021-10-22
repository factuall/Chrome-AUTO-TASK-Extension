// background.js
// Author:
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the browser level activities (e.g. tab management, etc.)
// License: MIT
var addonState = "";

//send message to JS running site-side
function sendToPopup(messageContent){
    chrome.runtime.sendMessage({content: messageContent}, (r) => {});
}

function sendToTab(messageContent){
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {message: messageContent}, (response) => {
            
        });
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.message);
    if(request.message.startsWith('gui-')){
        changeState(request.message);
    }
});

function changeState(newState){
    addonState = newState;
    console.log(newState);
    let passStateToSite = false;
    switch(newState){
        case "gui-recording":
            passStateToSite = true;
        break;
        case "gui-stop":
        break;
        case "gui-play":
        break;
        case "gui-clear":
        break;                
    }
    if(passStateToSite) sendToTab(newState);
}