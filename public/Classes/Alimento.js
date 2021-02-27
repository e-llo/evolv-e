class Alimento{
    static alimentos = [];

    constructor(x, y, raio){
        this._posicao = new Vetor(x, y);
        this._raio = raio;
        // a energia do pedaço de alimento é proporcinal à sua área
        this._energia_alimento = Math.floor(Math.PI * Math.pow(raio, 2));

        Alimento.alimentos.push(this);
    }

    display(){
        c.beginPath();
        c.arc(this._posicao.x, this._posicao.y, this._raio, 0, Math.PI * 2);
        c.fillStyle = 'green';
        c.fill();

        console.log("sou um alimento e estou sendo desenhado");
    }
}