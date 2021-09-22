class Historico {
    constructor() {
        this.herbivoros = new Infos();
        this.carnivoros = new Infos();
        this.segundos = [];
        this.taxa_alimentos = []; // Alimentos por segundo
    }

    clear() {
        this.herbivoros.clear();
        this.carnivoros.clear();
        this.segundos.length = 0;
    }
}