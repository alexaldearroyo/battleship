// __tests__/place.test.ts

import {
    playerBoard,
    computerBoard
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
  
  import { playerPlacement, computerPlacement } from '../scripts/place';
  
  describe('Placement Module', () => {
  
    beforeEach(() => {
      // Reset boards before each test
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          playerBoard[x][y].status = "empty";
          computerBoard[x][y].status = "empty";
        }
      }
    });
  
    test('playerPlacement places ships on playerBoard', () => {
      playerPlacement();
      
      const playerShips = [CarrierPlayer, BattleshipPlayer, DestructorPlayer, SubmarinePlayer, PatrolPlayer];
      for (const ship of playerShips) {
        expect(playerBoard.flat().filter(cell => cell.status === 'ship').length).toBeGreaterThanOrEqual(ship.length);
      }
    });
  
    test('computerPlacement places ships on computerBoard', () => {
      computerPlacement();
      
      const computerShips = [CarrierComputer, BattleshipComputer, DestructorComputer, SubmarineComputer, PatrolComputer];
      for (const ship of computerShips) {
        expect(computerBoard.flat().filter(cell => cell.status === 'ship').length).toBeGreaterThanOrEqual(ship.length);
      }
    });
  
    test('Ships occupy the correct number of cells', () => {
      playerPlacement();
      computerPlacement();
  
      expect(playerBoard.flat().filter(cell => cell.status === 'ship').length).toBe(5 + 4 + 3 + 3 + 2);
      expect(computerBoard.flat().filter(cell => cell.status === 'ship').length).toBe(5 + 4 + 3 + 3 + 2);
    });
  
    test('No ships are adjacent in playerBoard', () => {
      playerPlacement();
  
      let adjacentShips = false;
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          if (playerBoard[x][y].status === 'ship') {
            const directions = [
              [-1, 0], [1, 0], [0, -1], [0, 1]
            ];
            for (const [dx, dy] of directions) {
              const newX = x + dx;
              const newY = y + dy;
              if (newX >= 0 && newY >= 0 && newX < 10 && newY < 10 && playerBoard[newX][newY].status === 'ship') {
                adjacentShips = true;
                break;
              }
            }
          }
          if (adjacentShips) break;
        }
        if (adjacentShips) break;
      }
  
      expect(adjacentShips).toBeFalsy();
    });
  
    test('No ships are adjacent in computerBoard', () => {
      computerPlacement();
  
      let adjacentShips = false;
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          if (computerBoard[x][y].status === 'ship') {
            const directions = [
              [-1, 0], [1, 0], [0, -1], [0, 1]
            ];
            for (const [dx, dy] of directions) {
              const newX = x + dx;
              const newY = y + dy;
              if (newX >= 0 && newY >= 0 && newX < 10 && newY < 10 && computerBoard[newX][newY].status === 'ship') {
                adjacentShips = true;
                break;
              }
            }
          }
          if (adjacentShips) break;
        }
        if (adjacentShips) break;
      }
  
      expect(adjacentShips).toBeFalsy();
    });
  });
  