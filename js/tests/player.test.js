import Player from '../player.js';
import Gameboard from '../gameboard.js';

describe('Player functionality', () => {
    test('Players can take turns playing', () => {
        const human = new Player('Human');
        const computer = new Player('Computer');
        const computerGameboard = new Gameboard();

        human.attack(computerGameboard, 5, 5);
        expect(computerGameboard.missedAttacks).toContainEqual({ x: 5, y: 5 });
    });

    test('Computer makes random plays without repetition', () => {
        const computer = new Player('Computer');
        const humanGameboard = new Gameboard();
    
        for (let i = 0; i < 50; i++) { // Let's make the computer play 50 times
            computer.randomAttack(humanGameboard); // No need to capture return value
        }
    
        // Check that there are no duplicate coordinates in previousAttacks
        const uniquePlays = new Set(computer.previousAttacks.map(coord => `${coord.x},${coord.y}`));
        expect(uniquePlays.size).toBe(computer.previousAttacks.length);
    });
    
});
