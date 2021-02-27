class Herbivoro extends Organismo{
    static herbivoros = [];

    constructor(x, y, raio, vel, acel, vel_max, forca_max, cor, raio_deteccao, energia, energia_max, taxa_gasto_energia, cansaco_max, taxa_aum_cansaco){
        super(x, y, raio, vel, acel, vel_max, forca_max, cor, raio_deteccao, energia, energia_max, taxa_gasto_energia, cansaco_max, taxa_aum_cansaco);
       
        Herbivoro.herbivoros.push(this);
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
            this._posicao.x, this._posicao.y, raio_filho, this._vel, this._acel, vel_max_filho, forca_max_filho, 
            this._cor, raio_deteccao_filho, this._energia, energia_max_filho, taxa_gasto_energia_filho, 
            cansaco_max_filho, taxa_aum_cansaco_filho
        );
    }

    comerAlimento(lista_alimentos, energia_alimento, percepcao){
        // Var recorde: qual a menor distância (a recorde) de um alimento até agora
        var recorde = Infinity; // Inicialmente, setaremos essa distância como sendo infinita
        var mais_perto = null; // Qual o alimento mais perto até agora (portanto mais_perto referenciará um objeto Alimento())
        // Loop que analisa cada alimento na lista de alimentos (Alimento.alimentos)
        for(var i = lista_alimentos.length - 1; i >= 0; i--){
            // Distância d entre este organismo e o atual alimento sendo analisado na lista (lista_alimentos[i])
            var d = this._posicao.dist(lista_alimentos[i].posicao);

            if (d < this._vel_max){
                lista_alimentos.splice(i, 1); // Retira o alimento comido da lista 
                this._energia += energia_alimento;
            } else{
                if (d < recorde && d < percepcao){ // Caso a distância seja menor que a distância recorde,
                    recorde = d; // recorde passa a ter o valor de d
                    mais_perto = lista_alimentos[i]; // e o atual alimento passa a ser o mais_perto 
                }
            }
        }
        // Momento em que ele vai comer!
        if(mais_perto != null){
            return this.persegue(mais_perto);
        }
        
        return new Vetor(0, 0)
    }
}