class Carnivoro extends Organismo{
    static n_total_carnivoros = 0;
    static carnivoros = [];
    constructor(x, y, raio, vel_max, forca_max, cor, raio_deteccao, energia_max, taxa_gasto_energia, cansaco_max, taxa_dim_cansaco){
        super(x, y, raio, vel_max, forca_max, cor, raio_deteccao, energia_max, taxa_gasto_energia, cansaco_max, taxa_dim_cansaco); // referenciando o construtor da classe mãe
        
        Carnivoro.n_total_carnivoros++;
        Carnivoro.carnivoros.push(this);
    }

    // Método de reprodução (com mutações)
    reproduzir(){
        var dados_filho = this._reproduzir();
        //pegando as variáveis do método privado e repassando para o público
        var raio_filho = dados_filho[0];
        var vel_max_filho = dados_filho[1];
        var forca_max_filho = dados_filho[2];
        var raio_deteccao_filho = dados_filho[3];
        var energia_max_filho = dados_filho[4];
        var taxa_gasto_energia_filho = dados_filho[5];
        var cansaco_max_filho = dados_filho[6];
        var taxa_aum_cansaco_filho = dados_filho [7];

        return new Carnivoro(
            this.posicao.x +50, this.posicao.y, raio_filho, vel_max_filho, forca_max_filho, 
            this.cor, raio_deteccao_filho, energia_max_filho, taxa_gasto_energia_filho, 
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
                // O carnívoro, ao comer o herbívoro, ganha metade da energia deste
                this.energia += (lista_herbivoros[i_mais_perto].energia / 2).toFixed(4);
                // O herbívoro comido morre (é retirado da lista de herbívoros)
                lista_herbivoros.splice(i_mais_perto, 1);
                console.log("Herbivoro foi comido!");
            } else if(lista_herbivoros.length != 0){
                this.persegue(lista_herbivoros[i_mais_perto]);
            }
            
        }
        
    }
}