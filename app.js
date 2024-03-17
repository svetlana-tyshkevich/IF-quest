import { scenario } from './src/scenario.js';

let currentLevel = scenario;

const setScene = () => {
    if (currentLevel.title) console.log(currentLevel.title);
    if (currentLevel.description) console.log(currentLevel.description);
    if (currentLevel.question && currentLevel.variants.length) {
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'choice',
                    message: currentLevel.question,
                    choices: [{
                        name: currentLevel.variants[0].answer,
                        value: 0,
                    }, {
                        name: currentLevel.variants[1].answer,
                        value: 1,
                    }],

                },
            ]).then((answer) => {
            currentLevel = currentLevel.variants[answer.choice];
            console.log('\n');
            setScene();
        })
    }
};

setScene();
