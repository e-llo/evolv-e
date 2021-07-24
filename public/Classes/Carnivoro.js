class Carnivoro extends Organismo{
    static carnivoros = [];
   
    constructor(x, y, raio_min, vel_max, forca_max, cor, raio_deteccao_min, eficiencia_energetica, energia_max, cansaco_max, taxa_aum_cansaco, tempo_vida_min, tempo_vida_max){
        super(x, y, raio_min, vel_max, forca_max, cor, raio_deteccao_min, eficiencia_energetica, energia_max, cansaco_max, taxa_aum_cansaco, tempo_vida_min, tempo_vida_max); // referenciando o construtor da classe mãe
        
        // variável para contar quando um carnívoro poderá se reproduzir
        this.contagem_pra_reproducao = 0;
        
        // this.taxa_gasto_energia = (Math.pow(this.raio, 2) * Math.pow(this.vel.mag(), 2)) / 1000;

        Carnivoro.carnivoros.push(this);
    }
    // Método de reprodução (com mutações)
    reproduzir(){
        var filho = this._reproduzir();

        return new Carnivoro(
            this.posicao.x, this.posicao.y, filho.raio_min, filho.vel_max, filho.forca_max, 
            filho.cor, filho.raio_deteccao_min, filho.eficiencia_energetica, filho.energia_max, filho.cansaco_max, filho.taxa_aum_cansaco,
            filho.tempo_vida_min, filho.tempo_vida_max
        );
        
    }

    morre(){

        if(this.popover_id) deletePopover(this.popover_id, this.id);
        Carnivoro.carnivoros = super.remove(Carnivoro.carnivoros, this);
    }

    buscarHerbivoro(qtree, visaoC){
        this.comendo = false;
        // Var recorde: qual a menor distância (a recorde) de um herbivoro até agora
        var recorde = Infinity; // Inicialmente, setaremos essa distância como sendo infinita
        var i_mais_perto = -1; // Qual o índice na lista de herbivoros do herbivoro mais perto até agora

        // Insere em herbivoros_proximos uma lista de herbivoros que estão na sua QuadTree 
        let herbivoros_proximos = qtree.procuraHerbivoros(visaoC); // procuraHerbivoros() retorna uma lista de herbivoros
        // console.log("herbivoros próximos", herbivoros_proximos);

        // Loop que analisa cada herbivoro na lista de herbivoros
        for(var i = herbivoros_proximos.length - 1; i >= 0; i--){
            // Distância d entre este organismo e o atual herbivoro sendo analisado na lista (lista_herbivoros[i])
            // var d = this.posicao.dist(lista_herbivoros[i].posicao);

            var d2 = Math.pow(this.posicao.x - herbivoros_proximos[i].posicao.x, 2) + Math.pow(this.posicao.y - herbivoros_proximos[i].posicao.y, 2);
            
            if (d2 <= recorde){ // Caso a distância seja menor que a distância recorde,
                recorde = d2; // recorde passa a ter o valor de d
                i_mais_perto = i; // e o atual alimento passa a ser o i_mais_perto 
            }
            
        }
        // Momento em que ele vai comer!
        if(recorde <= Math.pow(this.raio_deteccao, 2)){
            this.comendo = true;
            if(recorde <= 25){ // como recorde é a distância ao quadrado, elevamos 5 ao quadrado (5^2 = 25) para comparar
                
                let indice_lista_estatica = 0;
                
                // Loop para achar o herbívoro que contenha o id do herbívoro mais próximo a fim de deletá-lo da lista estática com base em seu id 
                Herbivoro.herbivoros.every(h => {
                    if(h.checaId(herbivoros_proximos[i_mais_perto].id)){
                        return false;
                    }
                    indice_lista_estatica++;

                    return true;
                });

                this.comeHerbivoro(herbivoros_proximos[i_mais_perto], indice_lista_estatica);

                ///////////////////////////////////////////////////////////////////////////////
                this.contagem_pra_reproducao++;

                if(this.contagem_pra_reproducao == 3){ // se o carnívoro comer 4 herbívoros e já tiver vivido o suficiente
                    if(Math.random() < this.chance_de_reproducao ){ // chance de se reproduzir
                        this.reproduzir();
                    }
                    this.contagem_pra_reproducao = 0; // reseta a variável para que possa se reproduzir outras vezes
                }
                ///////////////////////////////////////////////////////////////////////////////
                
            } else if(herbivoros_proximos.length != 0){
                this.persegue(herbivoros_proximos[i_mais_perto]);
            }
        }
    }
    
    comeHerbivoro(herbivoro, i){
        // Absorção de energia ao comer o herbívoro
        // Se a energia que ele adquirá do herbívoro (10% da energia total do herbívoro)
        // for menor que o quanto falta para encher a barra de energia, ela será somada integralmente (os 10%)
        if(this.energia_max - this.energia >= herbivoro.energia_max * 0.1){
            this.energia += herbivoro.energia_max * 0.1; // O carnívoro, ao comer o herbívoro, ganha 10% da energia deste
        } else{
            this.energia = this.energia_max; // Limitanto a energia para não ultrapassar sua energia máxima
        }
        herbivoro.morre() // O herbívoro comido morre (é retirado da lista de herbívoros)
        this.aumentaTamanho();
        
    }
    aumentaTamanho(){
        if(this.raio<(this.raio_min*1.5)){
            this.raio += 0.03*this.raio;
            this.raio_deteccao += 0.02*this.raio_deteccao;
        }
       
    }
}