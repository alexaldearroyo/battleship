import { renderBoard, placeShipsForHuman, placeShipsForComputer } from './domInteraction.js';

function startGame(human, computer, humanGameboard, computerGameboard) {
    // Poblamos los tableros con coordenadas predeterminadas (esto cambiará más adelante)
    // Por ahora, solo para propósitos de prueba
    humanGameboard.placeShip(/*...*/);
    computerGameboard.placeShip(/*...*/);

    renderBoard(humanGameboard, computerGameboard);
    placeShipsForHuman(human, humanGameboard);
    placeShipsForComputer(computer, computerGameboard);
}

export default startGame;
