var stateBox = document.getElementById("state");
var tasksStepsList = document.getElementById("taskStepsList");
var optionInputs = document.getElementsByClassName('optionInput');
var taskSteps = [];

//record button
var startRecButton = document.getElementById("startRecording");
startRecButton.addEventListener('click', async () =>{ 
    sendToAddon("input-recording");
});

//stop button clicked
var stopRecButton = document.getElementById("stopRecording");
stopRecButton.addEventListener('click', async () =>{
    sendToAddon("input-stop");
});

//execute button clicked
var executeTaskButton = document.getElementById("doTask");
executeTaskButton.addEventListener('click', async () =>{
    sendToAddon("input-play");
});

var clearStepsButton = document.getElementById("clearRecording");
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
    //gowno kurwa na szybko for title
    if(taskSteps.length > 0) {
        let stepLine = document.createElement("div");
        stepLine.append("Steps in given task:");
        tasksStepsList.append(stepLine);
        let gowno = document.createElement("div");
        gowno.style.height = "5px";
        tasksStepsList.append(gowno);
    }
    //adding each task step
    taskSteps.forEach(element => {
        let stepLine = document.createElement("div");
        stepLine.id = "stepLine";
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