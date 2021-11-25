class Herbivoro extends Organismo{
    static herbivoros = [];
    static highlight = false;
    
    constructor(x, y, dna, pai = null){
        super(x, y, dna, pai);
       
        // variável para contar quando um herbívoro poderá se reproduzir
        this.contagem_pra_reproducao = 0;

        Herbivoro.herbivoros.push(this);
    }

    // Método de reprodução (com mutações)
    reproduzir(){
        this.vezes_reproduzidas++;

        var dna_filho = this._reproduzir();
        var filho = new Herbivoro(
            this.posicao.x, this.posicao.y, dna_filho, this
        );
        
        this.filhos.push(filho);

        return filho;
    }

    reproduzirSexuado(parceiro){
        this.vezes_reproduzidas++;

        var dna_filho = this.combinaDnas(parceiro);
        var filho = new Herbivoro(
            this.posicao.x, this.posicao.y, dna_filho, this
        )

        this.filhos.push(filho);

        return filho;
    }

    morre(){
        if(this.popover_id) deletePopover(this.popover_id, this.id);
        Herbivoro.herbivoros = super.remove(Herbivoro.herbivoros, this);
        Organismo.organismos = super.remove(Organismo.organismos, this)
    }
    
    buscarAlimento(qtree, visaoH){
        this.status = "buscando alimento";
        this.comendo = false;
        // Var recorde: qual a menor distância (a recorde) de um alimento até agora
        var recorde = Infinity; // Inicialmente, setaremos essa distância como sendo infinita
        var i_mais_perto = -1; // Qual o índice do alimento mais perto até agora
        
        // Insere em alimentos_proximos uma lista de alimentos que estão na sua QuadTree 
        let alimentos_proximos = qtree.procuraAlimentos(visaoH); // procuraAlimentos() retorna uma lista de alimentos

        // console.log("alimentos proximos: ", alimentos_proximos);

        for(var i = alimentos_proximos.length - 1; i >= 0 ; i--){
            // Distância d entre este organismo e o atual alimento sendo analisado na lista
            // var d = this.posicao.dist(alimentos_proximos[i].posicao);

            var d2 = Math.pow(this.posicao.x - alimentos_proximos[i].posicao.x, 2) + Math.pow(this.posicao.y - alimentos_proximos[i].posicao.y, 2);


            if (d2 <= recorde){ // Caso a distância seja menor que a distância recorde,
                recorde = d2; // recorde passa a ter o valor de d
                i_mais_perto = i; // e o atual alimento passa a ser o i_mais_perto 
            }
        }
        
        // Momento em que ele vai comer!
        if(recorde <= Math.pow(this.raio_deteccao, 2)){
            this.comendo = true;
            this.vagueando = false;
            this.status = "pegando alimento";
            
            if(recorde <= 25){ // como recorde é a distância ao quadrado, elevamos 5 ao quadrado (5^2 = 25) para comparar
                
                let indice_lista_estatica = 0;

                // Loop para achar o alimento que contenha o id do alimento mais próximo a fim de deletá-lo da lista estática com base em seu id 
                Alimento.alimentos.every(a => {
                    if(a.checaId(alimentos_proximos[i_mais_perto].id)){
                        return false;
                    }
                    indice_lista_estatica++;

                    return true;
                });

                this.comeAlimento(alimentos_proximos[i_mais_perto], indice_lista_estatica);

                ///////////////////////////////////////////////////////////////////////////////
                // this.contagem_pra_reproducao++;

                // if(this.contagem_pra_reproducao >= 3){ // se o herbívoro comer <contagem_pra_reproducao> alimentos
                //     if(Math.random() < this.chance_de_reproducao){ // chance de se reproduzir
                //         this.reproduzir();
                //     }
                //     this.contagem_pra_reproducao = 0; // reseta a variável para que possa se reproduzir outras vezes
                // }
                //////////////////////////////////////////////////////////////////////////////////////////
                
            } else if(alimentos_proximos.length != 0){
                this.persegue(alimentos_proximos[i_mais_perto]);
            }
        }
    }

    comeAlimento(alimento, i){
        this.qdade_comida++;
        // Absorção de energia ao comer alimento:
        // Se a energia do alimento for menor que o quanto falta para encher a barra de energia, 
        // o herbívoro adquire ela toda
        if(this.energia_max - this.energia >= alimento.energia_alimento * 0.1){
            this.energia += alimento.energia_alimento * 0.1;
        } else{ 
            this.energia = this.energia_max; // Limitanto a energia para não ultrapassar sua energia máxima
        }
        if(this.energia > this.energia_max){
            this.energia = this.energia_max;
        }
        Alimento.alimentos.splice(i, 1); // Retira o alimento da lista de alimentos
        this.aumentaTamanho();
    }

    // Método para detectar um predador (basicamente idêntico ao buscarAlimento())
    // O método faz o herbívoro achar o carnívoro mais próximo e, se ele estiver dentro de seu raio de detecção,
    // ele aciona o método fugir()
    detectaPredador(qtree, visaoH){
        this.fugindo = false;
        // Var recorde: qual a menor distância (a recorde) de um carnívoro até agora
        var recorde = Infinity; // Inicialmente, setaremos essa distância como sendo infinita
        var i_mais_perto = -1; // Qual o índice do carnívoro mais perto até agora

        // Insere em carnivoros_proximos uma lista de carnívoros que estão na sua QuadTree 
        let carnivoros_proximos = qtree.procuraCarnivoros(visaoH); // procuraCarnivoros() retorna uma lista de carnívoros

        // console.log("carnívoros próximos: ", qtree.procuraCarnivoros(visaoH));
        
        // Loop que analisa cada carnívoro na lista de carnívoros próximos
        for(var i = carnivoros_proximos.length - 1; i >= 0; i--){
            // Distância d entre este organismo e o atual carnívoro sendo analisado na lista (lista_predadores[i])
            // var d = this.posicao.dist(carnivoros_proximos[i].posicao);

            var d2 = Math.pow(this.posicao.x - carnivoros_proximos[i].posicao.x, 2) + Math.pow(this.posicao.y - carnivoros_proximos[i].posicao.y, 2);

            if (d2 <= recorde){ // Caso a distância seja menor que a distância recorde,
                recorde = d2; // recorde passa a ter o valor de d
                i_mais_perto = i; // e o atual carnívoro passa a ser o i_mais_perto 
            }
            
        }

        // Momento em que ele vai fugir!
        if(recorde <= Math.pow(this.raio_deteccao, 2)){
            
            if(carnivoros_proximos.length != 0){
                // Chamada do método foge(), que muda a velocidade do herbívoro para a direção oposta ao do predador
                this.foge(carnivoros_proximos[i_mais_perto]); 
            }
        }
        
    }

    // Método que atualiza a velocidade (portanto a posição) do herbívoro a fim de fazê-lo andar na direção contrária
    // à do carnívoro
    foge(alvo){
        // O vetor da velocidade desejada é o vetor de posição do alvo menos o da própria posição
        var vel_desejada = alvo.posicao.subNew(this.posicao); // Um vetor apontando da localização dele para o alvo
        // Por enquanto, a velocidade desejada está apontando para o carnívoro. Assim, precisamos inverter os valores
        // de x e de y do vetor para que ele aponte para o lado oposto. É como num plano cartesiano: se invertermos o x,
        // a reta é espelhada verticalmente. Se invertermos só o y, é espelhada horizontalmente. Se invertermos ambos,
        // a reta fica diametralmente oposta, ou seja, aponta exatamente para a direção contrária.
        vel_desejada.x = -vel_desejada.x; // Invertendo x
        vel_desejada.y = -vel_desejada.y // Invertendo y
        // Amplia a velocidade desejada para a velocidade máxima do herbívoro
        vel_desejada.setMag(this.vel_max);

        // Redirecionamento = velocidade desejada - velocidade. Trata-se da força que será aplicada no herbívoro
        // para que sua velocidade mude de direção
        var redirecionamento = vel_desejada.subNew(this.vel);
        redirecionamento.limit(this.forca_max); // Limita o redirecionamento para a força máxima

        // Soma a força de redirecionamento à aceleração
        this.aplicaForca(redirecionamento);
    }

    display(){
        // var direcao = this.vel.headingDegs();
        c.beginPath();
        // desenhaOval(c, this.posicao.x, this.posicao.y, this.raio*2, this.raio, 'red');
        c.ellipse(this.posicao.x, this.posicao.y, this.raio * 0.7, this.raio * 1.1, this.vel.headingRads() - Math.PI/2, 0, Math.PI * 2);
        // console.log(this.vel.headingDegs());
        if(Carnivoro.highlight) {
            c.fillStyle = "rgba(" + this.cor.substr(4).replace(")","") + ",0.15)";
            c.strokeStyle = "rgba(" + this.cor.substr(4).replace(")","") + ",0.15)";
        } else {
            c.fillStyle = this.cor;
            c.strokeStyle = this.cor;
        }

        c.fill();
        // desenhando o raio de detecção
        //     c.beginPath();
        //     c.arc(this.posicao.x, this.posicao.y, this.raio_deteccao, 0, Math.PI * 2);
        //     c.strokeStyle = "grey";
        //     c.stroke();
    }
}
