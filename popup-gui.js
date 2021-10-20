var stateBox = document.getElementById("state");
var tasksStepsList = document.getElementById("taskStepsList");
var optionInputs = document.getElementsByClassName('optionInput');

//record button
var startRecButton = document.getElementById("startRecording");
startRecButton.addEventListener('click', async () =>{
    //sendMessageToTab("startRecording");
    //sendMessageToTab("stateCheck");    
    shareMessage("gui-recording");
});

//stop button clicked
var stopRecButton = document.getElementById("stopRecording");
stopRecButton.addEventListener('click', async () =>{
    //sendMessageToTab("stopRecording");
    //sendMessageToTab("stateCheck");
    shareMessage("gui-stop");
});

//execute button clicked
var executeTaskButton = document.getElementById("doTask");
executeTaskButton.addEventListener('click', async () =>{
    //sendMessageToTab(taskSteps);
    //sendMessageToTab("stateCheck");
    shareMessage("gui-play");
});

var clearStepsButton = document.getElementById("clearRecording");
clearStepsButton.addEventListener('click', async () =>{
    //chrome.storage.local.set({taskStepsStorage: []}, function() {});
    //taskSteps = [];
    //renderSteps();
    shareMessage("gui-clear");
});

function shareMessage(messageContent){
    chrome.runtime.sendMessage({content: messageContent}, function(response) {});
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.content);
    

});
