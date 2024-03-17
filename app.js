import inquirer from 'inquirer';
import { negativeFinish, positiveFinish } from './src/finishMessages.js';
import { scenario } from './src/scenario.js';
import { State } from './src/State.js';

let state = new State(scenario);


function getPrompt(level) {
    const choices = level.variants.map((choice, index) => ({ name: choice.answer, value: index }));
    const type = level.isInput ? 'input' : 'list';
    return {
        type,
        name: 'choice',
        message: level.question,
        choices,
    };
}

class Scene {
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

const promptStrategy = async (level) => {
    return await inquirer.prompt([getPrompt(level)]);

};

const negativeFinishStrategy = () => {
    console.log(negativeFinish);
    return null;
};

const positiveFinishStrategy = () => {
    console.log(positiveFinish);
    return null;
};


const playScene = async () => {
    const currentLevel = state.getCurrentLevel();
    const currentScene = new Scene(promptStrategy);

    if (currentLevel.question && currentLevel.variants.length) {
        const answer = await currentScene.getScene(currentLevel);
        state.setNextLevel(answer.choice);
        await playScene();
    } else {
        if (currentLevel.isFinish === 'negative') {
            currentScene.setStrategy(negativeFinishStrategy);
            await currentScene.getScene(currentLevel);
        } else {
            currentScene.setStrategy(positiveFinishStrategy);
            await currentScene.getScene(currentLevel);
        }
    }
};

await playScene();
