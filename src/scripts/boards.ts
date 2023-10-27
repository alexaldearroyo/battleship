// boards.ts

type CellStatus = "empty" | "ship" | "miss" | "hit";

interface Cell {
    x: number;
    y: number;
    status: CellStatus;
}

type Board = Cell[][];

// Función de ayuda para crear un tablero vacío con coordenadas
function createEmptyBoard(size: number): Board {
    const board: Board = [];
    for (let x = 0; x < size; x++) {
        const row: Cell[] = [];
        for (let y = 0; y < size; y++) {
            row.push({
                x,
                y,
                status: "empty"
            });
        }
        board.push(row);
    }
    return board;
}

// Crear tableros de 10x10 con coordenadas
const playerBoard: Board = createEmptyBoard(10);
const computerBoard: Board = createEmptyBoard(10);

export { playerBoard, computerBoard, Board };
