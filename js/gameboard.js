export default class Gameboard {
    constructor() {
        this.board = Array(10)
            .fill(null)
            .map(() => Array(10).fill(null)); // Crear un tablero 10x10 inicialmente vacío
        this.missedAttacks = [];
        this.ships = []; // Inicializar la propiedad ships como un array vacío
    }

    placeShip(ship, x, y, isHorizontal) {
        // Verificar que la posición sea válida
        if (!this.isValidPosition(ship, x, y, isHorizontal)) {
            throw new Error("Posición no válida para colocar el barco.");
        }
    
        // Colocar el barco en el tablero
        for (let i = 0; i < ship.length; i++) {
            if (isHorizontal) {
                this.board[x + i][y] = ship;
            } else {
                this.board[x][y + i] = ship;
            }
        }
    
        // Agregar el barco a la lista de barcos del tablero
        this.ships.push(ship);
    }

    isValidPosition(ship, x, y, isHorizontal) {
        // Verificar que el barco no se salga del tablero
        if (isHorizontal) {
            if (x + ship.length > 10) return false; // Si es horizontal, verifica el eje X
        } else {
            if (y + ship.length > 10) return false; // Si es vertical, verifica el eje Y
        }

        // Verificar que el barco no se superponga con otros barcos
        for (let i = 0; i < ship.length; i++) {
            if (isHorizontal) {
                if (this.board[x + i][y]) return false;
            } else {
                if (this.board[x][y + i]) return false;
            }
        }

        return true;
    }

    receiveAttack(x, y) {
        // Marcar la celda como atacada
        if (this.board[x][y] === null) {
            // Si no hay un barco en la celda, registra el ataque como un "miss"
            this.missedAttacks.push({ x, y });
        } else if (this.board[x][y] === "hit") {
            // Si la celda ya ha sido atacada, no hagas nada (ataque repetido)
            return;
        } else {
            // Si hay un barco en la celda, registra el ataque en el barco y marca la celda como atacada
            const ship = this.board[x][y];
            ship.hit(); // Esto marca una parte del barco como golpeada
            this.board[x][y] = "hit"; // Marcar la celda como golpeada

            // Verificar si el barco está completamente hundido
            if (ship.isSunk()) {
                // Puedes hacer algo aquí cuando un barco esté completamente hundido, si es necesario
            }
        }
    }

    allShipsSunk() {
        // Verifica si todos los barcos están hundidos
        return this.board.flat().every(cell => cell === null || cell === "hit");
    }

    isOccupied(x, y) {
        return this.board[x][y] !== null;
    }
    
}
