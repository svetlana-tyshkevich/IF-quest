import { scenario } from './src/scenario.js';
import { negativeFinishStrategy, positiveFinishStrategy, promptStrategy, Scene } from './src/scene.js';
import { State } from './src/State.js';

let state = new State(scenario);


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
