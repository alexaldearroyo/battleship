import Ship from './ship'; 

export function renderBoard(humanGameboard, computerGameboard) {
    const humanGrid = document.querySelector("#human-board .grid");
    const computerGrid = document.querySelector("#computer-board .grid");
    
    // Asumiendo un tablero de 10x10
    const size = 10;

    // Limpiar cualquier contenido previo
    humanGrid.innerHTML = '';
    computerGrid.innerHTML = '';

    // Crear celdas para el humano
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = i;
            cell.dataset.y = j;
            humanGrid.appendChild(cell);
        }
    }

    // Crear celdas para la computadora
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = i;
            cell.dataset.y = j;
            computerGrid.appendChild(cell);
        }
    }
}


export function placeShipsForHuman(player, gameboard) {
    const humanGrid = document.querySelector("#human-board .grid");
    const ships = [
        new Ship(5, "carrier"),
        new Ship(4, "battleship"),
        new Ship(3, "cruiser"),
        new Ship(3, "submarine"),
        new Ship(2, "boat")
    ];
    
    let currentShipIndex = 0;

    humanGrid.addEventListener("mouseover", function(event) {
        if (event.target.classList.contains("cell")) {
            const x = parseInt(event.target.dataset.x);
            const y = parseInt(event.target.dataset.y);
            const ship = ships[currentShipIndex];

            // Elimina la clase cell-preview de todas las celdas
            document.querySelectorAll(".cell-preview").forEach(cell => cell.classList.remove("cell-preview"));

            // Verifica si el barco puede ser colocado en la posición actual
            if (gameboard.isValidPosition(ship, x, y)) {
                for (let i = 0; i < ship.length; i++) {
                    const cell = humanGrid.querySelector(`[data-x="${x + i}"][data-y="${y}"]`);
                    if (cell) {
                        cell.classList.add("cell-preview");
                    }
                }
            }
        }
    });

    humanGrid.addEventListener("mouseout", function(event) {
        if (event.target.classList.contains("cell")) {
            // Elimina la clase cell-preview de todas las celdas cuando el ratón sale de una celda
            document.querySelectorAll(".cell-preview").forEach(cell => cell.classList.remove("cell-preview"));
        }
    });

    humanGrid.addEventListener("click", function(event) {
        if (event.target.classList.contains("cell")) {
            const x = parseInt(event.target.dataset.x);
            const y = parseInt(event.target.dataset.y);
            const ship = ships[currentShipIndex];

            try {
                gameboard.placeShip(ship, x, y);
                currentShipIndex++; // Mueve al siguiente barco
                // Actualizar el tablero visualmente para mostrar el barco colocado
            } catch (error) {
                alert(error.message); // Muestra un mensaje si la posición no es válida
            }

            if (currentShipIndex >= ships.length) {
                // Todos los barcos han sido colocados
                // Aquí puedes agregar lógica adicional si es necesario, como iniciar el juego
            }
        }
    });
}


export function placeShipsForComputer(player, gameboard) {
    const ships = [/* lista de barcos */];

    ships.forEach(ship => {
        let x, y, isHorizontal;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            isHorizontal = Math.random() < 0.5;
        } while (!gameboard.isValidPosition(ship, x, y, isHorizontal));
        gameboard.placeShip(ship, x, y, isHorizontal);
    });
}

