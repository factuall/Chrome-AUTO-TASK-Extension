let flags = [{name: "ReportActions", value: true}];

interface MOUSE_POS{
    x: number,
    y: number
}

const MOUSE: MOUSE_POS = {
    x: 0,
    y: 0
};

document.addEventListener('mousemove', (event) => {
    MOUSE.x = event.clientX;
    MOUSE.y = event.clientY;
});

//get x, y of HTML element
function getElementPlacement(source) {
    let x = 0, y = 0, w = 0, h = 0;
    while(source && !isNaN( source.offsetLeft ) && !isNaN( source.offsetTop)){
        x += source.offsetLeft - source.scrollLeft;
        y += source.offsetTop - source.scrollTop;
        source = source.offsetParent;
    }
    return{
        top: y,
        left: x,
        width : w,
        height: h
    };
}

//simulate click
function click(x: number, y: number){
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

function scrollToPos(x, y){
    window.scrollTo(x, y);
}

function sendMessageToAddon(messageContent){
    chrome.runtime.sendMessage({messageToAddon: messageContent}, function(response) {
    });
}

//recieve message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.helperCommandContent != undefined){
        let command: PageCommand;
        command = request.helperCommandContent;
        switch(command.type){
            case 0:
                scrollToPos(command.instructions.scrollX, command.instructions.scrollY);
                click(command.instructions.x, command.instructions.y);
                break;
            case 1:
                scrollToPos(command.instructions.scrollX, command.instructions.scrollY);
                let element = document.elementFromPoint(command.instructions.x, command.instructions.y);
                if(element.tagName == "INPUT"){
                    let elementInput = <HTMLInputElement>element;
                    elementInput.value = command.instructions.input;
                }
            case 2:
                flags.forEach((f) =>{
                    if(f.name == command.flag.name){
                        f.value = command.flag.value;
                    }
                });
                
        }
    }
});

document.body.addEventListener("click", function (evt) {
    if(flags[0].value){
        let clickInstructions: Instructions = {
            x: MOUSE.x,
            y: MOUSE.y,
            scrollX: window.scrollX,
            scrollY: window.scrollY
        };
        let actionReport: PageCommand = {
            type: 0,
            instructions: clickInstructions
        };
        sendMessageToAddon(actionReport);
    }
});