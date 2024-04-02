document.addEventListener('DOMContentLoaded', function () {
    var boldButton = document.getElementById('boldFirstLetters');
    if (boldButton) {
        boldButton.addEventListener('click', () => {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "boldFirstLetters"
                });
            });
        });
    }

    var highlightButton = document.getElementById('highlightLines');
    var colorPicker = document.getElementById('highlightColor');
    if (highlightButton && colorPicker) {
        highlightButton.addEventListener('click', () => {
            const color = colorPicker.value;
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "highlightLines",
                    color: color
                });
            });
        });
    }
});