class Herbivoro extends Organismo{
    static herbivoros = [];
    constructor(x, y, raio_min, vel_max, forca_max, cor, raio_deteccao, energia_max, cansaco_max, taxa_aum_cansaco, tempo_vida_min, tempo_vida_max){
        super(x, y, raio_min, vel_max, forca_max, cor, raio_deteccao, energia_max, cansaco_max, taxa_aum_cansaco, tempo_vida_min, tempo_vida_max);
       
        // variável para contar quando um herbívoro poderá se reproduzir
        this.contagem_pra_reproducao = 0;

        Herbivoro.herbivoros.push(this);
        console.log("H - vel máx: "+parseFloat(this.vel_max.toFixed(4))+" | raio_min: "+parseFloat(this.raio_min.toFixed(4))+" | força máx: "+parseFloat(this.forca_max.toFixed(4))+" | raio detecção: "+parseFloat(this.raio_deteccao.toFixed(4))
        + " | vida: " + this.cronometro_vida.getTempo());
    }


    reproduzir(){
        var filho = this._reproduzir();
        
        return new Herbivoro(
            this.posicao.x, this.posicao.y, filho.raio_min, filho.vel_max, filho.forca_max, 
            filho.cor, filho.raio_deteccao, filho.energia_max, filho.cansaco_max, filho.taxa_aum_cansaco,
            filho.tempo_vida_min, filho.tempo_vida_max
        );
        
    }

    morre(){
        Herbivoro.herbivoros = super.remove(Herbivoro.herbivoros, this);
    }
    
    buscarAlimento(lista_alimentos){
        this.comendo = false;
        // Var recorde: qual a menor distância (a recorde) de um alimento até agora
        var recorde = Infinity; // Inicialmente, setaremos essa distância como sendo infinita
        var i_mais_perto = -1; // Qual o índice do alimento mais perto até agora

        // Loop que analisa cada alimento na lista de alimentos
        for(var i = lista_alimentos.length - 1; i >= 0 ; i--){
            // Distância d entre este organismo e o atual alimento sendo analisado na lista (lista_alimentos[i])
            var d = this.posicao.dist(lista_alimentos[i].posicao);
            // Somente atualizará as variáveis se houver um alimento dentro do raio de detecção
            if(d < this.raio_deteccao){
                if (d <= recorde){ // Caso a distância seja menor que a distância recorde,
                    recorde = d; // recorde passa a ter o valor de d
                    i_mais_perto = i; // e o atual alimento passa a ser o i_mais_perto 
                }
            }
        }
        // Momento em que ele vai comer!
        if(recorde <= this.raio_deteccao){
            this.comendo = true;
            if(recorde <= 5){
                this.comeAlimento(lista_alimentos[i_mais_perto], i_mais_perto);

                this.contagem_pra_reproducao++; 

                if(this.contagem_pra_reproducao == 4){ // se o herbívoro comer <contagem_pra_reproducao> alimentos
                    if(Math.random() < this.chance_de_reproducao){ // chance de se reproduzir
                        this.reproduzir();
                    }
                    this.contagem_pra_reproducao = 0; // reseta a variável para que possa se reproduzir outras vezes
                }
                
            } else if(lista_alimentos.length != 0){
                this.persegue(lista_alimentos[i_mais_perto]);
            }
        }
    }

    comeAlimento(alimento, i){
        // Absorção de energia ao comer alimento:
        // Se a energia do alimento for menor que o quanto falta para encher a barra de energia, 
        // o herbívoro adquire ela toda
        if(this.energia_max - this.energia >= alimento.energia_alimento){
            this.energia += alimento.energia_alimento;
        } else{ 
            this.energia = energia_max; // Limitanto a energia para não ultrapassar sua energia máxima
        }
        
        Alimento.alimentos.splice(i, 1); // Retira o alimento da lista de alimentos
        this.aumentaTamanho();
    }

    aumentaTamanho(){
        if(this.raio<(this.raio_min*2)){
            this.raio += 0.05*this.raio;
            this.raio_deteccao += 0.05*this.raio_deteccao;
        }
    }

    // Método para detectar um predador (basicamente idêntico ao buscarAlimento())
    // O método faz o herbívoro achar o carnívoro mais próximo e, se ele estiver dentro de seu raio de detecção,
    // ele aciona o método fugir()
    detectaPredador(lista_predadores){
        this.fugindo = false;
        // Var recorde: qual a menor distância (a recorde) de um carnívoro até agora
        var recorde = Infinity; // Inicialmente, setaremos essa distância como sendo infinita
        var i_mais_perto = -1; // Qual o índice do carnívoro mais perto até agora

        // Loop que analisa cada carnívoro na lista de predadores
        for(var i = 0; i < lista_predadores.length; i++){
            // Distância d entre este organismo e o atual carnívoro sendo analisado na lista (lista_predadores[i])
            var d = this.posicao.dist(lista_predadores[i].posicao);
            // Somente atualizará as variáveis se houver um carnívoro dentro do raio de detecção
            if(d < this.raio_deteccao){
                if (d <= recorde){ // Caso a distância seja menor que a distância recorde,
                    recorde = d; // recorde passa a ter o valor de d
                    i_mais_perto = i; // e o atual carnívoro passa a ser o i_mais_perto 
                }
            }
        }
        // Momento em que ele vai fugir!
        if(recorde <= this.raio_deteccao){
            this.fugindo = true;
            if(lista_predadores.length != 0){
                // Chamada do método foge(), que muda a velocidade do herbívoro para a direção oposta ao do predador
                this.foge(lista_predadores[i_mais_perto]); 
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
        c.fillStyle = this.cor;
        c.strokeStyle = this.cor;
        c.fill();
        // desenhando o raio de detecção
        // c.beginPath();
        // c.arc(this.posicao.x, this.posicao.y, this.raio_deteccao, 0, Math.PI * 2);
        // c.strokeStyle = "grey";
        // c.stroke();
    }
}
