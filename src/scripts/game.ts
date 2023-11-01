import { Ship } from "./ships";
import { Cell } from "./boards";

class Game {
  playerBoard: Cell[][];
  computerBoard: Cell[][];
  currentTurn: "playerTurn" | "computerTurn";
  playerBoatsSunk: number = 0;
  computerBoatsSunk: number = 0;

  constructor(playerBoard: Cell[][], computerBoard: Cell[][]) {
    this.playerBoard = playerBoard;
    this.computerBoard = computerBoard;
    this.currentTurn = "playerTurn";
  }

  playerTurn(row: number = 0, col: number = 0) {
    const cell = this.computerBoard[row][col];
    console.log(
      `playerTurn - Row: ${row}, Col: ${col}, Estado inicial de la celda: ${cell.state}`
    );
    if (cell.state === "empty") {
      cell.state = "miss";
      this.currentTurn = "computerTurn";
    } else if (cell.state === "ship") {
      cell.state = "hit";
      console.log(
        `Antes de addHit - Hits: ${cell.ship?.hits}, Estado del barco: ${cell.ship?.state}`
      );
      cell.ship?.addHit();
      console.log(
        `Después de addHit - Hits: ${cell.ship?.hits}, Estado del barco: ${cell.ship?.state}`
      );
      if (cell.ship?.state === "sunk") {
        this.computerBoatsSunk++;
        this.checkWinner();
      }
      this.currentTurn = "computerTurn";
    }
    console.log(`Estado final de la celda: ${cell.state}`);
        // Después de la jugada del jugador, comprueba si es el turno de la computadora
    if (this.currentTurn === "computerTurn") {
      // Espera un breve periodo antes de que la computadora haga su jugada
      this.computerTurn();
    }
  }

  computerTurn() {
    let cell: Cell;
    let targets: { row: number; col: number }[] = [];

    // Encuentra todas las celdas que son 'hit' pero no pertenecen a un barco hundido
    for (let row = 0; row < this.playerBoard.length; row++) {
        for (let col = 0; col < this.playerBoard[row].length; col++) {
            const currentCell = this.playerBoard[row][col];
            if (currentCell.state === 'hit' && currentCell.ship?.state !== 'sunk') {
                // Agrega las celdas adyacentes a la lista de objetivos
                targets.push(...this.getAdjacentCells(row, col));
            }
        }
    }

    // Filtra las celdas que ya han sido golpeadas o falladas
    targets = targets.filter(target => {
        const targetCell = this.playerBoard[target.row][target.col];
        return targetCell.state === 'empty' || targetCell.state === 'ship';
    });

    // Elige un objetivo aleatoriamente de la lista o elige una celda aleatoria si no hay objetivos
    if (targets.length > 0) {
        const randomTarget = targets[Math.floor(Math.random() * targets.length)];
        cell = this.playerBoard[randomTarget.row][randomTarget.col];
    } else {
        let attempts = 0;
        const maxAttempts = 1000;
        do {
            if (attempts++ > maxAttempts) {
                console.log("Lanzando error después de demasiados intentos");
                throw new Error("Too many attempts to find a cell");
            }
            const row = Math.floor(Math.random() * 10);
            const col = Math.floor(Math.random() * 10);
            cell = this.playerBoard[row][col];
        } while (cell.state === 'hit' || cell.state === 'miss');
    }


    console.log(`Estado inicial de la celda: ${cell.state}`);

    if (cell.state === "empty") {
      cell.state = "miss";
      this.currentTurn = "playerTurn";
    } else if (cell.state === "ship") {
      cell.state = "hit";
      console.log(
        `Antes de addHit - Hits: ${cell.ship?.hits}, Estado del barco: ${cell.ship?.state}`
      );
      cell.ship?.addHit();
      console.log(`Estado final de la celda: ${cell.state}`);
      console.log(
        `Después de addHit - Hits: ${cell.ship?.hits}, Estado del barco: ${cell.ship?.state}`
      );
      if (cell.ship?.state === "sunk") {
        this.playerBoatsSunk++;
        this.checkWinner();
      }
      this.currentTurn = "playerTurn";
    }
    console.log(`Estado final de la celda: ${cell.state}`);
  }

  private getAdjacentCells(row: number, col: number): { row: number; col: number }[] {
    const directions = [
        { row: -1, col: 0 }, // Arriba
        { row: 1, col: 0 },  // Abajo
        { row: 0, col: -1 }, // Izquierda
        { row: 0, col: 1 }   // Derecha
    ];

    return directions.map(dir => {
        return { row: row + dir.row, col: col + dir.col };
    }).filter(pos => {
        // Asegúrate de que la celda está dentro del tablero
        return pos.row >= 0 && pos.row < 10 && pos.col >= 0 && pos.col < 10;
    });
  }

  checkWinner() {
    if (this.playerBoatsSunk === 5) {
      console.log("Computer Wins!");
      showEndGamePopup('computer'); // Asegúrate de que 'computer' es exactamente del tipo esperado
    } else if (this.computerBoatsSunk === 5) {
      console.log("Player Wins!");
      showEndGamePopup('player'); // Asegúrate de que 'player' es exactamente del tipo esperado
    }
  }
  

  endGame(winner: "player" | "computer") {
    // Aquí puedes emitir un evento o llamar a una función de manejo de fin de juego.
    showEndGamePopup(winner);
  }
}

function showEndGamePopup(winner: 'player' | 'computer'): void {
    const message = winner === 'player' ? 'Player Wins!' : 'Computer Wins!';
    alert(message);
    location.reload(); // Recarga la página
  }
  

export { Game };


