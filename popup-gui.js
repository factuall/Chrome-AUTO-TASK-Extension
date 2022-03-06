var stateBox = document.getElementById("state");
var tasksStepsList = document.getElementById("task-steps-list");
var optionInputs = document.getElementsByClassName('option-input');
var taskSteps = [];

//record button
var startRecButton = document.getElementById("start-recording");
startRecButton.addEventListener('click', async () =>{ 
    sendToAddon("input-recording");
});

//stop button clicked
var stopRecButton = document.getElementById("stop-recording");
stopRecButton.addEventListener('click', async () =>{
    sendToAddon("input-stop");
});

//execute button clicked
var executeTaskButton = document.getElementById("do-task");
executeTaskButton.addEventListener('click', async () =>{
    sendToAddon("input-play");
});

var clearStepsButton = document.getElementById("clear-recording");
clearStepsButton.addEventListener('click', async () =>{
    taskSteps = [];
    renderSteps();
    sendToAddon("input-clear");
});

function sendToAddon(messageContent){
    chrome.runtime.sendMessage({message: messageContent}, function(response) {});
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(Array.isArray(request.message)){
        taskSteps = request.message;
        renderSteps();
    }
});

function renderSteps(){
    tasksStepsList.innerHTML = "";

    let listLabel = document.createElement("div");
    listLabel.append("Steps list:");
    listLabel.style.padding = "5px 5px 2px 0px";
    tasksStepsList.append(listLabel);

    if(taskSteps.length == 0){
        let emptyReminder = document.createElement("div");
        emptyReminder.id = "step-line";
        tasksStepsList.append(emptyReminder);
        emptyReminder.append("(list is currently empty)");
        emptyReminder.style.display="inline-block";
        listLabel.style.display="inline-block";
    }
    //adding each task step
    taskSteps.forEach(element => {
        let stepLine = document.createElement("div");
        stepLine.id = "step-line";
        tasksStepsList.append(stepLine);
        stepLine.append("Wait: " + element.wait/1000 + "s then click on X:" + element.left + " Y:" + element.top);
    });
}

//hardcoded bookmark
document.getElementById("bookmark0").addEventListener('click', async () =>{ 
    sendToAddon("bookmark0");
});
document.getElementById("bookmark1").addEventListener('click', async () =>{ 
    sendToAddon("bookmark1");
});
document.getElementById("bookmark2").addEventListener('click', async () =>{ 
    sendToAddon("bookmark2");
});
document.getElementById("bookmark3").addEventListener('click', async () =>{ 
    sendToAddon("bookmark3");
});

//on popup
sendToAddon("input-popup");