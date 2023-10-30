import "./styles/main.css";
import { playerBoard, computerBoard, Board } from "./scripts/boards";
import {
  manualPlacement,
  playerPlacement,
  computerPlacement,
} from "./scripts/place";

const startButton = document.querySelector(".startButton") as HTMLElement;
const title = document.querySelector(".title") as HTMLElement;
const mainPage = document.querySelector(".mainPage") as HTMLElement;

function startGame() {
  // Elimina el botón de START GAME
  if (startButton) startButton.remove();

  // Envuelve el título en un nuevo div llamado titleSpace
  const titleSpace = document.createElement("div");
  titleSpace.classList.add("titleSpace");

  // Modifica el título para hacerlo más pequeño
  if (title) {
    title.classList.add("smallTitle");
    titleSpace.appendChild(title); // Reinserta el título en titleSpace
  }

  if (mainPage) {
    mainPage.insertBefore(titleSpace, mainPage.firstChild); // Añade titleSpace al inicio de mainPage
  }

  // Crea un nuevo div para boardsSpace
  const boardsSpace = document.createElement("div");
  boardsSpace.classList.add("boardsSpace");

  // Crea divs para playerBoardContainer y computerBoardContainer
  const playerBoardContainer = document.createElement("div");
  playerBoardContainer.classList.add("playerBoardContainer");
  const computerBoardContainer = document.createElement("div");
  computerBoardContainer.classList.add("computerBoardContainer");

  // Crea elementos span para los labels de jugador y computadora
  const playerLabel = document.createElement("span");
  playerLabel.classList.add("playerLabel");
  playerLabel.textContent = "Player";
  playerBoardContainer.appendChild(playerLabel);

  const computerLabel = document.createElement("span");
  computerLabel.classList.add("computerLabel");
  computerLabel.textContent = "Computer";
  computerBoardContainer.appendChild(computerLabel);

  // Añade los tableros a boardsSpace
  boardsSpace.appendChild(playerBoardContainer);
  boardsSpace.appendChild(computerBoardContainer);

  manualPlacement(playerBoardContainer);
  computerPlacement(); // <-- Mover esta línea hacia arriba

  if (playerBoardContainer && computerBoardContainer) {
    generateGrid(playerBoard, playerBoardContainer);
    generateGrid(computerBoard, computerBoardContainer);
  }

  // Crea el div playerBoardBelow y lo adjunta a playerBoardContainer
  const playerBoardBelow = document.createElement("div");
  playerBoardBelow.classList.add("playerBoardBelow");
  playerBoardContainer.appendChild(playerBoardBelow);

  // Llama a las funciones de colocación
  // playerPlacement(); // Comentada esta línea para desactivar la colocación aleatoria
  // manualPlacement(playerBoardContainer);

  // Crea el botón de cambio de dirección y lo adjunta a playerBoardBelow
  const changeDirButton = document.createElement("button");
  changeDirButton.classList.add("fa", "fa-refresh");
  changeDirButton.classList.add("changeDirButton");
  playerBoardBelow.appendChild(changeDirButton);

  // Crea el div computerBoardBelow (si lo necesitas en el futuro)
  const computerBoardBelow = document.createElement("div");
  computerBoardBelow.classList.add("computerBoardBelow");
  computerBoardContainer.appendChild(computerBoardBelow);

  // computerPlacement();

  if (mainPage) {
    mainPage.appendChild(boardsSpace);
  }
}

if (startButton) {
  startButton.addEventListener("click", startGame);
}

function generateGrid(board: Board, container: HTMLElement) {
  const boardSize = board.length; // Obtiene el tamaño del tablero

  // Crea un contenedor para las celdas y aplica la clase "board-container"
  const cellContainer = document.createElement("div");
  cellContainer.classList.add("board-container");

  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      // Agregar clases CSS según el estado de la celda en el tablero
      switch (board[x][y].status) {
        case "empty":
          cell.classList.add("empty");
          break;
        case "ship":
          cell.classList.add("ship");

          // solo para pruebas si es el tablero del ordenador
          if (container.classList.contains("computerBoardContainer")) {
            cell.classList.add("blue");
          }

          break;
        case "miss":
          cell.classList.add("miss"); // Agregar clase para disparo fallido
          break;
        case "hit":
          cell.classList.add("hit"); // Agregar clase para disparo exitoso
          break;
        default:
          break;
      }

      // Agregar coordenadas como contenido de la celda
      cell.textContent = `${x},${y}`;

      cellContainer.appendChild(cell);

      cell.dataset.x = x.toString();
      cell.dataset.y = y.toString();
    }
  }

  container.appendChild(cellContainer); // Agrega el contenedor de celdas al contenedor principal
}
