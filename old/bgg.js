/*var addonState = "";
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
        }else if(request.message.startsWith("bookmark")){
            let index = request.message.substring(8);
            console.log(index);
            openBookMark(index);
            
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

function openBookMark(index){
    //save
    if(taskSteps.length > 0){
        switch(index){
            case "0":
                chrome.storage.local.set({cchbw0: taskSteps}, ()=>{});
                break;
            case "1":
                chrome.storage.local.set({cchbw1: taskSteps}, ()=>{});
                break;
            case "2":
                chrome.storage.local.set({cchbw2: taskSteps}, ()=>{});
                break;
            case "3":
                chrome.storage.local.set({cchbw3: taskSteps}, ()=>{});
                break;
        }
        console.log("saved");
    }else{ //load
        let storageData = [];
        switch(index){
            case "0": 
                chrome.storage.local.get(["cchbw0"], (result)=>{
                    storageData = result.cchbw0;
                    if(Array.isArray(storageData)){
                        taskSteps = storageData;
                        sendToPopup(taskSteps);
                    }
                });
                break;
            case "1":
                chrome.storage.local.get(["cchbw1"], (result)=>{
                    storageData = result.cchbw1;
                    if(Array.isArray(storageData)){
                        taskSteps = storageData;
                        sendToPopup(taskSteps);
                    }
                });
                break;
            case "2":
                chrome.storage.local.get(["cchbw2"], (result)=>{
                    storageData = result.cchbw2;
                    if(Array.isArray(storageData)){
                        taskSteps = storageData;
                        sendToPopup(taskSteps);
                    }
                });
                break;
            case "3":
                chrome.storage.local.get(["cchbw3"], (result)=>{
                    storageData = result.cchbw3;
                    if(Array.isArray(storageData)){
                        taskSteps = storageData;
                        sendToPopup(taskSteps);
                    }
                });
                break;
        }
    }
}*/