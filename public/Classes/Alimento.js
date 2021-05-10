class Alimento{
    static alimentos = [];

    constructor(x, y, raio){
        this.posicao = new Vetor(x, y);
        this.raio = raio;
        // a energia do pedaço de alimento é proporcinal à sua área
        this.energia_alimento = Math.floor(Math.PI * Math.pow(this.raio, 2));

        Alimento.alimentos.push(this);
    }

    display(){
        c.beginPath();
        c.arc(this.posicao.x, this.posicao.y, this.raio, 0, Math.PI * 2);
        c.fillStyle = 'green';
        c.fill();
    }
}