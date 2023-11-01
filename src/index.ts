import "./styles/main.css";
import { playerBoard, computerBoard, Board } from "./scripts/boards";
import {
  manualPlacement,
  playerPlacement,
  computerPlacement,
  shipsPlaced,
  totalShips,
} from "./scripts/place";
import { Game } from "./scripts/game";

const startButton = document.querySelector(".startButton") as HTMLElement;
const title = document.querySelector(".title") as HTMLElement;
const mainPage = document.querySelector(".mainPage") as HTMLElement;
const playerBoardContainer = document.createElement("div");
const computerBoardContainer = document.createElement("div");

startButton.addEventListener("click", startGame);

function updateBoardView(board: Board, container: HTMLElement) {
  container.innerHTML = "";
  generateGrid(board, container);
}

export let gameInstance = { instance: null as Game | null };

function generateGrid(board: Board, container: HTMLElement) {
  const boardSize = board.length;

  const cellContainer = document.createElement("div");
  cellContainer.classList.add("board-container");

  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x.toString(); // Asegurando que dataset.x esté definido
      cell.dataset.y = y.toString(); // Asegurando que dataset.y esté definido

      switch (board[x][y].state) {
        case "empty":
          cell.classList.add("empty");
          cell.textContent = `${x},${y}`; // Muestra las coordenadas en las celdas vacías
          break;
        case "ship":
          cell.classList.add("ship");
          break;
        case "miss":
          cell.classList.add("miss");
          // cell.textContent = "X";
          break;
        case "hit":
          cell.classList.add("hit");
          break;
        default:
          break;
      }

      // Agrega un evento de clic a todas las celdas del tablero del ordenador, no solo a las celdas "ship"
      if (container.classList.contains("computerBoardContainer")) {
        cell.addEventListener("click", function () {
          const xStr = cell.dataset.x;
          const yStr = cell.dataset.y;

          // Asegurarse de que xStr y yStr no sean undefined antes de convertirlos en números
          if (xStr !== undefined && yStr !== undefined) {
            const x = parseInt(xStr);
            const y = parseInt(yStr);
            if (gameInstance.instance) {
              gameInstance.instance.playerTurn(x, y);
              gameInstance.instance.computerTurn();
              updateBoardView(computerBoard, computerBoardContainer);
              updateBoardView(playerBoard, playerBoardContainer);
            }
          }
        });
      }

      // Si es el tablero del jugador, colorea las celdas de los barcos
      if (container.classList.contains("playerBoardContainer") && board[x][y].state === "ship") {
        cell.classList.add("blue");
      }

      cellContainer.appendChild(cell);
    }
  }

  container.appendChild(cellContainer);
}


function startGame() {
  if (startButton) startButton.remove();

  // Título
  const titleSpace = document.createElement("div");
  titleSpace.classList.add("titleSpace");

  title.classList.add("smallTitle");
  titleSpace.appendChild(title);

  mainPage.insertBefore(titleSpace, mainPage.firstChild);

  // Espacio para los tableros
  const boardsSpace = document.createElement("div");
  boardsSpace.classList.add("boardsSpace");

  // Contenedor del tablero del jugador
  playerBoardContainer.classList.add("playerBoardContainer");
  const playerLabel = document.createElement("span");
  playerLabel.classList.add("playerLabel");
  playerLabel.textContent = "Player";
  playerBoardContainer.appendChild(playerLabel);

  // Contenedor del tablero de la computadora
  computerBoardContainer.classList.add("computerBoardContainer");
  const computerLabel = document.createElement("span");
  computerLabel.classList.add("computerLabel");
  computerLabel.textContent = "Computer";
  computerBoardContainer.appendChild(computerLabel);

  // Contenedor debajo del tablero del jugador
  const playerBoardBelow = document.createElement("div");
  playerBoardBelow.classList.add("playerBoardBelow");

  // Contenedor debajo del tablero de la computadora
  const computerBoardBelow = document.createElement("div");
  computerBoardBelow.classList.add("computerBoardBelow");

  const changeDirButton = document.createElement("button");
  changeDirButton.classList.add("fa", "fa-refresh");
  changeDirButton.classList.add("changeDirButton");
  playerBoardBelow.appendChild(changeDirButton);

  // Añadir elementos al DOM
  mainPage.appendChild(boardsSpace);
  boardsSpace.appendChild(playerBoardContainer);
  boardsSpace.appendChild(playerBoardBelow);
  boardsSpace.appendChild(computerBoardContainer);
  boardsSpace.appendChild(computerBoardBelow);

  // Colocación de los barcos y generación de la cuadrícula
  computerPlacement();
  manualPlacement(
    playerBoardContainer,
    playerBoardBelow,
    changeDirButton,
    () => {
      if (gameInstance.instance) {
        gameInstance.instance.playerTurn();
      }
    }
  );

  generateGrid(playerBoard, playerBoardContainer);
  generateGrid(computerBoard, computerBoardContainer);
}


