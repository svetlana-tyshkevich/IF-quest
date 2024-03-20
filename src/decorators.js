import { Scene } from './scene.js';

function wordWrap(description) {
    const words = description.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
        if ((currentLine + word).length > 80) {
            lines.push(currentLine.trim());
            currentLine = '';
        }
        currentLine += `${word} `;
    }

    if (currentLine) {
        lines.push(currentLine.trim());
    }

    return lines.join('\n');
}

export class WordWrapDecorator extends Scene{
    constructor(decorated) {
        super();
        this.decorated = decorated;
    }

    displayLevelInfo(level) {
        level.description = wordWrap(level.description)
        this.decorated.displayLevelInfo(level);
    }
    async getScene(level) {
        return await this.decorated.getScene(level);
    }
}
