const highlightEveryOtherLine = (node, color, widthPercentage = 75) => {
    const maxWidth = (window.innerWidth * widthPercentage) / 100;
    const textColor = getContrastColor(color);

    const workingNode = node.cloneNode(true);
    const newNode = wrapTextNodes(workingNode);

    const lineBreaks = calculateLineBreaks(newNode, maxWidth);

    applyHighlighting(newNode, lineBreaks, color, textColor);

    return newNode;
};

const wrapTextNodes = (node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
        const span = document.createElement("span");
        node.parentNode.insertBefore(span, node);
        span.appendChild(node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach(wrapTextNodes);
    }
    return node;
};

const calculateLineBreaks = (node, maxWidth) => {
    const lineBreaks = [];
    let currentWidth = 0;
    let currentLine = 0;

    const traverse = (node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const font = window.getComputedStyle(document.body).font;
            const words = node.textContent.split(/\s+/);

            words.forEach((word, index) => {
                const wordWidth = getTextWidth(word, font);
                if (currentWidth + wordWidth > maxWidth) {
                    currentLine++;
                    currentWidth = wordWidth;
                } else {
                    currentWidth += wordWidth + (index > 0 ? getTextWidth(" ", font) : 0);
                }
                lineBreaks.push(currentLine);
            });
        } else if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            Array.from(node.childNodes).forEach(traverse);
        }
    };

    traverse(node);
    return lineBreaks;
};

const applyHighlighting = (node, lineBreaks, color, textColor) => {
    let wordIndex = 0;

    const traverse = (node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const words = node.textContent.split(/\s+/);
            node.innerHTML = words
                .map((word) => {
                    const highlight = lineBreaks[wordIndex] % 2 === 0;
                    wordIndex++;
                    return highlight
                        ? `<span style="background-color: ${color}; color: ${textColor}; padding: 2px 6px; margin: 0px -4px">${word}</span>`
                        : word;
                })
                .join(" ");
        } else {
            Array.from(node.childNodes).forEach(traverse);
        }
    };

    traverse(node);
};

const applyHighlightToSelection = (color, width) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const fragment = range.extractContents();

    const highlightedContent = highlightEveryOtherLine(fragment, color, width);

    range.insertNode(highlightedContent);
};
