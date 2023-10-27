import { playerBoard, computerBoard, Board, Cell } from "./boards";

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
  PatrolComputer,
} from "./ships";

let shipsToPlace = [
  CarrierPlayer,
  BattleshipPlayer,
  DestructorPlayer,
  SubmarinePlayer,
  PatrolPlayer,
];
let currentShipIndex = 0;
const defaultOrientation: "horizontal" | "vertical" = "horizontal";

function previewShipPlacement(playerBoardContainer: HTMLElement, event: MouseEvent) {
  const cell = event.target as HTMLElement;
  let x: number;
  let y: number;

  if (cell.dataset.x && cell.dataset.y) {
    x = parseInt(cell.dataset.x, 10);
    y = parseInt(cell.dataset.y, 10);

    const ship = shipsToPlace[currentShipIndex];
    const canPlace = canPlaceShip(
      playerBoard,
      x,
      y,
      ship.length,
      defaultOrientation === "vertical"
    );

    // Usar un bucle para iterar sobre las celdas y establecer su color de fondo
    for (let i = 0; i < ship.length; i++) {
      const currentX = defaultOrientation === "vertical" ? x : x + i;
      const currentY = defaultOrientation === "vertical" ? y + i : y;
      const previewCell = document.querySelector(
        `.cell[data-x="${currentX}"][data-y="${currentY}"]`
      );
      if (previewCell) {
        previewCell.classList.toggle("green", canPlace);
        previewCell.classList.toggle("red", !canPlace);
      }
    }
  }
}

function placeCurrentShip(playerBoardContainer: HTMLElement, event: MouseEvent) {
    const cell = event.target as HTMLElement;
    if (cell.dataset.x && cell.dataset.y) {
        const x = parseInt(cell.dataset.x, 10);
        const y = parseInt(cell.dataset.y, 10);
        
        const ship = shipsToPlace[currentShipIndex];
        const vertical = defaultOrientation === "vertical";
        
        if (canPlaceShip(playerBoard, x, y, ship.length, vertical)) {
            placeShip(playerBoard, ship, x, y, vertical); // Aquí pasamos todos los argumentos necesarios
            const boundPreviewShipPlacement = previewShipPlacement.bind(null, playerBoardContainer);
            const boundPlaceCurrentShip = placeCurrentShip.bind(null, playerBoardContainer);
            playerBoardContainer.removeEventListener("mouseover", boundPreviewShipPlacement);
            currentShipIndex++;

            // Si todos los barcos han sido colocados
            if (currentShipIndex === shipsToPlace.length) {
                playerBoardContainer.removeEventListener("mouseover", boundPreviewShipPlacement);
                playerBoardContainer.removeEventListener("click", boundPlaceCurrentShip);
            }
        }
    }
}


export function manualPlacement(playerBoardContainer: HTMLElement) {
  const boundPreviewShipPlacement = previewShipPlacement.bind(
    null,
    playerBoardContainer
  );
  const boundPlaceCurrentShip = placeCurrentShip.bind(
    null,
    playerBoardContainer
  );

  playerBoardContainer.addEventListener("mouseover", boundPreviewShipPlacement);
  playerBoardContainer.addEventListener("click", boundPlaceCurrentShip);
}

// Retorna true si es seguro colocar el barco en una posición determinada
function canPlaceShip(
  board: Cell[][],
  x: number,
  y: number,
  shipLength: number,
  vertical: boolean
): boolean {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1], // N, S, W, E
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1], // NW, NE, SW, SE
  ];

  for (let i = 0; i < shipLength; i++) {
    const currentX = vertical ? x : x + i;
    const currentY = vertical ? y + i : y;

    if (currentX < 0 || currentY < 0 || currentX >= 10 || currentY >= 10) {
      return false; // out of board
    }

    if (board[currentX][currentY].status === "ship") {
      return false; // cell already occupied
    }

    for (const [dx, dy] of directions) {
      const newX = currentX + dx;
      const newY = currentY + dy;
      if (
        newX >= 0 &&
        newY >= 0 &&
        newX < 10 &&
        newY < 10 &&
        board[newX][newY].status === "ship"
      ) {
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
        board[adjacentX][adjacentY].status === "ship"
      ) {
        return false; // barco adyacente encontrado
      }
    }
  }

  return true;
}

// Coloca el barco en el tablero
function placeShip(board: Cell[][], ship: Ship, x: number, y: number, vertical: boolean): void {
    for (let i = 0; i < ship.length; i++) {
        const currentX = vertical ? x : x + i;
        const currentY = vertical ? y + i : y;
        board[currentX][currentY] = {
            x: currentX,
            y: currentY,
            status: "ship",
            ship: ship,
        };
    }
}

function randomPlacement(board: Board, ship: Ship): void {
    let x: number, y: number;
    let tries = 0;
    const maxTries = 1000;
    let placed = false;

    while (tries < maxTries && !placed) {
        const orientations: Axis[] = ["horizontal", "vertical"];
        ship.axis = orientations[Math.floor(Math.random() * orientations.length)];
        x = Math.floor(Math.random() * board.length);
        y = Math.floor(Math.random() * board.length);

        if (canPlaceShip(board, x, y, ship.length, ship.axis === "vertical")) {
            placeShip(board, ship, x, y, ship.axis === "vertical");
            placed = true;
        }
        tries++;
    }

    if (!placed) {
        throw new Error("Unable to place ship after many attempts");
    }
}

//////

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
