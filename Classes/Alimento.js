export class Alimento{
    constructor(x, y, raio){
        this.x = x;
        this.y = y;
        this.raio = raio;
        // a energia do pedaço de alimento é proporcinal à sua área
        this.qtd_energia = Math.floor(Math.PI * Math.pow(raio, 2))
    }
}