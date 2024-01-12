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
  const boardContainer = container.querySelector('.board-container');
  if (boardContainer) {
    container.removeChild(boardContainer);
  }
  generateGrid(board, container);
}


let hasGameStarted = false;
export let gameInstance = { instance: null as Game | null };

function generateGrid(board: Board, container: HTMLElement) {
  const boardSize = board.length;

  const cellContainer = document.createElement("div");
  cellContainer.classList.add("board-container");

  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.x = x.toString();
      cell.dataset.y = y.toString();

      switch (board[x][y].state) {
        case "empty":
          cell.classList.add("empty");
          cell.textContent = `${x},${y}`;
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

      // Adds a click event to all cells of the computer board, not just the "ship" cells
      if (container.classList.contains("computerBoardContainer")) {
        cell.addEventListener("click", function () {
          const xStr = cell.dataset.x;
          const yStr = cell.dataset.y;
        
          if (xStr !== undefined && yStr !== undefined) {
            const x = parseInt(xStr);
            const y = parseInt(yStr);
            if (gameInstance.instance) {
              gameInstance.instance.playerTurn(x, y);
              updateBoardView(computerBoard, computerBoardContainer);
              updateBoardView(playerBoard, playerBoardContainer);
            }
          }
        });
        
      }

      // If it is the player's board, color the cells of the ships
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

  mainPage.style.justifyContent = 'flex-end';
  mainPage.style.marginTop = '45px';

  const shipIcon = document.querySelector(".shipIcon") as HTMLImageElement;

  // Containers for the icon and the title
  const titleSpace = document.createElement("div");
  titleSpace.classList.add("titleSpace");

  const iconContainer = document.createElement("div");
  const titleContainer = document.createElement("div");

  if (shipIcon) {
    // Add the icon to the icon container
    iconContainer.appendChild(shipIcon);
    // Add the icon container to the titleSpace
    titleSpace.appendChild(iconContainer);
  }

  title.classList.add("smallTitle");
  titleContainer.appendChild(title);
  // Add the title container to the titleSpace
  titleSpace.appendChild(titleContainer);

  mainPage.insertBefore(titleSpace, mainPage.firstChild);

  // Space for the boards
  const boardsSpace = document.createElement("div");
  boardsSpace.classList.add("boardsSpace");

  // Container for the player's board
  playerBoardContainer.classList.add("playerBoardContainer");
  const playerLabel = document.createElement("span");
  playerLabel.classList.add("playerLabel");
  playerLabel.textContent = "Player";
  playerBoardContainer.appendChild(playerLabel);

  // Container for the computer board
  computerBoardContainer.classList.add("computerBoardContainer");
  const computerLabel = document.createElement("span");
  computerLabel.classList.add("computerLabel");
  computerLabel.textContent = "Computer";
  computerBoardContainer.appendChild(computerLabel);

  // Container below the player's board
  const playerBoardBelow = document.createElement("div");
  playerBoardBelow.classList.add("playerBoardBelow");

  // Container below the computer board
  const computerBoardBelow = document.createElement("div");
  computerBoardBelow.classList.add("computerBoardBelow");

  const changeDirButton = document.createElement("button");
  changeDirButton.classList.add("fa", "fa-refresh");
  changeDirButton.classList.add("changeDirButton");
  playerBoardBelow.appendChild(changeDirButton);

  // Add elements to the DOM
  mainPage.appendChild(boardsSpace);
  boardsSpace.appendChild(playerBoardContainer);
  boardsSpace.appendChild(playerBoardBelow);
  boardsSpace.appendChild(computerBoardContainer);
  boardsSpace.appendChild(computerBoardBelow);

  // Ship placement and grid generation
  computerPlacement();
  manualPlacement(
    playerBoardContainer,
    playerBoardBelow,
    changeDirButton,
    () => {
      if (!hasGameStarted) {
        gameInstance.instance = new Game(playerBoard, computerBoard);
        hasGameStarted = true;
    }
  }
  );

  generateGrid(playerBoard, playerBoardContainer);
  generateGrid(computerBoard, computerBoardContainer);
  
}


