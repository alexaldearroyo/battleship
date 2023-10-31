import { Ship } from './ships';

interface Cell {
    state: "empty" | "ship" | "hit" | "miss";
    ship?: Ship;
}

class Game {
    playerBoard: Cell[][];
    computerBoard: Cell[][];
    currentTurn: "playerTurn" | "computerTurn";
    playerBoatsSunk: number = 0;
    computerBoatsSunk: number = 0;
    
    constructor() {
        this.playerBoard = Array(10).fill(null).map(() => Array(10).fill(null).map(() => ({ state: "empty" })));
        this.computerBoard = Array(10).fill(null).map(() => Array(10).fill(null).map(() => ({ state: "empty" })));
        this.currentTurn = "playerTurn";
    }
    
    
    playerTurn(row: number, col: number) {
        const cell = this.computerBoard[row][col];
        if (cell.state === "empty") {
            cell.state = "miss";
            this.currentTurn = "computerTurn";
        } else if (cell.state === "ship") {
            cell.state = "hit";
            cell.ship?.addHit();
            if (cell.ship?.state === "sunk") {
                this.computerBoatsSunk++;
                this.checkWinner();
            }
            this.currentTurn = "computerTurn";
        } 
    }
    

    computerTurn() {
        let row: number;
        let col: number;
        let cell: Cell;
    
        // Añade estas líneas para controlar el número de intentos
        let attempts = 0;
        const maxAttempts = 1000;
    
        do {
            // Si superas el número máximo de intentos, lanza un error
            if (attempts++ > maxAttempts) throw new Error("Too many attempts to find a cell");
    
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
            cell = this.playerBoard[row][col];
        } while (cell.state === "hit" || cell.state === "miss");
        
        if (cell.state === "empty") {
            cell.state = "miss";
            this.currentTurn = "playerTurn";
        } else if (cell.state === "ship") {
            cell.state = "hit";
            cell.ship?.addHit();
            if (cell.ship?.state === "sunk") {
                this.playerBoatsSunk++;
                this.checkWinner();
            }
            this.currentTurn = "playerTurn";
        }
    }


    checkWinner() {
        if (this.playerBoatsSunk === 5) {
            console.log("Computer Wins!");
            // Puedes agregar aquí cualquier otra lógica que necesites cuando el computador gane.
        } else if (this.computerBoatsSunk === 5) {
            console.log("Player Wins!");
            // Puedes agregar aquí cualquier otra lógica que necesites cuando el jugador gane.
        }
    }
    
    
}

export { Game };

// TEST GAME 1