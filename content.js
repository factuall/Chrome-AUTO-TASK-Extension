var isAddonRecording = false;
var recordedTaskSteps = [];
var startTime = 0;
var endTime = 0;

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
        startTime = new Date().getTime();
        recordedTaskSteps.push(step);
    }
});

//handle messages from addon gui/popup
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request.content);
        if(request.content == "startRecording"){
            isAddonRecording = true;
            startTime = new Date().getTime();
            endTime = new Date().getTime();
        }else if(request.content == "stopRecording"){
            sendMessageToAddon(recordedTaskSteps);
            isAddonRecording = false;
        }else if(request.content == "stateCheck"){
            //gui after closing and opening forgets everything so we ask site for state
            sendMessageToAddon(isAddonRecording ? "state:recording" : "state:idle");
        }
    }
);

//send message to gui/popup
function sendMessageToAddon(messageContent){
    chrome.runtime.sendMessage({content: messageContent}, function(response) {
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
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

//save when recording and clicked redirect
window.onunload = function() {
    if(isAddonRecording) sendMessageToAddon(recordedTaskSteps);
}