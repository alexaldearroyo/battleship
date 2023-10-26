import "../sass/main.scss";
import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";
import startGame from './gameLoop.js'; // Importa el bucle principal del juego

const carrier = new Ship(5, "carrier");
const battleship = new Ship(4, "battleship");
const cruiser = new Ship(3, "cruiser");
const submarine = new Ship(3, "submarine");
const boat = new Ship(2, "boat");

const human = new Player("Human");
const computer = new Player("Computer");

const humanGameboard = new Gameboard();
const computerGameboard = new Gameboard();

document.addEventListener("DOMContentLoaded", function () {
    const startGameButton = document.getElementById("startGameButton");
    startGameButton.addEventListener("click", () => startGame(human, computer, humanGameboard, computerGameboard));
});

