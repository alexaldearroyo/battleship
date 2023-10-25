import Gameboard from '../gameboard.js';
import Ship from '../ship.js';

test('Place ship on gameboard', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(ship, 2, 3);
  expect(gameboard.ships.length).toBe(1);
  expect(gameboard.ships[0].coordinates).toEqual({ x: 2, y: 3 });
});

test('Receive attack on gameboard', () => {
  const gameboard = new Gameboard();
  gameboard.receiveAttack(4, 5);
  expect(gameboard.missedAttacks).toContainEqual({ x: 4, y: 5 });
});

test('All ships sunk on gameboard', () => {
  const gameboard = new Gameboard();
  const ship1 = new Ship(1);
  const ship2 = new Ship(1);
  gameboard.placeShip(ship1, 1, 1);
  gameboard.placeShip(ship2, 2, 2);
  gameboard.receiveAttack(1, 1);
  gameboard.receiveAttack(2, 2);
  expect(gameboard.allShipsSunk()).toBe(true);
});
