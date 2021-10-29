var flags = [{ name: "ReportActions", value: true }];
var MOUSE = {
    x: 0,
    y: 0
};
document.addEventListener('mousemove', function (event) {
    MOUSE.x = event.clientX;
    MOUSE.y = event.clientY;
});
//get x, y of HTML element
function getElementPlacement(source) {
    var x = 0, y = 0, w = 0, h = 0;
    while (source && !isNaN(source.offsetLeft) && !isNaN(source.offsetTop)) {
        x += source.offsetLeft - source.scrollLeft;
        y += source.offsetTop - source.scrollTop;
        source = source.offsetParent;
    }
    return {
        top: y,
        left: x,
        width: w,
        height: h
    };
}
//simulate click
function click(x, y) {
    var ev = document.createEvent("MouseEvent");
    var el = document.elementFromPoint(x, y);
    ev.initMouseEvent("click", true, true, window, null, x, y, 0, 0, false, false, false, false, 0, null);
    el.dispatchEvent(ev);
}
function scrollToPos(x, y) {
    window.scrollTo(x, y);
}
function sendMessageToAddon(messageContent) {
    chrome.runtime.sendMessage({ messageToAddon: messageContent }, function (response) {
    });
}
//recieve message
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.helperCommandContent != undefined) {
        var command_1;
        command_1 = request.helperCommandContent;
        switch (command_1.type) {
            case 0:
                scrollToPos(command_1.instructions.scrollX, command_1.instructions.scrollY);
                click(command_1.instructions.x, command_1.instructions.y);
                break;
            case 1:
                scrollToPos(command_1.instructions.scrollX, command_1.instructions.scrollY);
                var element = document.elementFromPoint(command_1.instructions.x, command_1.instructions.y);
                if (element.tagName == "INPUT") {
                    var elementInput = element;
                    elementInput.value = command_1.instructions.input;
                }
            case 2:
                flags.forEach(function (f) {
                    if (f.name == command_1.flag.name) {
                        f.value = command_1.flag.value;
                    }
                });
        }
    }
});
document.body.addEventListener("click", function (evt) {
    if (flags[0].value) {
        var clickInstructions = {
            x: MOUSE.x,
            y: MOUSE.y,
            scrollX: window.scrollX,
            scrollY: window.scrollY
        };
        var actionReport = {
            type: 0,
            instructions: clickInstructions
        };
        sendMessageToAddon(actionReport);
    }
});
