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

import { Game } from "./game";
import { gameInstance } from "../index";

let shipsToPlace = [
  CarrierPlayer,
  BattleshipPlayer,
  DestructorPlayer,
  SubmarinePlayer,
  PatrolPlayer,
];

let shipsPlaced = 0;
const totalShips = 5;
let currentShipIndex = 0;
let defaultOrientation: "horizontal" | "vertical" = "horizontal";
let boundPreviewShipPlacement: ((event?: MouseEvent) => void) | null = null;
let boundPlaceCurrentShip: ((event: MouseEvent) => void) | null = null;



function canPlaceShip(
  board: Cell[][],
  x: number,
  y: number,
  shipLength: number,
  horizontal: boolean
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
    const currentX = horizontal ? x : x + i;
    const currentY = horizontal ? y + i : y;

    if (currentX < 0 || currentY < 0 || currentX >= 10 || currentY >= 10) {
      return false; // out of board
    }

    if (board[currentX][currentY].state === "ship") {
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
        board[newX][newY].state === "ship"
      ) {
        return false; // adjacent ship found
      }
    }
  }

  if (shipLength > 1) {
    for (const [dx, dy] of directions) {
      const adjacentX = x + dx;
      const adjacentY = y + dy;
      if (
        adjacentX >= 0 &&
        adjacentY >= 0 &&
        adjacentX < 10 &&
        adjacentY < 10 &&
        board[adjacentX][adjacentY].state === "ship"
      ) {
        return false;
      }
    }
  }

  return true;
}

function placeShip(
  board: Cell[][],
  ship: Ship,
  x: number,
  y: number,
  vertical: boolean
): void {
  for (let i = 0; i < ship.length; i++) {
    const currentX = vertical ? x : x + i;
    const currentY = vertical ? y + i : y;
    board[currentX][currentY] = {
      x: currentX,
      y: currentY,
      state: "ship",
      ship: ship,
    };
  }
}


