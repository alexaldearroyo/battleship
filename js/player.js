
export default class Player {
    constructor(name) {
        this.name = name;
        this.previousAttacks = [];
    }

    attack(gameboard, x, y) {
        if (!this.previousAttacks.some(coord => coord.x === x && coord.y === y)) {
            gameboard.receiveAttack(x, y);
            this.previousAttacks.push({ x, y });
        }
    }

    randomAttack(gameboard) {
        let x, y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (this.previousAttacks.some(coord => coord.x === x && coord.y === y));
        this.attack(gameboard, x, y);
    }
}
