import { Game } from "../scripts/game";
import { Ship, Axis, Owner, BattleshipComputer } from "../scripts/ships";
import { Cell } from "../scripts/boards";

// Definir un objeto global.location simulado
const mockLocation = {
  reload: jest.fn()
};

Object.defineProperty(global, 'location', {
  value: mockLocation,
  writable: true
});

// Mocks para las funciones que no están definidas
global.alert = jest.fn();

describe("Game", () => {
  let playerBoard: Cell[][];
  let computerBoard: Cell[][];
  let game: Game;

  // Configuración inicial para cada prueba
  beforeEach(() => {
    playerBoard = createEmptyBoard();
    computerBoard = createEmptyBoard();
    placeShips(playerBoard);
    placeShips(computerBoard);
    game = new Game(playerBoard, computerBoard);
  });

  // Prueba para verificar la inicialización correcta del juego
  test("should initialize game correctly", () => {
    expect(game.playerBoard).toEqual(playerBoard);
    expect(game.computerBoard).toEqual(computerBoard);
    expect(game.currentTurn).toEqual("playerTurn");
    expect(game.playerBoatsSunk).toBe(0);
    expect(game.computerBoatsSunk).toBe(0);
  });

  // Prueba para un turno del jugador que resulta en un fallo
  test("player turn - miss", () => {
    // Asegúrate de que la celda seleccionada esté vacía
    const row = 0;
    const col = 0;
    game.playerBoard[row][col].state = "empty";

    game.playerTurn(row, col);
    expect(game.computerBoard[row][col].state).toEqual("miss");
    expect(game.currentTurn).toEqual("computerTurn");
  });
  // Prueba para un turno del jugador que resulta en un acierto
  test("player turn - hit", () => {
    // Asegúrate de que la celda seleccionada tenga un barco
    const row = 0;
    const col = 0;
    const length = 3; // Ejemplo, longitud del barco
    const direction = "horizontal"; // Ejemplo, dirección del barco
    const owner: Owner = "computerShip"; // 'playerShip' o 'computerShip'
    const ship = new Ship(length, direction, owner);

    const cell: Cell = {
      x: row,
      y: col,
      state: "ship",
      ship: ship,
    };

    game.computerBoard[row][col] = cell;

    game.playerTurn(row, col);
    expect(game.computerBoard[row][col].state).toEqual("hit");
    expect(ship.hits).toBe(1);
    expect(game.currentTurn).toEqual("computerTurn");
  });
  // Prueba para un turno del jugador que resulta en hundir un barco
  test("player turn - sink", () => {
    // Asegúrate de que la celda seleccionada tenga un barco con 1 golpe restante
    const row = 0;
    const col = 0;
    const ship = BattleshipComputer; // Usamos la instancia predefinida para la prueba
    ship.hits = ship.length - 1; // Ajustamos para que tenga 1 golpe restante

    // Crea un objeto literal que cumpla con la interfaz Cell
    const cell: Cell = {
      x: row,
      y: col,
      state: "ship",
      ship: ship,
    };

    game.computerBoard[row][col] = cell;

    game.playerTurn(row, col);
    expect(game.computerBoard[row][col].state).toEqual("hit");
    expect(ship.state).toEqual("sunk");
    expect(game.computerBoatsSunk).toBe(1);
    expect(game.currentTurn).toEqual("computerTurn");
  });

  // Similarmente, deberías escribir pruebas para computerTurn y checkWinner.
  // ...

  // Prueba para finalizar el juego
  test("end game", () => {
    game.endGame("player");
    expect(global.alert).toHaveBeenCalledWith("Player Wins!");
    expect(global.location.reload).toHaveBeenCalled();
  });

// Funciones auxiliares para configurar el tablero y colocar barcos
function createEmptyBoard(): Cell[][] {
  // Crea un tablero vacío
  const size = 10; // Asumiendo un tablero de 10x10
  const board: Cell[][] = [];

  for (let x = 0; x < size; x++) {
      board[x] = [];
      for (let y = 0; y < size; y++) {
          // Crea un objeto literal que cumpla con la interfaz Cell
          const cell: Cell = {
              x: x,
              y: y,
              state: 'empty',
              ship: undefined
          };
          board[x][y] = cell;
      }
  }

  return board;
}


function placeShips(board: Cell[][]): void {
  // Lista de barcos predefinidos para colocar en el tablero
  const ships = [
    { length: 5, axis: 'horizontal' as Axis, owner: 'playerShip' as Owner },
    { length: 4, axis: 'vertical' as Axis, owner: 'playerShip' as Owner },
  // ... otros barcos
  ];

  ships.forEach(ship => {
      let placed = false;

      while (!placed) {
          // Elige una posición aleatoria en el tablero
          const startX = Math.floor(Math.random() * board.length);
          const startY = Math.floor(Math.random() * board.length);

          // Verifica si el barco cabe en la posición seleccionada y si no se superpone con otros barcos
          let canPlace = true;

          for (let i = 0; i < ship.length; i++) {
              const x = ship.axis === 'horizontal' ? startX + i : startX;
              const y = ship.axis === 'vertical' ? startY + i : startY;

              if (x >= board.length || y >= board.length || board[x][y].state === 'ship') {
                  canPlace = false;
                  break;
              }
          }

          // Si el barco cabe, colócalo en el tablero
          if (canPlace) {
              for (let i = 0; i < ship.length; i++) {
                  const x = ship.axis === 'horizontal' ? startX + i : startX;
                  const y = ship.axis === 'vertical' ? startY + i : startY;

                  const newShip = new Ship(ship.length, ship.axis, ship.owner);
                  board[x][y] = { x: x, y: y, state: 'ship', ship: newShip };
              }

              placed = true;
          }
      }
  });
}

});
