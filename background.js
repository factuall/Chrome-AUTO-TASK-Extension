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
    }else{
        switch(request.message){
            case "input-popup":
                sendToPopup(taskSteps);
            break;
            case "page-loaded":
                if(changingPage){
                    sendToTab(taskSteps);
                    changeState("input-recording");
                    changingPage = false;
                }
                if(changingPagePlaying){
                    sendToTab("index-"+changingPageTaskIndex);
                    sendToTab(taskSteps);
                    sendToTab("input-play");
                    changingPagePlaying = false;
                }
            break;
            case "resume-recording":
                changingPage = true;
            break;
        }
        if(request.message.startsWith("resume-playing-")){
            let index = request.message.substring(15);
            console.log("changing page while playing " + index);
            changingPage = false;
            changingPagePlaying = true;
            changingPageTaskIndex = index;
        }else if(request.message.startsWith("input-")){
            changeState(request.message);
        }

    }
});

function changeState(newState){
    addonState = newState;
    let passStateToSite = false;
    switch(newState){
        case "input-recording":
            passStateToSite = true;
        break;
        case "input-stop":
            passStateToSite = true;
        break;
        case "input-play":
            sendToTab("index-0");
            sendToTab(taskSteps);
            passStateToSite = true;
        break;
        case "input-clear":
            passStateToSite = true;
            taskSteps = [];
        break;                
    }
    if(passStateToSite) sendToTab(newState);
}