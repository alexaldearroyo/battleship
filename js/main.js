import '../sass/main.scss';

class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        this.hits++;
        if (this.hits >= this.length) {
            this.sunk = true;
        }
    }

    isSunk() {
        return this.sunk;
    }
}

const carrier = new Ship(5);
const battleship = new Ship(4);
const cruiser = new Ship(3);
const submarine = new Ship(3);
const boat = new Ship(2);


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
    const machineGrid = document.querySelector('#machine-board .grid');
    generateBoard(playerGrid);
    generateBoard(machineGrid);

    startGameButton.addEventListener('click', function() {
        // Mostrar el contenedor de los tableros
        gameContainer.style.display = 'flex';

        // Opcional: Ocultar el botón "Start Game" después de hacer clic en él
        startGameButton.style.display = 'none';
    });
});
