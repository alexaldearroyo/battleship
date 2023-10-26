export function renderBoard(humanGameboard, computerGameboard) {
    // Aquí irá el código para renderizar ambos tableros en el DOM
}

export function placeShipsForHuman(player, gameboard) {
    const humanGrid = document.querySelector("#human-board .grid");
    const ships = [
        { name: "carrier", length: 5 },
        { name: "battleship", length: 4 },
        { name: "cruiser", length: 3 },
        { name: "submarine", length: 3 },
        { name: "boat", length: 2 }
    ];
    let currentShipIndex = 0;

    humanGrid.addEventListener("mouseover", function(event) {
        if (event.target.classList.contains("cell")) {
            // Aquí puedes agregar lógica para mostrar visualmente cómo se vería el barco si se coloca en esa posición
            // Por ejemplo, cambiando el color de fondo de las celdas donde se colocaría el barco
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

