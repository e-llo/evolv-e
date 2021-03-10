class Carnivoro extends Organismo{
    static carnivoros = [];
    constructor(x, y, raio, vel_max, forca_max, cor, raio_deteccao, energia_max, taxa_gasto_energia, cansaco_max, taxa_dim_cansaco){
        super(x, y, raio, vel_max, forca_max, cor, raio_deteccao, energia_max, taxa_gasto_energia, cansaco_max, taxa_dim_cansaco); // referenciando o construtor da classe mãe
        
        // variável para contar quando um carnívoro poderá se reproduzir
        this.contagem_pra_reproducao = 0;
        
        Carnivoro.carnivoros.push(this);
    }

    // Método de reprodução (com mutações)
    reproduzir(){
        var dados_filho = this._reproduzir();
        //pegando as variáveis do método privado e repassando para o público
        var raio_filho = dados_filho[0];
        var vel_max_filho = dados_filho[1];
        var forca_max_filho = dados_filho[2];
        var cor_filho = dados_filho[3]
        var raio_deteccao_filho = dados_filho[4];
        var energia_max_filho = dados_filho[5];
        var taxa_gasto_energia_filho = dados_filho[6];
        var cansaco_max_filho = dados_filho[7];
        var taxa_aum_cansaco_filho = dados_filho [8];

        return new Carnivoro(
            this.posicao.x +50, this.posicao.y, raio_filho, vel_max_filho, forca_max_filho, 
            cor_filho, raio_deteccao_filho, energia_max_filho, taxa_gasto_energia_filho, 
            cansaco_max_filho, taxa_aum_cansaco_filho
        );
        
    }

    morre(){
        Carnivoro.carnivoros.splice(this, 1);
    }

    buscarHerbivoro(lista_herbivoros){
        // Var recorde: qual a menor distância (a recorde) de um herbivoro até agora
        var recorde = Infinity; // Inicialmente, setaremos essa distância como sendo infinita
        var i_mais_perto = -1; // Qual o índice na lista de herbivoros do herbivoro mais perto até agora

        // Loop que analisa cada herbivoro na lista de herbivoros
        for(var i = 0; i < lista_herbivoros.length; i++){
            // Distância d entre este organismo e o atual herbivoro sendo analisado na lista (lista_herbivoros[i])
            var d = this.posicao.dist(lista_herbivoros[i].posicao);
            // Somente atualizará as variáveis se houver um herbivoro dentro do raio de detecção
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
                
                this.comeHerbivoro(lista_herbivoros, i_mais_perto);

                this.contagem_pra_reproducao++;

                if(this.contagem_pra_reproducao == 4){ // se o carnívoro comer 4 herbívoros
                    this.reproduzir();
                    this.contagem_pra_reproducao = 0; // reseta a variável para que possa se reproduzir outras vezes
                }
                
            } else if(lista_herbivoros.length != 0){
                this.persegue(lista_herbivoros[i_mais_perto]);
            }
        }
    }
    
    comeHerbivoro(herbivoro, i){
        // Absorção de energia ao comer o herbívoro
        // Se a energia que ele adquirá do herbívoro (1/4 da energia do herbívoro quando foi comido)
        // for menor que o quanto falta para encher a barra de energia, ela (o 1/4) será somada integralmente
        if(this.energia_max - this.energia >= herbivoro.energia / 4){
            this.energia += herbivoro.energia / 4; // O carnívoro, ao comer o herbívoro, ganha um quarto da energia deste
        } else{
            this.energia = this.energia_max; // Limitanto a energia para não ultrapassar sua energia máxima
        }

        Herbivoro.herbivoros.splice(i, 1); // O herbívoro comido morre (é retirado da lista de herbívoros)
    }
}