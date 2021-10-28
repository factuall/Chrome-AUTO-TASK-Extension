/*var isAddonRecording = false;
var recordedTaskSteps = [];
var startTime = 0;
var endTime = 0;
var executingTask = false;
var index = 0;

const MOUSE = {
    x: 0,
    y: 0
};

document.addEventListener('mousemove', (event) => {
    MOUSE.x = event.clientX;
    MOUSE.y = event.clientY;
});

//all info while recording is saved to array
document.body.addEventListener("click", function (evt) {
    if(isAddonRecording){
        
        //object with coords .left .top
        let step = getOffset(evt.target);
        //don't record delay on first click
        if(recordedTaskSteps.length != 0){
            endTime = new Date().getTime();
        }
        //add delay to the object
        step.wait = endTime - startTime;
        step.top = MOUSE.y;
        step.left = MOUSE.x;
        step.scroll = window.pageYOffset;
        startTime = new Date().getTime();
        if(recordedTaskSteps.length > 0){
            if(step.top == recordedTaskSteps[recordedTaskSteps.length-1].top &&
                step.left == recordedTaskSteps[recordedTaskSteps.length-1].left) return;
        }

        recordedTaskSteps.push(step);
    }
});

//handle messages from addon gui/popup
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(Array.isArray(request.message)){
            recordedTaskSteps = request.message;
        }else{
            switch(request.message){
                case "input-recording":
                    console.log("recordiiing");
                    isAddonRecording = true;
                    startTime = new Date().getTime();
                    endTime = new Date().getTime();
                break;
                case "input-stop":
                    isAddonRecording = false;
                    sendMessageToAddon(recordedTaskSteps);
                break;             
                case "input-clear":
                    recordedTaskSteps = [];
                break;
                case "input-play":
                    executingTask = true;
                    executeTask();
                break;
            }
            if(request.message.startsWith("index-")){
                let i = request.message.substring(6);
                index = parseInt(i);
                console.log(index);
            }
        }
    }
);

//send message to gui/popup
function sendMessageToAddon(messageContent){
    chrome.runtime.sendMessage({message: messageContent}, function(response) {
    });
}

//simulate click
function click(x,y){
    var ev = document.createEvent("MouseEvent");
    var el = document.elementFromPoint(x,y);
    ev.initMouseEvent(
        "click",
        true, true,
        window, null,
        x, y, 0, 0,
        false, false, false, false,
        0, null
    );
    el.dispatchEvent(ev);
}

//get x, y of HTML element
function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    var _w = 0;
    var _h = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x};
}

//save when recording and clicked redirect
window.onbeforeunload = function(){
    if(isAddonRecording){
        sendMessageToAddon(recordedTaskSteps);
        sendMessageToAddon("resume-recording");
    }
    if(executingTask){
        console.log(index);
        sendMessageToAddon("resume-playing-" + (index+1));
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
const executeTask = async function(){
    console.log("executing");
    for (index; index < recordedTaskSteps.length; index++) {
        if(!executingTask){
            break;
        }
        const step = recordedTaskSteps[index];
        await sleep(step.wait);
        window.scrollTo(0, step.scroll);
        await sleep(10);
        click(step.left, step.top);   
        console.log("clicking",step.left,step.top);
    }
    executingTask = false;
}

sendMessageToAddon("page-loaded");
*/