import inquirer from 'inquirer';
import { negativeFinish, positiveFinish } from './finishMessages.js';
import { getPrompt } from './getPrompt.js';

export class Scene {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    displayLevelInfo(level) {
        console.log('\n');
        if (level.title) console.log(level.title);
        if (level.description) console.log(level.description);
    }

    async getScene(level) {
        this.displayLevelInfo(level);
        return await this.strategy(level);
    }
}

export const promptStrategy = async (level) => {
    return inquirer.prompt(getPrompt(level));

};

export const negativeFinishStrategy = () => {
    console.log(negativeFinish);
    return null;
};

export const positiveFinishStrategy = () => {
    console.log(positiveFinish);
    return null;
};