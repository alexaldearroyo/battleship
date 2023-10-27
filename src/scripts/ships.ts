export type Axis = 'horizontal' | 'vertical';
type Owner = 'playerShip' | 'computerShip';

class Ship {
    length: number;
    axis: Axis;
    owner: Owner;

    constructor(length: number, axis: Axis, owner: Owner) {
        this.length = length;
        this.axis = axis;
        this.owner = owner;
    }
}

// Crear 5 instancias básicas de Ship
// Por defecto, estas instancias serán del jugador. Puedes cambiar el propietario según sea necesario.
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
