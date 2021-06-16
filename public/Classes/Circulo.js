class Circulo{
    constructor(x,y,r){ 
        this.x = x;
        this.y = y;
        this.r = r;
    }

    // Checa se o ponto está contido dentro de seus limites (fronteiras)
    contemPonto(ponto){
        let xPonto = ponto.posicao.x;
        let yPonto = ponto.posicao.y;

        return(
            Math.sqrt(Math.pow(xPonto - this.x, 2) + Math.pow(yPonto - this.y, 2)) <= this.r // Se a distância do ponto até o círculo for menor ou igual ao raio
        );
    }

    // Método para saber se os retângulos se interseptam
    intersepta(alcance){
        return !( // Se essa expressão for verdade, eles NÃO se interceptam
            alcance.x - alcance.w > this.x + this.w ||
            alcance.x + alcance.w < this.x - this.w ||
            alcance.y - alcance.h > this.y + this.h ||
            alcance.y + alcance.h < this.y - this.h
        );
    }
}