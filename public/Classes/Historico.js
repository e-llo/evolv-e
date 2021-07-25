class Historico {
    constructor() {
        this.herbivoros = new Genes();
        this.carnivoros = new Genes();
        this.segundos = [];
    }

    clear() {
        this.herbivoros.clear();
        this.carnivoros.clear();
        this.segundos.length = 0;
    }
}