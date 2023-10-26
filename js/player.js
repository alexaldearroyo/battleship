export default class Player {
    constructor(name) {
        this.name = name;
        this.previousAttacks = [];
    }

    attack(gameboard, x, y) {
        if (!this.previousAttacks.some(coord => coord.x === x && coord.y === y)) {
            gameboard.receiveAttack(x, y);
            this.previousAttacks.push({ x, y });
        }
    }

    randomAttack(gameboard) {
        let x, y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (this.previousAttacks.some(coord => coord.x === x && coord.y === y));
        this.attack(gameboard, x, y);
    }

    placeShips(gameboard, ships, humanGrid) {
        let currentShipIndex = 0;
        let isHorizontal = true; // Por defecto, la orientación es horizontal
    
        // Función para verificar si la posición es válida
        function isValidPosition(ship, x, y, isHorizontal) {
            // Verificar que el barco no se salga del tablero
            if (isHorizontal) {
                if (x + ship.length > 10) return false; // Si es horizontal, verifica el eje X
            } else {
                if (y + ship.length > 10) return false; // Si es vertical, verifica el eje Y
            }
        
            // Verificar que el barco no se superponga con otros barcos
            for (let i = 0; i < ship.length; i++) {
                if (isHorizontal) {
                    if (gameboard.isOccupied(x + i, y)) return false;
                } else {
                    if (gameboard.isOccupied(x, y + i)) return false;
                }
            }
        
            return true;
        }
        
        // Puedes agregar un botón o interruptor para cambiar la orientación del barco
        const orientationButton = document.getElementById("orientationButton");
        orientationButton.addEventListener("click", function() {
            isHorizontal = !isHorizontal; // Cambia la orientación
        });
        
        // Event Listener para las celdas del tablero del jugador
        humanGrid.addEventListener("click", function(event) {
            if (event.target.classList.contains("cell") && currentShipIndex < ships.length) {
                const x = parseInt(event.target.dataset.x);
                const y = parseInt(event.target.dataset.y);
    
                if (isValidPosition(ships[currentShipIndex], x, y, isHorizontal)) {
                    gameboard.placeShip(ships[currentShipIndex], x, y, isHorizontal);
                    currentShipIndex++; // Mueve al siguiente barco
    
                    // Actualiza el tablero y la interfaz (si es necesario)
                    updateBoardUI(gameboard);
                } else {
                    alert("Posición no válida. Intenta de nuevo.");
                }
            }
        });

        function updateBoardUI(gameboard) {
            // Aquí puedes agregar el código para actualizar el tablero visualmente
            // Por ejemplo, puedes cambiar el color de las celdas donde se ha colocado un barco
        }

    }

    placeShipsRandomly(gameboard, ships) {
        ships.forEach(ship => {
            let x, y, isHorizontal;
            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
                isHorizontal = Math.random() < 0.5; // Decide aleatoriamente la orientación del barco
            } while (!this._canPlace(ship, x, y, isHorizontal, gameboard));
            gameboard.placeShip(ship, x, y, isHorizontal);
        });
    }

    _canPlace(ship, x, y, isHorizontal, gameboard) {
        // Verificar que el barco no se salga del tablero
        if (isHorizontal) {
            if (x + ship.length > 10) return false; // Si es horizontal, verifica el eje X
        } else {
            if (y + ship.length > 10) return false; // Si es vertical, verifica el eje Y
        }

        // Verificar que el barco no se superponga con otros barcos
        for (let i = 0; i < ship.length; i++) {
            if (isHorizontal) {
                if (gameboard.isOccupied(x + i, y)) return false;
            } else {
                if (gameboard.isOccupied(x, y + i)) return false;
            }
        }

        return true;
    }
}
