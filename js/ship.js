export default class Ship {
    constructor(length) {
        this.length = length;
        this.name = name; // Agregar el nombre del barco
        this.hits = 0;
        this.sunk = false;
        this.coordinates = null; // Agregar la propiedad coordinates
    }

    hit() {
        this.hits++;
        if (this.hits >= this.length) {
            this.sunk = true;
        }
    }

    isSunk() {
        return this.sunk;
    }
}
