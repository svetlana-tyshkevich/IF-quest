import { Scene, SceneInterface } from './scene.js';

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

export class WordWrapDecorator extends SceneInterface {
    constructor(decorated) {
        super();
        this.decorated = decorated;
    }

    getScene(level) {
        level.description = wordWrap(level.description);
       return this.decorated.getScene(level);
    }

    setStrategy(strategy) {
        this.decorated.setStrategy(strategy);
    }
}
