chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) {
        sendResponse({
            success: false,
            error: "No text selected",
        });
        return;
    }

    try {
        switch (request.action) {
            case "boldFirstLetters":
                applyBoldeningToSelection();
                break;
            case "highlightLines":
                applyHighlightToSelection(request.color, request.width);
                break;
            default:
                throw new Error("Unknown action");
        }
        sendResponse({
            success: true,
        });
    } catch (error) {
        sendResponse({
            success: false,
            error: error.message,
        });
    }
});
