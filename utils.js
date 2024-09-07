// Utility functions
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

const getTextWidth = (() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    return (text, font) => {
        context.font = font || window.getComputedStyle(document.body).font;
        return context.measureText(text).width;
    };
})();

const getContrastColor = (bgColor) => {
    const rgb = hexToRgb(bgColor);
    const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
    return brightness > 128 ? 'black' : 'white';
};

function extractMainContent() {
    const contentElements = document.querySelectorAll('p, li, div:not(:empty)');

    let extractedContent = [];

    contentElements.forEach(element => {
        if (element.closest('header, nav, footer, aside, [class*="ad"], [id*="ad"]')) return

        let text = element.textContent.trim();

        // if (text.length < 10) {
        //     return;
        // }

        extractedContent.push(text);
    });

    const allText = extractedContent.join(' ');

    const words = allText.split(/\s+/);

    return words;
}