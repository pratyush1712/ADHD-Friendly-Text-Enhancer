const modifyTextNodes = (node, modificationFunction) => {
    if (node.nodeType === Node.TEXT_NODE) {
        const span = document.createElement('span');
        span.innerHTML = modificationFunction(node.textContent);
        node.parentNode.replaceChild(span, node);
    } else {
        for (let i = 0; i < node.childNodes.length; i++) {
            modifyTextNodes(node.childNodes[i], modificationFunction);
        }
    }
};

// Function to handle DOM modification
const modifyDOM = (range, modificationFunction, additionalParameter = null) => {
    const fragment = range.extractContents();
    const div = document.createElement('div');
    div.appendChild(fragment);

    const modifiedText = modificationFunction(div.textContent, additionalParameter);
    div.innerHTML = modifiedText;

    const newFragment = document.createDocumentFragment();
    while (div.firstChild) {
        newFragment.appendChild(div.firstChild);
    }

    range.insertNode(newFragment);
};


// Message listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) {
        sendResponse({
            success: false,
            error: 'No text selected'
        });
        return;
    }

    const range = selection.getRangeAt(0);

    try {
        switch (request.action) {
            case 'boldFirstLetters':
                modifyDOM(range, boldFirstLettersOfEachWord);
                break;
            case 'highlightLines':
                modifyDOM(range, highlightEveryOtherLine, request.color);
                break;
            default:
                throw new Error('Unknown action');
        }
        sendResponse({
            success: true
        });
    } catch (error) {
        sendResponse({
            success: false,
            error: error.message
        });
    }
});