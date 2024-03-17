export function getPrompt(level) {
    const choices = level.variants.map((choice, index) => ({ name: choice.answer, value: index }));
    const type = level.isInput ? 'input' : 'list';
    return {
        type,
        name: 'choice',
        message: level.question,
        choices,
    };
}