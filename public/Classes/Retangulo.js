class Retangulo{
    constructor(x,y,w,h){ // o w e o h são a distância do CENTRO até a borda do retângulo!
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    // Checa se o ponto está contido dentro de seus limites (fronteiras)
    contemPonto(ponto){
        return(
            ponto.x >= this.x - this.w &&
            ponto.x <= this.x + this.w &&
            ponto.y >= this.y - this.h &&
            ponto.y <= this.y + this.h
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