class Herbivoro extends Organismo{
    static n_total_herbivoros = 0;
    static herbivoros = [];
    constructor(x, y, raio, vel_max, forca_max, cor, raio_deteccao, energia_max, taxa_gasto_energia, cansaco_max, taxa_aum_cansaco){
        super(x, y, raio, vel_max, forca_max, cor, raio_deteccao, energia_max, taxa_gasto_energia, cansaco_max, taxa_aum_cansaco);
       
        Herbivoro.n_total_herbivoros++;
        Herbivoro.herbivoros.push(this)
    }

    reproduzir(){
        var dados_filho = this._reproduzir();
        //pegando as variáveis do método privado e repassando para o público;
        var raio_filho = dados_filho[0];
        var vel_max_filho = dados_filho[1];
        var forca_max_filho = dados_filho[2];
        var raio_deteccao_filho = dados_filho[3];
        var energia_max_filho = dados_filho[4];
        var taxa_gasto_energia_filho = dados_filho[5];
        var cansaco_max_filho = dados_filho[6];
        var taxa_aum_cansaco_filho = dados_filho [7];

        return new Herbivoro(
            this.posicao.x, this.posicao.y, raio_filho, vel_max_filho, forca_max_filho, 
            this.cor, raio_deteccao_filho, energia_max_filho, taxa_gasto_energia_filho, 
            cansaco_max_filho, taxa_aum_cansaco_filho
        );
    }

    morre(){
        Herbivoro.herbivoros.splice(this, 1);
    }
    
    buscarAlimento(lista_alimentos){
        // Var recorde: qual a menor distância (a recorde) de um alimento até agora
        var recorde = Infinity; // Inicialmente, setaremos essa distância como sendo infinita
        var i_mais_perto = -1; // Qual o índice do alimento mais perto até agora

        // Loop que analisa cada alimento na lista de alimentos
        for(var i = 0; i < lista_alimentos.length; i++){
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
            if(recorde <= 5){
                // O herbívoro, ao comer o alimento, adquire a energia
                this.energia += lista_alimentos[i_mais_perto].energia_alimento;
                lista_alimentos.splice(i_mais_perto, 1); // Retira o alimento da lista de alimentos
            } else if(lista_alimentos.length != 0){
                this.persegue(lista_alimentos[i_mais_perto]);
            }
            
        }
    }

    // Método para detectar um predador (basicamente idêntico ao buscarAlimento())
    // O método faz o herbívoro achar o carnívoro mais próximo e, se ele estiver dentro de seu raio de detecção,
    // ele aciona o método fugir()
    detectaPredador(lista_predadores){
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

        // console.log("vel: ", this.vel);
        // Soma a força de redirecionamento à aceleração
        this.aplicaForca(redirecionamento);
    }

    display(){
        // var direcao = this.vel.headingDegs();


        c.beginPath();
        desenharOval(c, this.posicao.x, this.posicao.y, this.raio*2, this.raio, 'red')
        
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
