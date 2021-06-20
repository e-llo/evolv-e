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
            ponto.posicao.x >= this.x - this.w &&
            ponto.posicao.x <= this.x + this.w &&
            ponto.posicao.y >= this.y - this.h &&
            ponto.posicao.y <= this.y + this.h
        );
    }


    // Método para saber se os retângulos se interseptam
    interseptaR(alcance){
        return !( // Se essa expressão for verdade, eles NÃO se interceptam
            alcance.x - alcance.w > this.x + this.w ||
            alcance.x + alcance.w < this.x - this.w ||
            alcance.y - alcance.h > this.y + this.h ||
            alcance.y + alcance.h < this.y - this.h
        );
    }

    // Método para saber se o retângulo intersepta um círculo
    interseptaC(circulo){
        // temporary variables to set edges for testing
        let testX = circulo.x;
        let testY = circulo.y;

        // which edge is closest?
        if (circulo.x < this.x - this.w){
            testX = this.x - this.w;
        } else if (circulo.x > this.x + this.w){
            testX = this.x + this.w; 
        }

        if (circulo.y < this.y - this.h){
            testY = this.y - this.h;
        } else if (circulo.y > this.y + this.h){
            testY = this.y + this.h;
        }

        // get distance from closest edges
        let distX = circulo.x - testX;
        let distY = circulo.y - testY;
        let distance = Math.sqrt((distX*distX) + (distY*distY));

        // if the distance is less than the radius, collision!
        if (distance <= circulo.r) {
            return true;
        }
        return false;
        // return !( // Se essa expressão for verdade, eles NÃO se interceptam
        //     ( // O centro do círculo se encontra fora do retângulo
        //         circulo.x  > this.x + this.w ||
        //         circulo.x < this.x - this.w ||
        //         circulo.y > this.y + this.h ||
        //         circulo.y < this.y - this.h
        //     ) && ( 
        //         // Nenhum dos vértices do retângulo se encontra dentro do círculo
        //         // Vértice noroeste
        //         Math.sqrt(Math.pow((this.x - this.w) - (circulo.x), 2) + Math.pow((this.y - this.h) - (circulo.y), 2)) > circulo.r &&
        //         // Vértice nordeste
        //         Math.sqrt(Math.pow((this.x + this.w) - (circulo.x), 2) + Math.pow((this.y - this.h) - (circulo.y), 2)) > circulo.r &&
        //         // Vértice sudeste
        //         Math.sqrt(Math.pow((this.x + this.w) - (circulo.x), 2) + Math.pow((this.y + this.h) - (circulo.y), 2)) > circulo.r &&
        //         // Vértice sudoeste
        //         Math.sqrt(Math.pow((this.x - this.w) - (circulo.x), 2) + Math.pow((this.y + this.h) - (circulo.y), 2)) > circulo.r
        //     )
        // );
    }
}