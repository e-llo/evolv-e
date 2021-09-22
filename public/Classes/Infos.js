class Infos {
    constructor(){
        this.populacao = [];
        this.velocidade = [];
        this.agilidade = [];
        this.raio = [];
        this.deteccao = [];
        this.energia = [];
        this.gasto = [];
    }

    clear() {
        this.populacao.length = 0
        this.velocidade.length = 0
        this.agilidade.length = 0
        this.raio.length = 0
        this.deteccao.length = 0
        this.energia.length = 0
        this.gasto.length = 0
    }
}