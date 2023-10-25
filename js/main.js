import '../sass/main.scss';
import Ship from './ship.js';
import Gameboard from './gameboard.js';
import Player from './player.js';

const carrier = new Ship(5);
const battleship = new Ship(4);
const cruiser = new Ship(3);
const submarine = new Ship(3);
const boat = new Ship(2);

const playerGameboard = new Gameboard();
const computerGameboard = new Gameboard();

const human = new Player('Human');
const computer = new Player('Computer');

document.addEventListener('DOMContentLoaded', function() {
    const startGameButton = document.getElementById('startGameButton');
    const gameContainer = document.getElementById('gameContainer');

    // Función para generar el tablero
    function generateBoard(gridElement) {
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.x = x;
                cell.dataset.y = y;
                gridElement.appendChild(cell);
            }
        }
    }

    // Generar tableros
    const playerGrid = document.querySelector('#player-board .grid');
    const computerGrid = document.querySelector('#computer-board .grid');
    generateBoard(playerGrid);
    generateBoard(computerGrid);

    startGameButton.addEventListener('click', function() {
        // Mostrar el contenedor de los tableros
        gameContainer.style.display = 'flex';

        // Opcional: Ocultar el botón "Start Game" después de hacer clic en él
        startGameButton.style.display = 'none';
    });
});
