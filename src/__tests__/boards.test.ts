import { playerBoard, computerBoard } from '../scripts/boards';

describe('Battleship Boards', () => {
    it('should create a player board with correct size', () => {
        expect(playerBoard.length).toBe(10);
        expect(playerBoard[0].length).toBe(10);
    });

    it('should create a computer board with correct size', () => {
        expect(computerBoard.length).toBe(10);
        expect(computerBoard[0].length).toBe(10);
    });

    it('should initialize all cells to empty for player board', () => {
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                expect(playerBoard[x][y].status).toBe('empty');
            }
        }
    });

    it('should initialize all cells to empty for computer board', () => {
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                expect(computerBoard[x][y].status).toBe('empty');
            }
        }
    });

    it('should assign correct coordinates to each cell in player board', () => {
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                expect(playerBoard[x][y].x).toBe(x);
                expect(playerBoard[x][y].y).toBe(y);
            }
        }
    });

    it('should assign correct coordinates to each cell in computer board', () => {
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                expect(computerBoard[x][y].x).toBe(x);
                expect(computerBoard[x][y].y).toBe(y);
            }
        }
    });
});
