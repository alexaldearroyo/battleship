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
      `playerTurn - Row: ${row}, Col: ${col}, Initial state of the cell: ${cell.state}`
    );
    if (cell.state === "empty") {
      cell.state = "miss";
      this.currentTurn = "computerTurn";
    } else if (cell.state === "ship") {
      cell.state = "hit";
      console.log(
        `Before addHit - Hits: ${cell.ship?.hits}, Ship state: ${cell.ship?.state}`
      );
      cell.ship?.addHit();
      console.log(
        `After addHit - Hits: ${cell.ship?.hits}, Ship state: ${cell.ship?.state}`
      );
      if (cell.ship?.state === "sunk") {
        this.computerBoatsSunk++;
        this.checkWinner();
      }
      this.currentTurn = "computerTurn";
    }
    console.log(`Final state of the cell: ${cell.state}`);
    
    // After player's turn, check if it's the computer's turn
    if (this.currentTurn === "computerTurn") {
      // Wait for a brief period before the computer makes its move
      this.computerTurn();
    }
  }

  computerTurn() {
    let cell: Cell;
    let targets: { row: number; col: number }[] = [];

    // Find all cells that are 'hit' but do not belong to a sunk ship
    for (let row = 0; row < this.playerBoard.length; row++) {
        for (let col = 0; col < this.playerBoard[row].length; col++) {
            const currentCell = this.playerBoard[row][col];
            if (currentCell.state === 'hit' && currentCell.ship?.state !== 'sunk') {
                // Add adjacent cells to the targets list
                targets.push(...this.getAdjacentCells(row, col));
            }
        }
    }

    // Filter cells that have already been hit or missed
    targets = targets.filter(target => {
        const targetCell = this.playerBoard[target.row][target.col];
        return targetCell.state === 'empty' || targetCell.state === 'ship';
    });

    // Choose a target randomly from the list or pick a random cell if no targets are available
    if (targets.length > 0) {
        const randomTarget = targets[Math.floor(Math.random() * targets.length)];
        cell = this.playerBoard[randomTarget.row][randomTarget.col];
    } else {
        let attempts = 0;
        const maxAttempts = 1000;
        do {
            if (attempts++ > maxAttempts) {
                console.log("Throwing error after too many attempts");
                throw new Error("Too many attempts to find a cell");
            }
            const row = Math.floor(Math.random() * 10);
            const col = Math.floor(Math.random() * 10);
            cell = this.playerBoard[row][col];
        } while (cell.state === 'hit' || cell.state === 'miss');
    }

    console.log(`Initial state of the cell: ${cell.state}`);

    if (cell.state === "empty") {
      cell.state = "miss";
      this.currentTurn = "playerTurn";
    } else if (cell.state === "ship") {
      cell.state = "hit";
      console.log(
        `Before addHit - Hits: ${cell.ship?.hits}, Ship state: ${cell.ship?.state}`
      );
      cell.ship?.addHit();
      console.log(`Final state of the cell: ${cell.state}`);
      console.log(
        `After addHit - Hits: ${cell.ship?.hits}, Ship state: ${cell.ship?.state}`
      );
      if (cell.ship?.state === "sunk") {
        this.playerBoatsSunk++;
        this.checkWinner();
      }
      this.currentTurn = "playerTurn";
    }
    console.log(`Final state of the cell: ${cell.state}`);
  }

  private getAdjacentCells(row: number, col: number): { row: number; col: number }[] {
    const directions = [
        { row: -1, col: 0 }, // Up
        { row: 1, col: 0 },  // Down
        { row: 0, col: -1 }, // Left
        { row: 0, col: 1 }   // Right
    ];

    return directions.map(dir => {
        return { row: row + dir.row, col: col + dir.col };
    }).filter(pos => {
        // Make sure the cell is within the board
        return pos.row >= 0 && pos.row < 10 && pos.col >= 0 && pos.col < 10;
    });
  }

  checkWinner() {
    if (this.playerBoatsSunk === 5) {
      console.log("Computer Wins!");
      showEndGamePopup('computer'); // Make sure 'computer' is exactly of the expected type
    } else if (this.computerBoatsSunk === 5) {
      console.log("Player Wins!");
      showEndGamePopup('player'); // Make sure 'player' is exactly of the expected type
    }
  }
  

  endGame(winner: "player" | "computer") {
    // Here you can emit an event or call an end game handling function.
    showEndGamePopup(winner);
  }
}

function showEndGamePopup(winner: 'player' | 'computer'): void {
    const message = winner === 'player' ? 'Player Wins!' : 'Computer Wins!';
    alert(message);
    location.reload(); // Reload the page
}

export { Game };
