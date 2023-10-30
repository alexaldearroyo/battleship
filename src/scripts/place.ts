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
export let defaultOrientation: "horizontal" | "vertical" = "horizontal";

export function previewShipPlacement(
  playerBoardContainer: HTMLElement,
  event: MouseEvent
) {
  // Eliminar la clase CSS "green" del último barco colocado
  const lastShip = playerBoardContainer.querySelector(".green");
  if (lastShip) {
    lastShip.classList.remove("green");
  }

  if (currentShipIndex >= shipsToPlace.length) {
    return; // Exit early if all ships have been placed
  }

  const cell = event.target as HTMLElement;
  if (!cell || !cell.dataset || !cell.dataset.x || !cell.dataset.y) {
    return;
  }
  let x: number;
  let y: number;

  // Reset all cells to their original color
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

    // Use a loop to iterate over the cells and set their background color
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
  event: MouseEvent
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
        }
      }

      const boundPreviewShipPlacement = previewShipPlacement.bind(
        null,
        playerBoardContainer
      );
      const boundPlaceCurrentShip = placeCurrentShip.bind(
        null,
        playerBoardContainer
      );
      playerBoardContainer.removeEventListener(
        "mouseover",
        boundPreviewShipPlacement
      );
      currentShipIndex++;

      // Si todos los barcos han sido colocados
      if (currentShipIndex === shipsToPlace.length) {
        playerBoardContainer.removeEventListener(
          "mouseover",
          boundPreviewShipPlacement
        );
        playerBoardContainer.removeEventListener(
          "click",
          boundPlaceCurrentShip
        );

        // Oculta el botón changeDirButton
        const changeDirButton = document.querySelector(
          ".changeDirButton"
        ) as HTMLElement;
        if (changeDirButton) {
          changeDirButton.style.display = "none";
        }
      }
    }
  }
}

export function manualPlacement(
  playerBoardContainer: HTMLElement,
  playerBoardBelow: HTMLElement
) {
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

  // Crea el botón de cambio de dirección y lo adjunta a playerBoardBelow
  const changeDirButton = document.createElement("button");
  changeDirButton.classList.add("fa", "fa-refresh");
  changeDirButton.classList.add("changeDirButton");
  playerBoardBelow.appendChild(changeDirButton);

  if (changeDirButton) {
    changeDirButton.addEventListener("click", () => {
      console.log("Botón presionado"); // Agrega esta línea

      // Cambiar la orientación por defecto
      if (defaultOrientation === "horizontal") {
        defaultOrientation = "vertical";
      } else {
        defaultOrientation = "horizontal";
      }

      // Actualizar la vista previa del barco en el tablero
      const mockEvent = new MouseEvent("mouseover");
      previewShipPlacement(playerBoardContainer, mockEvent);
    });
  }
}

// Retorna true si es seguro colocar el barco en una posición determinada
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

  // 1. Genera todas las posiciones posibles en el tablero para la orientación dada
  let possiblePositions: { x: number; y: number; vertical: boolean }[] = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      possiblePositions.push({ x: i, y: j, vertical: true });
      possiblePositions.push({ x: i, y: j, vertical: false });
    }
  }

  // 2. Baraja (shuffle) estas posiciones
  possiblePositions = possiblePositions.sort(() => Math.random() - 0.5);

  // 3. Prueba colocar el barco en cada posición, en el orden barajado
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

  // Ordena los barcos por tamaño antes de intentar colocarlos
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
      board[x][y].status = "empty";
    }
  }
}

export { playerPlacement, computerPlacement };

// TEST4