function previewShipPlacement(
  playerBoardContainer: HTMLElement,
  event?: MouseEvent
) {
  if (!event) return; // Salir temprano si no se proporciona evento

  const lastShip = playerBoardContainer.querySelector(".green");
  if (lastShip) {
    lastShip.classList.remove("green");
  }

  if (currentShipIndex >= shipsToPlace.length) {
    return;
  }

  const cell = event.target as HTMLElement;
  if (!cell || !cell.dataset || !cell.dataset.x || !cell.dataset.y) {
    return;
  }
  let x: number;
  let y: number;

  const allCells = playerBoardContainer.querySelectorAll(".cell");
  allCells.forEach((cell) => {
    cell.classList.remove("green", "red");
  });

  if (cell.dataset.x && cell.dataset.y) {
    x = parseInt(cell.dataset.x, 10);
    y = parseInt(cell.dataset.y, 10);

    const ship = shipsToPlace[currentShipIndex];
    const canPlace = canPlaceShip(
      playerBoard,
      x,
      y,
      ship.length,
      defaultOrientation === "horizontal"
    );

    for (let i = 0; i < ship.length; i++) {
      const currentX = defaultOrientation === "horizontal" ? x : x + i;
      const currentY = defaultOrientation === "horizontal" ? y + i : y;
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

function placeCurrentShip(
  playerBoardContainer: HTMLElement,
  event: MouseEvent, // Añade este argumento
  onPlacementComplete: () => void // Añade este argumento
) {

  const cell = event.target as HTMLElement;
  if (
    cell.dataset.x &&
    cell.dataset.y &&
    currentShipIndex < shipsToPlace.length
  ) {
    const x = parseInt(cell.dataset.x, 10);
    const y = parseInt(cell.dataset.y, 10);

    const ship = shipsToPlace[currentShipIndex];
    const horizontal = defaultOrientation === "horizontal";

    if (canPlaceShip(playerBoard, x, y, ship.length, horizontal)) {
      placeShip(playerBoard, ship, x, y, horizontal);

      for (let i = 0; i < ship.length; i++) {
        const currentX = horizontal ? x : x + i;
        const currentY = horizontal ? y + i : y;
        const shipCell = document.querySelector(
          `.cell[data-x="${currentX}"][data-y="${currentY}"]`
        ) as HTMLElement;
        if (shipCell) {
          shipCell.style.backgroundColor = "blue";
          shipCell.classList.remove("green", "red");
        }
      }

      currentShipIndex++;
      shipsPlaced++; 

      if (currentShipIndex === shipsToPlace.length) {
        if (boundPreviewShipPlacement) {
          playerBoardContainer.removeEventListener("mouseover", boundPreviewShipPlacement);
        }
        if (boundPlaceCurrentShip) {
          playerBoardContainer.removeEventListener("click", boundPlaceCurrentShip);
        }
    

        boundPreviewShipPlacement = null;
        boundPlaceCurrentShip = null;
    

        const changeDirButton = document.querySelector(
          ".changeDirButton"
        ) as HTMLElement;
        if (changeDirButton) {
          changeDirButton.style.display = "none";
        }

        onPlacementComplete();
      }
    }
  }
}

export function manualPlacement(
  playerBoardContainer: HTMLElement,
  playerBoardBelow: HTMLElement,
  changeDirButton: HTMLButtonElement,
  onPlacementComplete: () => void
) {
  if (!boundPreviewShipPlacement) {
    boundPreviewShipPlacement = previewShipPlacement.bind(null, playerBoardContainer);
  }

  if (!boundPlaceCurrentShip) {
    boundPlaceCurrentShip = (event: MouseEvent) => {
      placeCurrentShip(playerBoardContainer, event, onPlacementComplete);
    };
  }

  playerBoardContainer.addEventListener("mouseover", boundPreviewShipPlacement);
  playerBoardContainer.addEventListener("click", boundPlaceCurrentShip);

  changeDirButton.addEventListener("click", () => {
      console.log("Botón presionado");

      if (defaultOrientation === "horizontal") {
        defaultOrientation = "vertical";
      } else {
        defaultOrientation = "horizontal";
      }

      const mockEvent = new MouseEvent("mouseover");
      previewShipPlacement(playerBoardContainer, mockEvent);
    });
  }



function randomPlacement(board: Board, ship: Ship): void {
  let x: number, y: number;
  let tries = 0;
  const maxTries = 1000;
  let placed = false;

  let possiblePositions: { x: number; y: number; vertical: boolean }[] = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      possiblePositions.push({ x: i, y: j, vertical: true });
      possiblePositions.push({ x: i, y: j, vertical: false });
    }
  }

  possiblePositions = possiblePositions.sort(() => Math.random() - 0.5);

  for (const position of possiblePositions) {
    x = position.x;
    y = position.y;
    ship.axis = position.vertical ? "vertical" : "horizontal";
    if (canPlaceShip(board, x, y, ship.length, ship.axis === "vertical")) {
      placeShip(board, ship, x, y, ship.axis === "vertical");
      placed = true;
      break;
    }
    tries++;
    if (tries >= maxTries) {
      break;
    }
  }

  if (!placed) {
    throw new Error("Unable to place ship after many attempts");
  }
}

function playerPlacement(attempts: number = 0): void {
  if (attempts >= 10) {
    throw new Error("Unable to place all player ships after 10 attempts.");
  }

  const ships = [
    CarrierPlayer,
    BattleshipPlayer,
    DestructorPlayer,
    SubmarinePlayer,
    PatrolPlayer,
  ];
  ships.sort((a, b) => b.length - a.length);

  try {
    for (const ship of ships) {
      randomPlacement(playerBoard, ship);
    }
  } catch (error) {
    resetBoard(playerBoard);
    playerPlacement(attempts + 1);
  }
}

function computerPlacement(attempts: number = 0): void {
  if (attempts >= 10) {
    throw new Error("Unable to place all computer ships after 10 attempts.");
  }

  try {
    randomPlacement(computerBoard, CarrierComputer);
    randomPlacement(computerBoard, BattleshipComputer);
    randomPlacement(computerBoard, DestructorComputer);
    randomPlacement(computerBoard, SubmarineComputer);
    randomPlacement(computerBoard, PatrolComputer);
  } catch (error) {
    resetBoard(computerBoard);
    computerPlacement(attempts + 1);
  }
}

function resetBoard(board: Cell[][]): void {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      board[x][y].state = "empty";
    }
  }
}

export { playerPlacement, computerPlacement, shipsPlaced, totalShips };
