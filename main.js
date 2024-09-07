const boldFirstLettersOfEachWord = (text) => {
    const percentage = 0.4;
    return text.replace(/\b\w+\b/g, word => {
        const boldCount = Math.max(1, Math.ceil(word.length * percentage));
        return `<span style="font-weight: bold;">${word.slice(0, boldCount)}</span>${word.slice(boldCount)}`;
    });
};

const highlightEveryOtherLine = (contentItems, color) => {
    const maxWidth = window.innerWidth * 0.8; // 80% of window width
    const font = window.getComputedStyle(document.body).font;
    const textColor = getContrastColor(color);

    const words = contentItems.split(/\s+/);
    const lines = [];
    let currentLine = '';

    for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        if (getTextWidth(testLine, font) <= maxWidth) {
            currentLine = testLine;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    if (currentLine) lines.push(currentLine);

    const highlightedTextLines = lines.map((line, lineIndex) => {
        if (lineIndex % 2 === 0) {
            return `<span style="background-color: ${color}; color: ${textColor}; padding: 2px 0;">${line}</span>`;
        } else {
            return line;
        }
    })
    const highlightedText = highlightedTextLines.join(' ');

    return highlightedText;
};