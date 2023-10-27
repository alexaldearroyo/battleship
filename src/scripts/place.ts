// src/scripts/place.ts

import {
    playerBoard,
    computerBoard,
    Board,
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
function canPlaceShip(board: Board, ship: Ship, x: number, y: number): boolean {

    // Validar que no se salga del tablero
    if (ship.axis === 'horizontal' && x + ship.length > board.length) return false;
    if (ship.axis === 'vertical' && y + ship.length > board.length) return false;

    // Comprueba si algún barco está "pegado" a la posición deseada
    for (let i = 0; i < ship.length; i++) {
        // Comprobar si la celda está ocupada o tiene un barco adyacente
        if (ship.axis === 'horizontal') {
            if (board[x + i][y].status !== "empty" || hasAdjacentShip(board, x + i, y)) return false;
        } else {
            if (board[x][y + i].status !== "empty" || hasAdjacentShip(board, x, y + i)) return false;
        }
    }
    return true;
}

// Revisa si una celda tiene un barco en una celda adyacente
function hasAdjacentShip(board: Board, x: number, y: number): boolean {
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];

    for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newY >= 0 && newX < board.length && newY < board.length) {
            if (board[newX][newY].status === 'ship') return true;
        }
    }
    return false;
}

// Coloca el barco en el tablero
function placeShip(board: Board, ship: Ship, x: number, y: number): void {
    for (let i = 0; i < ship.length; i++) {
        if (ship.axis === 'horizontal') {
            board[x + i][y].status = "ship";
        } else {
            board[x][y + i].status = "ship";
        }
    }
}

function randomPlacement(board: Board, ship: Ship): void {
    let x: number, y: number;
    do {
        const orientations: Axis[] = ['horizontal', 'vertical'];
        ship.axis = orientations[Math.floor(Math.random() * orientations.length)];
        x = Math.floor(Math.random() * board.length);
        y = Math.floor(Math.random() * board.length);
    } while (!canPlaceShip(board, ship, x, y));
    placeShip(board, ship, x, y);
}


// Fases de colocación
function playerPlacement(): void {
    // Por simplicidad, usaremos la colocación aleatoria para el jugador también
    const ships = [CarrierPlayer, BattleshipPlayer, DestructorPlayer, SubmarinePlayer, PatrolPlayer];
    for (const ship of ships) {
        randomPlacement(playerBoard, ship);
    }
}

function computerPlacement(): void {
    const ships = [CarrierComputer, BattleshipComputer, DestructorComputer, SubmarineComputer, PatrolComputer];
    for (const ship of ships) {
        randomPlacement(computerBoard, ship);
    }
}

export { playerPlacement, computerPlacement };
