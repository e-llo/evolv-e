class Alimento{
    static alimentos = [];
    static id = 0;

    constructor(x, y, raio){
        this.posicao = new Vetor(x, y);
        this.raio = raio;
        // a energia do pedaço de alimento é proporcinal à sua área
        this.energia_alimento = Math.floor(Math.PI * Math.pow(this.raio, 2)) * 20;

        Alimento.alimentos.push(this);

        // Variável para guardar a posição do organismo na lista de organismos
        this.posicao_lista = Alimento.alimentos.length - 1;

        // ID
        this.id = Alimento.id++;
    }

    update(){
        this.posicao_lista = Alimento.alimentos.find(alimento => isEqual(this, alimento));
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