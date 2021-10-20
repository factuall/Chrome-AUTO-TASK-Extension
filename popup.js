//steps array
var taskSteps = [];

//html elements
var stateBox = document.getElementById("state");
var tasksStepsList = document.getElementById("taskStepsList");

//options
var optionInputs = document.getElementsByClassName('optionInput');
var optionFlags = [];
optionFlags.length = optionInputs.length;
for (let optionIndex = 0; optionIndex < optionInputs.length; optionIndex++) {
    const element = optionInputs[optionIndex];
    element.addEventListener('change', async (event) =>{
        optionFlags[optionIndex] = event.currentTarget.checked;
        let key = {};
        key[("option" + optionIndex)] = optionFlags[optionIndex];
        chrome.storage.local.set(key, function() {});
    });
    chrome.storage.local.get(["option" + optionIndex], function(result) {
        if(result[("option" + optionIndex)] == true){
            optionFlags[optionIndex] = true;
            optionInputs[optionIndex].checked = true;
        }
    });
}

//record button
var startRecButton = document.getElementById("startRecording");
startRecButton.addEventListener('click', async () =>{
    sendMessageToTab("startRecording");
    sendMessageToTab("stateCheck");
});

//stop button clicked
var stopRecButton = document.getElementById("stopRecording");
stopRecButton.addEventListener('click', async () =>{
    sendMessageToTab("stopRecording");
    sendMessageToTab("stateCheck");
});

//execute button clicked
var executeTaskButton = document.getElementById("doTask");
executeTaskButton.addEventListener('click', async () =>{
    sendMessageToTab(taskSteps);
    sendMessageToTab("stateCheck");
});

//clear steps list and remove it from local storage 
//chrome allows us to store whole objects in extension storage
//so we don't have to store it in string 

var clearStepsButton = document.getElementById("clearRecording");
clearStepsButton.addEventListener('click', async () =>{
    chrome.storage.local.set({taskStepsStorage: []}, function() {});
    taskSteps = [];
    renderSteps();
});



//send message to JS running site-side
function sendMessageToTab(messageContent){
    return;
    //STOP
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {content: messageContent}, function(response) {
          
        });
    });
}

//handle messages from site JS
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        return;
        console.log(request.content);
        if(Array.isArray(request.content)){
            taskSteps = request.content;
            chrome.storage.local.set({taskStepsStorage: taskSteps}, function() {});
            renderSteps();
        }else if(request.content.constructor === String){
            if(request.content == "state:idle"){
                stateBox.innerHTML = "Idle";
                stateBox.style.backgroundColor = "bisque";
            }else if(request.content == "state:recording"){
                stateBox.innerHTML = "Recording in progress";
                stateBox.style.backgroundColor = "#ff6666";
            }else if(request.content == "loadedFromJSON"){
                sendMessageToTab("stopRecording");
                sendMessageToTab("stateCheck");
            }else if(request.content == "state:executing"){
                stateBox.innerHTML = "Executing task";
                stateBox.style.backgroundColor = "#99ffcc";
            }
        }
    }
);
/*
//check on opening popup if there's a task in extension storage
chrome.storage.local.get(['taskStepsStorage'], function(result) {
    console.log('Value currently is ' + result.taskStepsStorage);
    if(result.taskStepsStorage == undefined) {
        taskSteps = [];
    }
    else {
        taskSteps = result.taskStepsStorage;
    }
    renderSteps();
});
*/
//appending all task steps to GUI
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