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