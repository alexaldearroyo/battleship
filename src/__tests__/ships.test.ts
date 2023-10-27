import {
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
} from '../scripts/ships';

describe('Ship class and instances', () => {

    it('should create an instance of Ship class', () => {
        const newShip = new Ship(4, 'horizontal', 'playerShip');
        expect(newShip).toBeInstanceOf(Ship);
    });

    it('should create player ships with correct properties', () => {
        expect(CarrierPlayer.length).toBe(5);
        expect(CarrierPlayer.owner).toBe('playerShip');

        expect(BattleshipPlayer.length).toBe(4);
        expect(BattleshipPlayer.owner).toBe('playerShip');

        expect(DestructorPlayer.length).toBe(3);
        expect(DestructorPlayer.owner).toBe('playerShip');

        expect(SubmarinePlayer.length).toBe(3);
        expect(SubmarinePlayer.owner).toBe('playerShip');

        expect(PatrolPlayer.length).toBe(2);
        expect(PatrolPlayer.owner).toBe('playerShip');
    });

    it('should create computer ships with correct properties', () => {
        expect(CarrierComputer.length).toBe(5);
        expect(CarrierComputer.owner).toBe('computerShip');

        expect(BattleshipComputer.length).toBe(4);
        expect(BattleshipComputer.owner).toBe('computerShip');

        expect(DestructorComputer.length).toBe(3);
        expect(DestructorComputer.owner).toBe('computerShip');

        expect(SubmarineComputer.length).toBe(3);
        expect(SubmarineComputer.owner).toBe('computerShip');

        expect(PatrolComputer.length).toBe(2);
        expect(PatrolComputer.owner).toBe('computerShip');
    });

});
