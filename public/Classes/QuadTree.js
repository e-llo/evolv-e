class QuadTree{
    constructor(limite, capacidade){
        this.limite = limite;
        this.capacidade = capacidade; // A partir de quantos pontos o retângulo se subdivide
        this.pontos = [];
        this.dividida = false;
    }
    
    // Subdivide a QuadTree em 4 retângulos filhos
    subdivide(){
        let x = this.limite.x;
        let y = this.limite.y;
        let w = this.limite.w;
        let h = this.limite.h;

        let ne = new Retangulo(x + w/2, y - h/2, w/2, h/2);
        this.nordeste = new QuadTree(ne, this.capacidade);

        let no = new Retangulo(x - w/2, y - h/2, w/2, h/2);
        this.noroeste = new QuadTree(no, this.capacidade);

        let se = new Retangulo(x + w/2, y + h/2, w/2, h/2);
        this.sudeste = new QuadTree(se, this.capacidade);

        let so = new Retangulo(x - w/2, y + h/2, w/2, h/2);
        this.sudoeste = new QuadTree(so, this.capacidade);

        this.dividida = true;
    }

    inserirPonto(ponto){

        if(!this.limite.contemPonto(ponto)){ // Checa se o ponto está contido dentro dos limites (fronteiras) do retângulo raiz
            return false;
        }

        if(this.pontos.length < this.capacidade){
            this.pontos.push(ponto);
            return true;
        } else{ // Se a capacidade máxima tiver sido atingida
            if(!this.dividida){ // A QuadTree não irá se subdividir caso já o tenha feito
                this.subdivide();
            }

            // Não checamos a localização do ponto pois ele será checado no começo de cada chamada desses métodos
            if(this.nordeste.inserirPonto(ponto)){
                return true;
            } else if(this.noroeste.inserirPonto(ponto)){
                return true;
            } else if(this.sudeste.inserirPonto(ponto)){
                return true;
            } else if(this.sudoeste.inserirPonto(ponto)){
                return true;
            };            
        }
    }

    procura(alcance, encontrados){
        if(!encontrados){
            encontrados = [];
        }
        if(!this.limite.intersepta(alcance)){ // Se NÃO se interceptam, não executa o código
            return;
        } else{ // Se eles se interceptam
            for(let p of this.pontos){ // Para os pontos dessa QuadTree
                if(alcance.contemPonto(p)){ // Se o ponto pertencer ao retângulo "alcance"
                    encontrados.push(p);
                }
            }

            if(this.dividida){ // Se a QuadTree tiver QuadTrees filhas
                this.noroeste.procura(alcance, encontrados); 
                this.nordeste.procura(alcance, encontrados); 
                this.sudoeste.procura(alcance, encontrados); 
                this.sudeste.procura(alcance, encontrados);
            }

            return encontrados;
        }
    }

    desenha(){
        // c.lineWidth = 1;
        c.rect(this.limite.x - this.limite.w, this.limite.y - this.limite.h, this.limite.w*2, this.limite.h*2);
        c.stroke();
        if(this.dividida){
            this.nordeste.desenha();
            this.noroeste.desenha();
            this.sudeste.desenha();
            this.sudoeste.desenha();
        }
        for(let p of this.pontos){
            c.beginPath();
            c.arc(p.x, p.y, 1, 0, 2 * Math.PI);
            c.stroke();
        }
    }

    
}