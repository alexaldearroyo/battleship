import { Game } from "../scripts/game";
import { Ship } from "../scripts/ships";

describe("Game class", () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  describe("playerTurn", () => {
    it('changes cell from "empty" to "miss" and switches turn to computerTurn', () => {
      game.computerBoard[0][0].state = "empty";
      game.playerTurn(0, 0);
      expect(game.computerBoard[0][0].state).toBe("miss");
      expect(game.currentTurn).toBe("computerTurn");
    });

    it('changes cell from "ship" to "hit" and switches turn to computerTurn', () => {
      const testShip = new Ship(3, "horizontal", "computerShip");
      game.computerBoard[0][1].state = "ship";
      game.computerBoard[0][1].ship = testShip;
      game.playerTurn(0, 1);
      expect(game.computerBoard[0][1].state).toBe("hit");
      expect(game.currentTurn).toBe("computerTurn");
      expect(testShip.hits).toBe(1); // Check if ship's hits counter increased
    });

    it('ignores "hit" and "miss" cells', () => {
      game.computerBoard[0][2].state = "hit";
      game.playerTurn(0, 2);
      expect(game.computerBoard[0][2].state).not.toBe("miss");
      expect(game.currentTurn).toBe("playerTurn");

      game.computerBoard[0][3].state = "miss";
      game.playerTurn(0, 3);
      expect(game.computerBoard[0][3].state).not.toBe("hit");
      expect(game.currentTurn).toBe("playerTurn");
    });

    it("sinks the ship when hits equals ship length and prevents further hits", () => {
      const testShip = new Ship(2, "horizontal", "computerShip");
      game.computerBoard[0][4].state = "ship";
      game.computerBoard[0][4].ship = testShip;
      game.computerBoard[0][5].state = "ship";
      game.computerBoard[0][5].ship = testShip;

      game.playerTurn(0, 4);
      expect(testShip.hits).toBe(1);
      expect(testShip.state).toBe("floating");

      game.playerTurn(0, 5);
      expect(testShip.hits).toBe(2);
      expect(testShip.state).toBe("sunk");

      // Try hitting the sunk ship again
      game.playerTurn(0, 5);
      expect(testShip.hits).toBe(2); // hits should not increase
    });
  });

  describe("computerTurn", () => {
    it("sinks the ship when hits equals ship length and prevents further hits", () => {
      const testShip = new Ship(2, "horizontal", "playerShip");
      game.playerBoard[0][4].state = "ship";
      game.playerBoard[0][4].ship = testShip;
      game.playerBoard[0][5].state = "ship";
      game.playerBoard[0][5].ship = testShip;

      // Debugging Test 1: Confirm cells [0][4] and [0][5] contain a ship
      expect(game.playerBoard[0][4].state).toBe("ship");
      expect(game.playerBoard[0][5].state).toBe("ship");

      const randomValues = [0.0, 0.45, 0.0, 0.55];
      let randomIndex = 0;

      jest.spyOn(Math, "random").mockImplementation(() => {
        return randomValues[randomIndex++ % randomValues.length];
      });

      const addHitSpy = jest.spyOn(testShip, "addHit");
      game.computerTurn();
      expect(testShip.hits).toBe(1);
      expect(testShip.state).toBe("floating");
      game.computerTurn();
      expect(testShip.hits).toBe(2);
      expect(testShip.state).toBe("sunk");
      game.playerTurn(0, 5);
      expect(game.playerBoatsSunk).toBe(1);

      jest.restoreAllMocks();

      game.computerTurn();
      expect(testShip.hits).toBe(2);
      expect(addHitSpy).toHaveBeenCalledTimes(2);
    });
 
  });
  describe("checkWinner", () => {
    it("declares computer as winner when playerBoatsSunk == 5", () => {
      game.playerBoatsSunk = 5;
      const consoleSpy = jest.spyOn(console, "log");
      game.checkWinner();
      expect(consoleSpy).toHaveBeenCalledWith("Computer Wins!");
      consoleSpy.mockRestore();
    });

    it("declares player as winner when computerBoatsSunk == 5", () => {
      game.computerBoatsSunk = 5;
      const consoleSpy = jest.spyOn(console, "log");
      game.checkWinner();
      expect(consoleSpy).toHaveBeenCalledWith("Player Wins!");
      consoleSpy.mockRestore();
    });
  });
});

// TEST GAME
