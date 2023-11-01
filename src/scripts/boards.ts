import { Ship } from './ships';

interface Cell {
    x: number;
    y: number;
    state: 'empty' | 'ship' | 'hit' | 'miss';
    ship?: Ship;
}


type Board = Cell[][];

export function createEmptyBoard(size: number): Board {
    const board: Board = [];
    for (let x = 0; x < size; x++) {
        const row: Cell[] = [];
        for (let y = 0; y < size; y++) {
            row.push({
                x,
                y,
                state: "empty"
            });
        }
        board.push(row);
    }
    return board;
}

const playerBoard: Board = createEmptyBoard(10);
const computerBoard: Board = createEmptyBoard(10);

export { playerBoard, computerBoard, Board, Cell };
