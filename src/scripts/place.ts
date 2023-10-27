import {
    playerBoard,
    computerBoard,
    Board,
    Cell,
} from './boards';

import {
    Ship,
    Axis,
    CarrierPlayer,
    BattleshipPlayer,
    DestructorPlayer,
    SubmarinePlayer,
    PatrolPlayer,
    CarrierComputer,
    BattleshipComputer,
    DestructorComputer,
    SubmarineComputer,
    PatrolComputer
} from './ships';

// Retorna true si es seguro colocar el barco en una posición determinada
function canPlaceShip(board: Cell[][], x: number, y: number, shipLength: number, vertical: boolean): boolean {
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1],  // N, S, W, E
        [-1, -1], [-1, 1], [1, -1], [1, 1] // NW, NE, SW, SE
    ];

    for (let i = 0; i < shipLength; i++) {
        const currentX = vertical ? x : x + i;
        const currentY = vertical ? y + i : y;

        if (currentX < 0 || currentY < 0 || currentX >= 10 || currentY >= 10) {
            return false; // out of board
        }

        if (board[currentX][currentY].status === 'ship') {
            return false; // cell already occupied
        }

        for (const [dx, dy] of directions) {
            const newX = currentX + dx;
            const newY = currentY + dy;
            if (newX >= 0 && newY >= 0 && newX < 10 && newY < 10 && board[newX][newY].status === 'ship') {
                return false; // adjacent ship found
            }
        }
    }

    // Verificar que no haya barcos adyacentes
    if (shipLength > 1) {
        for (const [dx, dy] of directions) {
            const adjacentX = x + dx;
            const adjacentY = y + dy;
            if (
                adjacentX >= 0 &&
                adjacentY >= 0 &&
                adjacentX < 10 &&
                adjacentY < 10 &&
                board[adjacentX][adjacentY].status === 'ship'
            ) {
                return false; // barco adyacente encontrado
            }
        }
    }

    return true;
}


// Coloca el barco en el tablero
function placeShip(board: Cell[][], ship: Ship): void {
    let tries = 0;
    const maxTries = 1000;

    while (tries < maxTries) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const vertical = Math.random() < 0.5;

        if (canPlaceShip(board, x, y, ship.length, vertical)) {
            for (let i = 0; i < ship.length; i++) {
                const currentX = vertical ? x : x + i;
                const currentY = vertical ? y + i : y;
                // Aquí asegúrate de asignar un objeto con las propiedades necesarias
                board[currentX][currentY] = {
                    x: currentX,
                    y: currentY,
                    status: 'ship',
                    ship: ship
                };                
            }
            return;
        }

        tries++;
    }

    throw new Error("Unable to place ship after many attempts");
}



function randomPlacement(board: Board, ship: Ship): void {
    let x: number, y: number;
    do {
        const orientations: Axis[] = ['horizontal', 'vertical'];
        ship.axis = orientations[Math.floor(Math.random() * orientations.length)];
        x = Math.floor(Math.random() * board.length);
        y = Math.floor(Math.random() * board.length);
    } while (!canPlaceShip(board, x, y, ship.length, ship.axis === 'vertical'));
    placeShip(board, ship);
}



// Fases de colocación
function playerPlacement(): void {
    try {
        randomPlacement(playerBoard, CarrierPlayer);
        randomPlacement(playerBoard, BattleshipPlayer);
        randomPlacement(playerBoard, DestructorPlayer);
        randomPlacement(playerBoard, SubmarinePlayer);
        randomPlacement(playerBoard, PatrolPlayer);
    } catch (error) {
        resetBoard(playerBoard);
        playerPlacement();
    }
}

function computerPlacement(): void {
    try {
        randomPlacement(computerBoard, CarrierComputer);
        randomPlacement(computerBoard, BattleshipComputer);
        randomPlacement(computerBoard, DestructorComputer);
        randomPlacement(computerBoard, SubmarineComputer);
        randomPlacement(computerBoard, PatrolComputer);
    } catch (error) {
        resetBoard(computerBoard);
        computerPlacement();
    }
}

function resetBoard(board: Cell[][]): void {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            board[x][y].status = "empty";
        }
    }
}



export { playerPlacement, computerPlacement };
