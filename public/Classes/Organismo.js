class Organismo{
    // static lista_de_organismos = []
    
    constructor(x, y, raio, vel, acel, vel_max, forca_max, cor, raio_deteccao, energia, energia_max, taxa_gasto_energia, cansaco_max, taxa_aum_cansaco){
        this._posicao = new Vetor(x, y);
        this._raio = raio;
        this._vel = new Vetor();
        this._acel = new Vetor();
        this._vel_max = vel_max;
        this._forca_max = forca_max;
        this._cor = cor;
        this._raio_deteccao = raio_deteccao;
        this._energia = energia;
        this._energia_max = energia_max;
        this._taxa_gasto_energia = taxa_gasto_energia;
        this._cansaco_max = cansaco_max;
        this._taxa_aum_cansaco = taxa_aum_cansaco;
    }
    
    // Método de reprodução (com mutações)
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

        return new Organismo(
            this._posicao.x, this._posicao.y, raio_filho, this._vel, this._acel, vel_max_filho, forca_max_filho, 
            this._cor, raio_deteccao_filho, this._energia, energia_max_filho, taxa_gasto_energia_filho, 
            cansaco_max_filho, taxa_aum_cansaco_filho
            );
    }
   
    _reproduzir(){ //criando um método de reprodução comum a todos os organismos
        var probabilidade_mutacao = 0.5; // chances de cada gene (atributo) sofrer mutação
        var sofreu_mutacao = false;
        // As mutações poderão ter valores positivos ou negativos com a mesma probabilidade (daí o "- 0.5").
        // A divisão é para diminuir a magnitude da diferença de uma geração para a outra
        // o (...).toFixed(4) é para arredondar para 4 casas decimais, mas retorna uma String
        // então o parseFloat() transforma tudo em float novamente
        console.log("\n--------------- Mutações ocorridas ----------------\n")
        // raio
        var mutacao_raio = parseFloat(((Math.random() - 0.5) / 4).toFixed(4));
        var raio_filho;
        if(Math.random() < probabilidade_mutacao){
            raio_filho = parseFloat((this._raio + mutacao_raio).toFixed(4));
            console.log("\nRaio: " + this._raio + " --> " + raio_filho);
            sofreu_mutacao = true;
        }
        else{
            raio_filho = this._raio;
        }
        
        // velocidade máxima
        var mutacao_vel_max = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var vel_max_filho;
        if(Math.random() < probabilidade_mutacao){
            vel_max_filho = parseFloat((this._vel_max + mutacao_vel_max).toFixed(4));
            console.log("Vel máx: " + this._vel_max + " --> " + vel_max_filho);
            sofreu_mutacao = true;
        } else{
            vel_max_filho = this._vel_max;
        }
        // força máxima
        var mutacao_forca_max = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var forca_max_filho;
        if(Math.random() < probabilidade_mutacao){
            forca_max_filho = parseFloat((this._forca_max + mutacao_forca_max).toFixed(4));
            console.log("Força máx: " + this._forca_max + " --> " + forca_max_filho);
            sofreu_mutacao = true;
        } else{
            forca_max_filho = this._forca_max;
        }
        // cor

        // raio de detecção
        var mutacao_raio_deteccao = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var raio_deteccao_filho;
        if(Math.random() < probabilidade_mutacao){
            raio_deteccao_filho = parseFloat((this._raio_deteccao + mutacao_raio_deteccao).toFixed(4));
            console.log("Raio de detecção: " + this._raio_deteccao + " --> " + raio_deteccao_filho);
            sofreu_mutacao = true;
        } else{
            raio_deteccao_filho = this._raio_deteccao;
        }
        
        // energia máxima
        var mutacao_energia_max = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var energia_max_filho;
        if(Math.random() < probabilidade_mutacao){
            energia_max_filho = parseFloat((this._energia_max + mutacao_energia_max).toFixed(4));
            console.log("Energia máx: " + this._energia_max + " --> " + energia_max_filho);
            sofreu_mutacao = true;
        } else{
            energia_max_filho = this._energia_max;
        }

        // taxa de gasto de energia
        var mutacao_taxa_gasto_energia = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var taxa_gasto_energia_filho;
        if(Math.random() < probabilidade_mutacao){
            taxa_gasto_energia_filho = parseFloat((this._taxa_gasto_energia + mutacao_taxa_gasto_energia).toFixed(4));
            console.log("Taxa de gasto de energia: " + this._taxa_gasto_energia + " --> " + taxa_gasto_energia_filho);
            sofreu_mutacao = true;
        } else{
            taxa_gasto_energia_filho = this._taxa_gasto_energia;
        }

        // cansaço máximo
        var mutacao_cansaco_maximo = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var cansaco_max_filho;
        if(Math.random() < probabilidade_mutacao){
            cansaco_max_filho = parseFloat((this._cansaco_max + mutacao_cansaco_maximo).toFixed(4));
            console.log("Cansaço máx: " + this._cansaco_max + " --> " + cansaco_max_filho);
            sofreu_mutacao = true;
        } else{
            cansaco_max_filho = this._cansaco_max;
        }

        // taxa de aumento do cansaço
        var mutacao_taxa_aum_cansaco = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var taxa_aum_cansaco_filho;
        if(Math.random() < probabilidade_mutacao){
            taxa_aum_cansaco_filho = parseFloat((this._taxa_aum_cansaco + mutacao_taxa_aum_cansaco).toFixed(4));
            console.log("Taxa de aumento do cansaço: " + this._taxa_aum_cansaco + " --> " + taxa_aum_cansaco_filho);
            sofreu_mutacao = true;
        } else{
            taxa_aum_cansaco_filho = this._taxa_aum_cansaco;
        }

        // if(sofreu_mutacao == true){
        //     console.log("Sofri uma mutação!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        // }
            var dados_filho = [raio_filho, vel_max_filho, forca_max_filho, 
            raio_deteccao_filho, energia_max_filho, taxa_gasto_energia_filho, 
            cansaco_max_filho,taxa_aum_cansaco_filho];

            return dados_filho;
    }

    // Método para atualizar o estdo do organismo
    update(){
        // Taxa de diminuição de energia
        this._energia -= _taxa_gasto_energia // 
        // Atualização da velocidade (soma vetor velocidade com o vetor aceleração)
        this._vel.add(this._acel);
        // Limita velocidade
        this._vel.limit(this.vel_max);
        this._posicao.add(this._vel);
        // Reseta a aceleração para 0 a cada ciclo
        this._acel.mul(0);
    }

    // Método para aplicar a força que fará o organismo virar na direção do alvo mais próximo de modo natural
    aplicaForca(forca){
        // Adiciona a força à aceleração, o que a faz aumentar
        this._acel.add(forca);
    }

    // Teste para implementação de aprendizado
    comportamento(bom, ruim){
        
    }


    hello(){
        let tipo = "organismo";
        return this._hello(tipo);
    }
    _hello(tipo){
        console.log('oi eu sou um', tipo); 
    }

    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.raio, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
}