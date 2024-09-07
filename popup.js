document.addEventListener("DOMContentLoaded", function () {
    var boldButton = document.getElementById("boldFirstLetters");
    if (boldButton) {
        boldButton.addEventListener("click", () => {
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true,
                },
                (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: "boldFirstLetters",
                    });
                }
            );
        });
    }

    var highlightButton = document.getElementById("highlightLines");
    var colorPicker = document.getElementById("highlightColor");
    var widthPicker = document.getElementById("highlightWidth");
    if (highlightButton && colorPicker) {
        highlightButton.addEventListener("click", () => {
            const color = colorPicker.value;
            const width = widthPicker.value;
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true,
                },
                (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: "highlightLines",
                        color: color,
                        width: width,
                    });
                }
            );
        });
    }
});
