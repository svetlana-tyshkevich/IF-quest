export class State {
    constructor(level) {
        this.currentLevel = level;
        this.levelNumber = 1
    }

    getCurrentLevel() {
        return this.currentLevel
    }

    getCurrentLevelNumber() {
        return this.levelNumber
    }

    setNextLevel(answerIndex) {
        this.currentLevel = this.currentLevel.variants[answerIndex];
        this.levelNumber += 1;
    }
}