class Alimento{
    static alimentos = [];
    static id = 0;

    constructor(x, y, raio){
        this.posicao = new Vetor(x, y);
        this.raio = raio;
        // a energia do pedaço de alimento é proporcinal à sua área
        this.energia_alimento = Math.floor(Math.PI * Math.pow(this.raio, 2)) * 20;

        Alimento.alimentos.push(this);

        // ID
        this.id = Alimento.id++;
    }

    display(){
        c.beginPath();
        c.arc(this.posicao.x, this.posicao.y, this.raio, 0, Math.PI * 2);
        c.fillStyle = "rgb(81, 186, 81)";
        c.fill();
    }

    checaId(id){
        return (id == this.id);
    }
}