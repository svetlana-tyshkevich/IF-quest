import { WordWrapDecorator } from './src/decorators.js';
import { scenario } from './src/scenario.js';
import { negativeFinishStrategy, positiveFinishStrategy, promptStrategy, Scene } from './src/scene.js';
import { State } from './src/State.js';

let state = new State(scenario);


const playScene = async () => {
    const currentLevel = state.getCurrentLevel();
    let currentScene = new Scene(promptStrategy);
    currentScene = new WordWrapDecorator(currentScene);

    if (currentLevel.question && currentLevel.variants.length) {
        let nextStepIndex;
        const answer = await currentScene.getScene(currentLevel);
        if (currentLevel.isInput) {
            const answerIsCorrect = answer.choice.toLowerCase() === currentLevel.inputAnswer.toLowerCase();
            nextStepIndex = answerIsCorrect ? 0 : 1;
        } else {
            nextStepIndex = answer.choice;
        }
        state.setNextLevel(nextStepIndex);
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
