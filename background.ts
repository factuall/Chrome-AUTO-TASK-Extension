enum CommandType {
    Press,
    Input,
    Flag
}  

interface Flag{
    name: string,
    value: boolean
}

interface Instructions{
    x: number,
    y: number,
    scrollX: number,
    scrollY: number,
    input?: string
}

interface PageCommand{
    type: CommandType,
    instructions?: Instructions,
    flag?: Flag
}

function sendToTab(Command: PageCommand){
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {helperCommandContent: Command}, (response) => {
            
        });
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.messageToAddon != undefined){
        console.log(request.messageToAddon);
    }
});


/* examples

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

sendToTab({
    type: 2,
    flag: {
        name: "ReportActions",
        value: false
    }
});

*/