var CommandType;
(function (CommandType) {
    CommandType[CommandType["Press"] = 0] = "Press";
    CommandType[CommandType["Input"] = 1] = "Input";
    CommandType[CommandType["Flag"] = 2] = "Flag";
})(CommandType || (CommandType = {}));
function sendToTab(Command) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { helperCommandContent: Command }, function (response) {
        });
    });
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.messageToAddon != undefined) {
        console.log(request.messageToAddon);
        sendToTab({
            type: 2,
            flag: {
                name: "ReportActions",
                value: false
            }
        });
    }
});
/* example

sendToTab({
    type: 1,
    instructions: {
        x: 160,
        y: 264,
        scrollX: 0,
        scrollY: 0,
        input: "kurwyyyy"
    }
});


*/ 
