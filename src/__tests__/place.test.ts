import {
    playerBoard,
    computerBoard,
    Cell,
  } from '../scripts/boards';
  
  import {
    CarrierPlayer,
    BattleshipPlayer,
    DestructorPlayer,
    SubmarinePlayer,
    PatrolPlayer,
    CarrierComputer,
    BattleshipComputer,
    DestructorComputer,
    SubmarineComputer,
    PatrolComputer
  } from '../scripts/ships';
  
  import { playerPlacement, computerPlacement } from '../scripts/place'; // Reemplaza con la ubicación correcta de tu módulo de colocación

  // Función para restablecer el tablero
  function resetBoard(board: Cell[][]): void {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        board[x][y].status = 'empty';
        board[x][y].ship = undefined; // Establecer ship como undefined
      }
    }
  }
  
  
  describe('Ship Placement', () => {
    beforeEach(() => {
      // Restablecer los tableros antes de cada prueba
      resetBoard(playerBoard);
      resetBoard(computerBoard);
    });
  
    test('Player placement should place all player ships', () => {
      playerPlacement();
      
      const playerShips = [CarrierPlayer, BattleshipPlayer, DestructorPlayer, SubmarinePlayer, PatrolPlayer];
  
      for (const ship of playerShips) {
        const placedShip = playerBoard.flat().find(cell => cell.ship === ship);
        expect(placedShip).toBeDefined();
      }
    });
  
    test('Computer placement should place all computer ships', () => {
      computerPlacement();
  
      const computerShips = [CarrierComputer, BattleshipComputer, DestructorComputer, SubmarineComputer, PatrolComputer];
  
      for (const ship of computerShips) {
        const placedShip = computerBoard.flat().find(cell => cell.ship === ship);
        expect(placedShip).toBeDefined();
      }
    });
  
    test('Ships should not overlap on player board', () => {
      playerPlacement();
      const playerShips = [CarrierPlayer, BattleshipPlayer, DestructorPlayer, SubmarinePlayer, PatrolPlayer];
  
      for (let i = 0; i < playerShips.length; i++) {
        for (let j = i + 1; j < playerShips.length; j++) {
          const shipA = playerBoard.flat().find(cell => cell.ship === playerShips[i]);
          const shipB = playerBoard.flat().find(cell => cell.ship === playerShips[j]);
  
          if (shipA && shipB) {
            expect(shipA).not.toEqual(shipB);
          }
        }
      }
    });
  
    test('Ships should not overlap on computer board', () => {
      computerPlacement();
      const computerShips = [CarrierComputer, BattleshipComputer, DestructorComputer, SubmarineComputer, PatrolComputer];
  
      for (let i = 0; i < computerShips.length; i++) {
        for (let j = i + 1; j < computerShips.length; j++) {
          const shipA = computerBoard.flat().find(cell => cell.ship === computerShips[i]);
          const shipB = computerBoard.flat().find(cell => cell.ship === computerShips[j]);
  
          if (shipA && shipB) {
            expect(shipA).not.toEqual(shipB);
          }
        }
      }
    });
  });
  