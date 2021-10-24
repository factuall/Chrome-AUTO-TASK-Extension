var stateBox = document.getElementById("state");
var tasksStepsList = document.getElementById("taskStepsList");
var optionInputs = document.getElementsByClassName('optionInput');
var taskSteps = [];

//record button
var startRecButton = document.getElementById("startRecording");
startRecButton.addEventListener('click', async () =>{ 
    sendToAddon("gui-recording");
});

//stop button clicked
var stopRecButton = document.getElementById("stopRecording");
stopRecButton.addEventListener('click', async () =>{
    sendToAddon("gui-stop");
});

//execute button clicked
var executeTaskButton = document.getElementById("doTask");
executeTaskButton.addEventListener('click', async () =>{
    sendToAddon("gui-play");
});

var clearStepsButton = document.getElementById("clearRecording");
clearStepsButton.addEventListener('click', async () =>{
    taskSteps = [];
    renderSteps();
    sendToAddon("gui-clear");
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


//on popup
sendToAddon("gui-popup");