class QuadTree{
    constructor(limite, capacidade){
        this.limite = limite; // Atributo do tipo Retângulo
        this.capacidade = capacidade; // A partir de quantos pontos (neste caso, seres vivos) o retângulo se subdivide
        this.pontos = [];
        this.alimentos = [];
        this.herbivoros = [];
        this.carnivoros = [];
        // this.seresVivos = this.alimentos.concat(this.herbivoros, this.carnivoros); // Array contendo todos os alimentos, herbívoros e carnívoros dentro de sua raiz
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

    inserirAlimento(alimento){
        if(!this.limite.contemPonto(alimento)){ // Checa se o alimento está contido dentro dos limites (fronteiras) do retângulo raiz
            return false;
        }

        if(this.alimentos.length < this.capacidade){ // Se ainda couber alimentos dentro dela
            this.alimentos.push(alimento); // Insere o alimento em sua lista
            // console.log("alimentos ", this.alimentos);
            return true;
        } else{ // Se a capacidade máxima de seres vivos tiver sido atingida            
            if(!this.dividida){ // A QuadTree não irá se subdividir caso já o tenha feito
                // console.log("inserirAlimentos", this.alimentos);
                this.subdivide();
                // console.log("SUBDIVIDIU - A", this.capacidade);
            }

            // Não checamos a localização do alimento pois ela será checada no começo de cada chamada desses métodos
            if(this.nordeste.inserirAlimento(alimento)){
                return true;
            } else if(this.noroeste.inserirAlimento(alimento)){
                return true;
            } else if(this.sudeste.inserirAlimento(alimento)){
                return true;
            } else if(this.sudoeste.inserirAlimento(alimento)){
                return true;
            };            
        }
    }

    inserirHerbivoro(herbivoro){
        if(!this.limite.contemPonto(herbivoro)){ // Checa se o herbivoro está contido dentro dos limites (fronteiras) do retângulo raiz
            return false;
        }

        if(this.herbivoros.length < this.capacidade){ // Se ainda couber herbivoros dentro dela
            this.herbivoros.push(herbivoro); // Insere o herbivoro em sua lista
            return true;
        } else{ // Se a capacidade máxima de seres vivos tiver sido atingida
            if(!this.dividida){ // A QuadTree não irá se subdividir caso já o tenha feito
                this.subdivide();
            }

            // Não checamos a localização do herbivoro pois ela será checada no começo de cada chamada desses métodos
            if(this.nordeste.inserirHerbivoro(herbivoro)){
                return true;
            } else if(this.noroeste.inserirHerbivoro(herbivoro)){
                return true;
            } else if(this.sudeste.inserirHerbivoro(herbivoro)){
                return true;
            } else if(this.sudoeste.inserirHerbivoro(herbivoro)){
                return true;
            };            
        }
    }

    inserirCarnivoro(carnivoro){
        if(!this.limite.contemPonto(carnivoro)){ // Checa se o carnivoro está contido dentro dos limites (fronteiras) do retângulo raiz
            return false;
        }
        
        if(this.carnivoros.length < this.capacidade){ // Se ainda couber carnivoros dentro dela
            // console.log("DANDO PUSH");
            this.carnivoros.push(carnivoro); // Insere o carnivoro em sua lista
            // console.log("carnivoros ", this.carnivoros);
            return true;
        } else{ // Se a capacidade máxima de seres vivos tiver sido atingida    
            if(!this.dividida){ // A QuadTree não irá se subdividir caso já o tenha feito
                // console.log("inserirCarnivoros", this.carnivoros);
                this.subdivide();
                // console.log("SUBDIVIDIU - C", this.capacidade);
            }
            
            // Não checamos a localização do carnivoro pois ela será checada no começo de cada chamada desses métodos
            if(this.nordeste.inserirCarnivoro(carnivoro)){
                return true;
            } else if(this.noroeste.inserirCarnivoro(carnivoro)){
                return true;
            } else if(this.sudeste.inserirCarnivoro(carnivoro)){
                return true;
            } else if(this.sudoeste.inserirCarnivoro(carnivoro)){
                return true;
            };            
        }
    }

    procuraPontos(alcance, encontrados){ // alcance é do tipo Retangulo
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
                this.noroeste.procuraPontos(alcance, encontrados); 
                this.nordeste.procuraPontos(alcance, encontrados); 
                this.sudoeste.procuraPontos(alcance, encontrados); 
                this.sudeste.procuraPontos(alcance, encontrados);
            }

            return encontrados;
        }
    }

    procuraAlimentos(circulo, encontrados){
        if(!encontrados){
            encontrados = [];
        }
        if(!this.limite.interseptaC(circulo)){ // Se NÃO se interceptam, não executa o código
            return encontrados;
        } else{ // Se eles se interceptam
            for(let a of this.alimentos){ // Para os alimentos dessa QuadTree
                if(circulo.contemPonto(a)){ // Se o alimento pertencer ao círculo
                    encontrados.push(a);
                }
            }

            if(this.dividida){ // Se a QuadTree tiver QuadTrees filhas
                this.noroeste.procuraAlimentos(circulo, encontrados); 
                this.nordeste.procuraAlimentos(circulo, encontrados); 
                this.sudoeste.procuraAlimentos(circulo, encontrados); 
                this.sudeste.procuraAlimentos(circulo, encontrados);
            }

            return encontrados;
        }
    }

    procuraHerbivoros(circulo, encontrados){
        if(!encontrados){
            encontrados = [];
        }
        if(!this.limite.interseptaC(circulo)){ // Se NÃO se interceptam, não executa o código
            return encontrados;
        } else{ // Se eles se interceptam
            for(let h of this.herbivoros){ // Para os herbivoros dessa QuadTree
                if(circulo.contemPonto(h)){ // Se o herbivoro pertencer ao círculo
                    encontrados.push(h);
                }
            }

            if(this.dividida){ // Se a QuadTree tiver QuadTrees filhas
                this.noroeste.procuraHerbivoros(circulo, encontrados); 
                this.nordeste.procuraHerbivoros(circulo, encontrados); 
                this.sudoeste.procuraHerbivoros(circulo, encontrados); 
                this.sudeste.procuraHerbivoros(circulo, encontrados);
            }

            return encontrados;
        }
    }

    procuraCarnivoros(circulo, encontrados){
        if(!encontrados){
            encontrados = [];
        }
        if(!this.limite.interseptaC(circulo)){ // Se NÃO se interceptam, não executa o código
            return encontrados;
        } else{ // Se eles se interceptam
            // console.log("procuraCarnivoros", this.carnivoros);
            for(let c of this.carnivoros){ // Para os carnivoros dessa QuadTree 
                if(circulo.contemPonto(c)){ // Se o carnivoro pertencer ao círculo
                    encontrados.push(c);
                }
            }

            if(this.dividida){ // Se a QuadTree tiver QuadTrees filhas
                this.noroeste.procuraCarnivoros(circulo, encontrados); 
                this.nordeste.procuraCarnivoros(circulo, encontrados); 
                this.sudoeste.procuraCarnivoros(circulo, encontrados); 
                this.sudeste.procuraCarnivoros(circulo, encontrados);
            }

            return encontrados;
        }
    }

    desenha(){
        // c.lineWidth = 1;
        c.beginPath();
        c.rect(this.limite.x - this.limite.w, this.limite.y - this.limite.h, this.limite.w*2, this.limite.h*2);
        c.stroke();
        if(this.dividida){
            this.nordeste.desenha();
            this.noroeste.desenha();
            this.sudeste.desenha();
            this.sudoeste.desenha();
        }
        // for(let a of this.alimentos){
        //     c.beginPath();
        //     c.arc(a.posicao.x, a.posicao.y, 1, 0, 2 * Math.PI);
        //     c.stroke();
        // }
        // for(let h of this.herbivoros){
        //     c.beginPath();
        //     c.arc(h.posicao.x, h.posicao.y, 1, 0, 2 * Math.PI);
        //     c.stroke();
        // }
        // for(let ca of this.carnivoros){
        //     c.beginPath();
        //     c.arc(ca.posicao.x, ca.posicao.y, 1, 0, 2 * Math.PI);
        //     c.stroke();
        // }
    }

    
}