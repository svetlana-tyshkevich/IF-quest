import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';

const rl = readline.createInterface({ input, output });

rl.on('line', async (line) => {
    try {
        console.log(line);
    } catch {
        console.log('Что-то пошло не так. Игра окончена!');
        rl.close();
    }
});

rl.on('SIGINT', () => {
    rl.close();
});