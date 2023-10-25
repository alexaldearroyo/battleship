export default class Gameboard {
    constructor() {
        this.ships = [];
        this.missedAttacks = [];
    }

    placeShip(ship, x, y) {
        ship.coordinates = { x, y };
        this.ships.push(ship);
    }

    receiveAttack(x, y) {
        let hit = false;
        this.ships.forEach(ship => {
            if (ship.coordinates.x === x && ship.coordinates.y === y) {
                ship.hit();
                hit = true;
            }
        });
        if (!hit) {
            this.missedAttacks.push({ x, y });
        }
    }

    allShipsSunk() {
        return this.ships.every(ship => ship.isSunk());
    }
}
