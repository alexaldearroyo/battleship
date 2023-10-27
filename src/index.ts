import './styles/main.css';

const startButton = document.querySelector(".startGameButton") as HTMLElement;
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

    // Añade los tableros a boardsSpace
    boardsSpace.appendChild(playerBoardContainer);
    boardsSpace.appendChild(computerBoardContainer);

    if (mainPage) {
        mainPage.appendChild(boardsSpace);
    }
}


if (startButton) {
    startButton.addEventListener("click", startGame);
}
