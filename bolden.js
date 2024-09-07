const boldFirstLettersOfEachWord = (text) => {
    const percentage = 0.4;
    return text.replace(/\b\w+\b/g, (word) => {
        const boldCount = Math.max(1, Math.ceil(word.length * percentage));
        return `<span style="font-weight: bold;">${word.slice(0, boldCount)}</span>${word.slice(boldCount)}`;
    });
};

const modifyTextNodes = (node, modificationFunction) => {
    if (node.nodeType === Node.TEXT_NODE) {
        const span = document.createElement("span");
        span.innerHTML = modificationFunction(node.textContent);
        node.parentNode.replaceChild(span, node);
    } else {
        for (let i = 0; i < node.childNodes.length; i++) {
            modifyTextNodes(node.childNodes[i], modificationFunction);
        }
    }
};

const applyBoldeningToSelection = () => {
    const fragment = range.extractContents();
    const div = document.createElement("div");
    div.appendChild(fragment);

    modifyTextNodes(div, boldFirstLettersOfEachWord);

    range.deleteContents();
    range.insertNode(div);
};
