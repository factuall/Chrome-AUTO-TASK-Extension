var addonState = "";
var taskSteps = [];
var changingPage = false;
var changingPagePlaying = false;
var changingPageTaskIndex = 0;

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
        if(request.message == "gui-popup"){
            sendToPopup(taskSteps);
        }
        changeState(request.message);
    }else if(request.message == "bg-loaded"){
        if(changingPage){
            sendToTab(taskSteps);
            changeState("gui-recording");
            changingPage = false;
        }
        if(changingPagePlaying){
            sendToTab("index-"+changingPageTaskIndex);
            sendToTab(taskSteps);
            sendToTab("gui-play");
            changingPagePlaying = false;
        }
    }else if(request.message == "bg-unloading-while-recording"){
        changingPage = true;
    }
    if(request.message.startsWith("bg-unloading-while-playing-")){
        let index = request.message.substring(27);
        console.log("changing page while playing " + index);
        changingPage = false;
        changingPagePlaying = true;
        changingPageTaskIndex = index;
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
            sendToTab("index-0");
            sendToTab(taskSteps);
            passStateToSite = true;
        break;
        case "gui-clear":
            passStateToSite = true;
            taskSteps = [];
        break;                
    }
    if(passStateToSite) sendToTab(newState);
}