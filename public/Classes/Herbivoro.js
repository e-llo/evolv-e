class Herbivoro extends Organismo{
    static n_total_herbivoros = 0;

    constructor(x, y, raio, vel_max, forca_max, cor, raio_deteccao, energia, energia_max, taxa_gasto_energia, cansaco_max, taxa_aum_cansaco){
        super(x, y, raio, vel_max, forca_max, cor, raio_deteccao, energia, energia_max, taxa_gasto_energia, cansaco_max, taxa_aum_cansaco);
       
        Herbivoro.n_total_herbivoros++;
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
            this.cor, raio_deteccao_filho, this.energia, energia_max_filho, taxa_gasto_energia_filho, 
            cansaco_max_filho, taxa_aum_cansaco_filho
        );
    }

    buscarAlimento(lista_alimentos){
        // Var recorde: qual a menor distância (a recorde) de um alimento até agora
        var recorde = Infinity; // Inicialmente, setaremos essa distância como sendo infinita
        var mais_perto = -1; // Qual o índice do alimento mais perto até agora

        // Loop que analisa cada alimento na lista de alimentos
        for(var i = 0; i < lista_alimentos.length; i++){
            // Distância d entre este organismo e o atual alimento sendo analisado na lista (lista_alimentos[i])
            var d = this.posicao.dist(lista_alimentos[i].posicao);
            // Somente atualizará as variáveis se houver um alimento dentro do raio de detecção
            if(d < this.raio_deteccao){
                if (d <= recorde){ // Caso a distância seja menor que a distância recorde,
                    recorde = d; // recorde passa a ter o valor de d
                    mais_perto = i; // e o atual alimento passa a ser o mais_perto 
                }
            }
            
        }
        // Momento em que ele vai comer!
        if(recorde <= this.raio_deteccao){
            if(recorde <= 5){
                lista_alimentos.splice(mais_perto, 1);
            } else if(lista_alimentos.length != 0){
                this.persegue(lista_alimentos[mais_perto]);
            }
            
        }
        
    }

    

    


}
