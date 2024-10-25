export default class Inventory {
    static #instance;

    constructor() {
        this.name = 'Player'
        this.diagnosticScore = 0
        this.stressScore = 0
    }

    static  getInstance() {
        if (!Inventory.#instance) {
            Inventory.#instance = new Inventory();
        }
        return Inventory.#instance;
    }
}
