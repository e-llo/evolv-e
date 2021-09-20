class Historico {
    constructor() {
        this.herbivoros = new Genes();
        this.carnivoros = new Genes();
        this.segundos = [];
        this.taxa_alimentos = []; // Alimentos por segundo
    }

    clear() {
        this.herbivoros.clear();
        this.carnivoros.clear();
        this.segundos.length = 0;
    }
}