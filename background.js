// background.js
// Author:
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the browser level activities (e.g. tab management, etc.)
// License: MIT
var addonState = "";
var taskSteps = [];

//send message to JS running site-side
function sendToPopup(messageContent){
    chrome.runtime.sendMessage({message: messageContent}, (r) => {});
}

function sendToTab(messageContent){
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {message: messageContent}, (response) => {
            
        });
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(Array.isArray(request.message)){
        taskSteps = request.message;
    }else if(request.message.startsWith('gui-')){
        console.log(request.message);
        if(request.message == "gui-popup"){
            console.log(taskSteps);
            sendToPopup(taskSteps);
        }
        changeState(request.message);
    }
});

function changeState(newState){
    addonState = newState;
    let passStateToSite = false;
    switch(newState){
        case "gui-recording":
            passStateToSite = true;
        break;
        case "gui-stop":
            passStateToSite = true;
        break;
        case "gui-play":
            console.log("playing");
            console.log(taskSteps);
            sendToTab(taskSteps);
        break;
        case "gui-clear":
        break;                
    }
    if(passStateToSite) sendToTab(newState);
}