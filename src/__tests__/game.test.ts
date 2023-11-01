import { Game } from "../scripts/game";
import { createEmptyBoard, Board, Cell } from "../scripts/boards";
import { Ship, Axis, Owner } from "../scripts/ships"; // Asegúrate de importar Axis y Owner también

describe("Game", () => {
  let game: Game;
  let playerBoard: Board;
  let computerBoard: Board;
  let ship: Ship;

  beforeEach(() => {
    playerBoard = createEmptyBoard(10);
    computerBoard = createEmptyBoard(10);
    ship = new Ship(3, "horizontal", "playerShip");
    // Colocar las partes del barco en diferentes celdas
    for (let i = 0; i < ship.length; i++) {
      computerBoard[0][i] = {
        ...computerBoard[0][i],
        state: "ship",
        ship: ship,
      };
    }

    game = new Game(playerBoard, computerBoard);
  });

  describe("constructor", () => {
    it("should initialize player and computer boards", () => {
      expect(game.playerBoard).toEqual(playerBoard);
      expect(game.computerBoard).toEqual(computerBoard);
    });

    it("should start with player turn", () => {
      expect(game.currentTurn).toEqual("playerTurn");
    });
  });

  describe("playerTurn", () => {
    it("should mark an empty cell as miss and change turn to computer", () => {
      game.playerTurn(1, 1);
      expect(computerBoard[1][1].state).toEqual("miss");
      expect(game.currentTurn).toEqual("computerTurn");
    });

    it("should mark a ship cell as hit and change turn to computer", () => {
      game.playerTurn(0, 0);
      expect(computerBoard[0][0].state).toEqual("hit");
      expect(game.currentTurn).toEqual("computerTurn");
    });

    it('should increment computerBoatsSunk when a ship is sunk', () => {
      game.playerTurn(0, 0); // Golpear la primera parte del barco
      game.playerTurn(0, 1); // Golpear la segunda parte del barco
      game.playerTurn(0, 2); // Golpear la tercera parte del barco, hundiendo el barco
      expect(game.computerBoatsSunk).toEqual(1);
  });
  });

  describe("computerTurn", () => {
    // Mocking Math.random to control the randomness
    const originalMath = global.Math;
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.5; // Always return 0.5, which corresponds to row 5, col 5
    global.Math = mockMath;

    afterAll(() => {
      global.Math = originalMath; // Restore original Math object after all tests
    });

    beforeEach(() => {
      // Asumimos que 'ship' ha sido definido anteriormente como hicimos en los bloques beforeEach
      // Asignar un barco a la celda [5][5] en el tablero del jugador
      playerBoard[5][5] = {
        x: 5,
        y: 5,
        state: "ship",
        ship: ship,
      };
    });

    it("should mark a ship cell as hit and change turn to player", () => {
      game.computerTurn();
      expect(playerBoard[5][5].state).toEqual("hit");
      expect(game.currentTurn).toEqual("playerTurn");
    });

    it("should increment playerBoatsSunk when a ship is sunk", () => {
      game.computerTurn(5, 5); // Golpear la primera parte del barco
      game.computerTurn(5, 6); // Golpear la segunda parte del barco
      game.computerTurn(5, 7); // Golpear la tercera parte del barco, hundiendo el barco
      expect(game.playerBoatsSunk).toEqual(1);
    });

    it("should mark an empty cell as miss and change turn to player", () => {
      game.computerTurn();
      expect(playerBoard[5][5].state).toEqual("miss");
      expect(game.currentTurn).toEqual("playerTurn");
    });
  });

  describe("checkWinner", () => {
    it('should log "Computer Wins!" when player boats sunk reaches 5', () => {
      const consoleSpy = jest.spyOn(console, "log");
      game.playerBoatsSunk = 5;
      game.checkWinner();
      expect(consoleSpy).toHaveBeenCalledWith("Computer Wins!");
    });

    it('should log "Player Wins!" when computer boats sunk reaches 5', () => {
      const consoleSpy = jest.spyOn(console, "log");
      game.computerBoatsSunk = 5;
      game.checkWinner();
      expect(consoleSpy).toHaveBeenCalledWith("Player Wins!");
    });
  });
});
