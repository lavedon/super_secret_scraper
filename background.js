chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        console.log("Check if on ReferenceUSA");
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { urlContains: 'referenceusa.com/' },
                    })
                ],
                // And shows the extension's page action.
                actions: [ new chrome.declarativeContent.ShowPageAction() ]
            }
        ]);
    });
});

var contextMenuItem = {
    "id": "grabTable",
    "title": "Grab Table",
    "contexts": ["all"]
};

chrome.contextMenus.removeAll(function() {
    chrome.contextMenus.create(contextMenuItem);
});

function scrape_it() {
        chrome.tabs.executeScript({
            file: "content.js"
            });
        }


chrome.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "grabTable") {
            scrape_it();
        } 
        });
        
chrome.commands.onCommand.addListener(function(command) {
    scrape_it();
});

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", msg.message, true);
        xhr.send();

});

