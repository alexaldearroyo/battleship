import { playerBoard, computerBoard, Cell } from "../scripts/boards";

import {
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
} from "../scripts/ships";

import {
  playerPlacement,
  computerPlacement,
  manualPlacement,
} from "../scripts/place"; // Reemplaza con la ubicación correcta de tu módulo de colocación

// Función para restablecer el tablero
function resetBoard(board: Cell[][]): void {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      board[x][y].state = "empty";
      board[x][y].ship = undefined; // Establecer ship como undefined
    }
  }
}

describe("Ship Placement", () => {
  beforeEach(() => {
    // Restablecer los tableros antes de cada prueba
    resetBoard(playerBoard);
    resetBoard(computerBoard);
  });

  test("Player placement should place all player ships", () => {
    playerPlacement();

    const playerShips = [
      CarrierPlayer,
      BattleshipPlayer,
      DestructorPlayer,
      SubmarinePlayer,
      PatrolPlayer,
    ];

    for (const ship of playerShips) {
      const placedShip = playerBoard.flat().find((cell) => cell.ship === ship);
      expect(placedShip).toBeDefined();
    }
  });

  test("Computer placement should place all computer ships", () => {
    computerPlacement();

    const computerShips = [
      CarrierComputer,
      BattleshipComputer,
      DestructorComputer,
      SubmarineComputer,
      PatrolComputer,
    ];

    for (const ship of computerShips) {
      const placedShip = computerBoard
        .flat()
        .find((cell) => cell.ship === ship);
      expect(placedShip).toBeDefined();
    }
  });

  test("Ships should not overlap on player board", () => {
    playerPlacement();
    const playerShips = [
      CarrierPlayer,
      BattleshipPlayer,
      DestructorPlayer,
      SubmarinePlayer,
      PatrolPlayer,
    ];

    for (let i = 0; i < playerShips.length; i++) {
      for (let j = i + 1; j < playerShips.length; j++) {
        const shipA = playerBoard
          .flat()
          .find((cell) => cell.ship === playerShips[i]);
        const shipB = playerBoard
          .flat()
          .find((cell) => cell.ship === playerShips[j]);

        if (shipA && shipB) {
          expect(shipA).not.toEqual(shipB);
        }
      }
    }
  });

  test("Ships should not overlap on computer board", () => {
    computerPlacement();
    const computerShips = [
      CarrierComputer,
      BattleshipComputer,
      DestructorComputer,
      SubmarineComputer,
      PatrolComputer,
    ];

    for (let i = 0; i < computerShips.length; i++) {
      for (let j = i + 1; j < computerShips.length; j++) {
        const shipA = computerBoard
          .flat()
          .find((cell) => cell.ship === computerShips[i]);
        const shipB = computerBoard
          .flat()
          .find((cell) => cell.ship === computerShips[j]);

        if (shipA && shipB) {
          expect(shipA).not.toEqual(shipB);
        }
      }
    }
  });

  test("Manual placement should occupy cells with ships", () => {
    // Crear un contenedor simulado para el tablero del jugador
    const playerBoardContainer = document.createElement("div");
    const playerBoardBelow = document.createElement("div");
    const changeDirButton = document.createElement("button");
    changeDirButton.classList.add("fa", "fa-refresh");
    changeDirButton.classList.add("changeDirButton");
    playerBoardBelow.appendChild(changeDirButton);
  

    manualPlacement(playerBoardContainer, playerBoardBelow, changeDirButton, () => {
      // Aquí puedes incluir lo que debe suceder después de que todos los barcos se coloquen,
      // por ahora, lo dejamos vacío ya que es solo una simulación.
    });
  
    const simulatedClickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    const cell = document.createElement("div");
    cell.dataset.x = "0";
    cell.dataset.y = "0";

    playerBoardContainer.appendChild(cell);
    cell.dispatchEvent(simulatedClickEvent);

    expect(playerBoard[0][0].state).toBe("ship");
  });


});
