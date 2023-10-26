import { renderBoard, placeShipsForHuman, placeShipsForComputer } from './domInteraction.js';

function startGame(human, computer, humanGameboard, computerGameboard) {
    // Poblamos los tableros con coordenadas predeterminadas (esto cambiará más adelante)
    // Por ahora, solo para propósitos de prueba
    // humanGameboard.placeShip(/*...*/);
    // computerGameboard.placeShip(/*...*/);

    // Renderiza los tableros
    renderBoard(humanGameboard, computerGameboard);

    // Coloca los barcos para el humano y la computadora
    placeShipsForHuman(human, humanGameboard);
    placeShipsForComputer(computer, computerGameboard);

    // Muestra el contenedor del juego y oculta el botón "Start Game"
    const gameContainer = document.getElementById("gameContainer");
    const startGameButton = document.getElementById("startGameButton");
    gameContainer.style.display = "flex";
    startGameButton.style.display = "none";
}

export default startGame;
