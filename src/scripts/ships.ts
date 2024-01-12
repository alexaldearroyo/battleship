export type Axis = 'horizontal' | 'vertical';
export type Owner = 'playerShip' | 'computerShip';

class Ship {
    length: number;
    axis: Axis;
    owner: Owner;
    hits: number;
    state: "floating" | "sunk";

    constructor(length: number, axis: Axis, owner: Owner) {
        this.length = length;
        this.axis = axis;
        this.owner = owner;
        this.hits = 0;
        this.state = "floating";
    }

    addHit(): void {
        if (this.state === "sunk") {
            console.log("The ship is already sunk, hits are not incremented");
            return;
        }
        
        console.log(`Initial state of the ship: ${this.state}`);
        this.hits += 1;
        console.log(`Current hits: ${this.hits}, Ship length: ${this.length}`);
        
        if (this.hits === this.length) {
            console.log("Ship sunk");
            this.state = "sunk";
        }
        console.log(`Final state of the ship: ${this.state}`);
    }
    
    
}

// Create 5 basic instances of Ship
const CarrierPlayer = new Ship(5, 'horizontal', 'playerShip');
const BattleshipPlayer = new Ship(4, 'horizontal', 'playerShip');
const DestructorPlayer = new Ship(3, 'horizontal', 'playerShip');
const SubmarinePlayer = new Ship(3, 'horizontal', 'playerShip');
const PatrolPlayer = new Ship(2, 'horizontal', 'playerShip');

const CarrierComputer = new Ship(5, 'horizontal', 'computerShip');
const BattleshipComputer = new Ship(4, 'horizontal', 'computerShip');
const DestructorComputer = new Ship(3, 'horizontal', 'computerShip');
const SubmarineComputer = new Ship(3, 'horizontal', 'computerShip');
const PatrolComputer = new Ship(2, 'horizontal', 'computerShip');

export {
    Ship,
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
};
