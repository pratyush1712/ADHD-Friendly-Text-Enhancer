chrome.commands.onCommand.addListener((command) => {
    if (command === "boldening") {
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
    } else if (command === "highlighting") {
        let colorPicker = document.getElementById("highlightColor");
        let width = document.getElementById("highlightWidth").value;
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true,
            },
            (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: "highlightLines",
                    color: colorPicker.value,
                    width: width,
                });
            }
        );
    }
});
