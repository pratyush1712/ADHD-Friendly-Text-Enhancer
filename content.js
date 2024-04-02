function boldFirstLettersOfEachWord(selectedText) {
    return selectedText.split(' ').map(word => {
        const boldedLetters = Math.ceil(word.length * 0.3);
        return word.split('').map((letter, index) => {
            if (index < boldedLetters) return `<b>${letter}</b>`;
            else return letter;
        }).join('');
    }).join(' ');
}


function getTextWidth(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = window.getComputedStyle(document.body).getPropertyValue('font');
    return context.measureText(text).width;
}

function highlightEveryOtherLine(selectedText, color) {
    const pageWidth = window.innerWidth / 2;
    const words = selectedText.split(' ');
    const lines = [];
    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const newLine = currentLine + ' ' + word;
        if (getTextWidth(newLine) > pageWidth) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = newLine;
        }
    }
    lines.push(currentLine);

    const textColor = window.getComputedStyle(document.body).getPropertyValue('color');

    if (textColor === 'rgb(255, 255, 255)') {
        var newTextColor = 'black';
    } else {
        var newTextColor = textColor;
    }

    return lines.map((line, index) => {
        if (index % 2 === 0) {
            return `<span style="background-color: ${color}; color: ${newTextColor}; margin-bottom: 12px">${line}</span>`;
        } else {
            return line;
        }
    }).join(' ');
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "boldFirstLetters") {
        handleTextModification(request, boldFirstLettersOfEachWord);
    } else if (request.action === "highlightLines") {
        handleTextModification(request, highlightEveryOtherLine, request.color);
    }
});


function handleTextModification(request, modificationFunction, additionalParameter = null) {
    const selection = window.getSelection();
    if (!selection.rangeCount) {
        sendResponse({
            success: false
        });
        return false;
    }

    const range = selection.getRangeAt(0);
    let documentFragment = range.cloneContents();

    modifyDocumentFragment(documentFragment, modificationFunction, additionalParameter);

    range.deleteContents();
    range.insertNode(documentFragment);

    sendResponse({
        success: true
    });
    return true;
}

function modifyDocumentFragment(documentFragment, modificationFunction, additionalParameter) {
    for (let i = 0; i < documentFragment.children.length; i++) {
        const child = documentFragment.children[i];
        const text = child.textContent;
        const modifiedText = additionalParameter ?
            modificationFunction(text, additionalParameter) :
            modificationFunction(text);
        const newNode = document.createElement(child.tagName);
        newNode.innerHTML = modifiedText;
        documentFragment.replaceChild(newNode, child);
    }
}