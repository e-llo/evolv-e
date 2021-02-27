class Organismo{
    static n_total_organismos = 0;

    constructor(x, y, raio, vel_max, forca_max, cor, raio_deteccao, energia, energia_max, taxa_gasto_energia, cansaco_max, taxa_aum_cansaco){
        this.posicao = new Vetor(x, y);
        this.raio = raio;
        this.vel = new Vetor(0, 0);
        this.acel = new Vetor(0, 0);
        this.vel_max = vel_max;
        this.forca_max = forca_max;
        this.cor = cor;
        this.raio_deteccao = raio_deteccao;
        this.energia = energia;
        this.energia_max = energia_max;
        this.taxa_gasto_energia = taxa_gasto_energia;
        this.cansaco_max = cansaco_max;
        this.taxa_aum_cansaco = taxa_aum_cansaco;
        

        Organismo.n_total_organismos++;
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
            this.posicao.x, this.posicao.y, raio_filho, this.vel, this.acel, vel_max_filho, forca_max_filho, 
            this.cor, raio_deteccao_filho, this.energia, energia_max_filho, taxa_gasto_energia_filho, 
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
            raio_filho = parseFloat((this.raio + mutacao_raio).toFixed(4));
            console.log("\nRaio: " + this.raio + " --> " + raio_filho);
            sofreu_mutacao = true;
        }
        else{
            raio_filho = this.raio;
        }
        
        // velocidade máxima
        var mutacao_vel_max = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var vel_max_filho;
        if(Math.random() < probabilidade_mutacao){
            vel_max_filho = parseFloat((this.vel_max + mutacao_vel_max).toFixed(4));
            console.log("Vel máx: " + this.vel_max + " --> " + vel_max_filho);
            sofreu_mutacao = true;
        } else{
            vel_max_filho = this.vel_max;
        }
        // força máxima
        var mutacao_forca_max = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var forca_max_filho;
        if(Math.random() < probabilidade_mutacao){
            forca_max_filho = parseFloat((this.forca_max + mutacao_forca_max).toFixed(4));
            console.log("Força máx: " + this.forca_max + " --> " + forca_max_filho);
            sofreu_mutacao = true;
        } else{
            forca_max_filho = this.forca_max;
        }
        // cor

        // raio de detecção
        var mutacao_raio_deteccao = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var raio_deteccao_filho;
        if(Math.random() < probabilidade_mutacao){
            raio_deteccao_filho = parseFloat((this.raio_deteccao + mutacao_raio_deteccao).toFixed(4));
            console.log("Raio de detecção: " + this.raio_deteccao + " --> " + raio_deteccao_filho);
            sofreu_mutacao = true;
        } else{
            raio_deteccao_filho = this.raio_deteccao;
        }
        
        // energia máxima
        var mutacao_energia_max = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var energia_max_filho;
        if(Math.random() < probabilidade_mutacao){
            energia_max_filho = parseFloat((this.energia_max + mutacao_energia_max).toFixed(4));
            console.log("Energia máx: " + this.energia_max + " --> " + energia_max_filho);
            sofreu_mutacao = true;
        } else{
            energia_max_filho = this.energia_max;
        }

        // taxa de gasto de energia
        var mutacao_taxa_gasto_energia = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var taxa_gasto_energia_filho;
        if(Math.random() < probabilidade_mutacao){
            taxa_gasto_energia_filho = parseFloat((this.taxa_gasto_energia + mutacao_taxa_gasto_energia).toFixed(4));
            console.log("Taxa de gasto de energia: " + this.taxa_gasto_energia + " --> " + taxa_gasto_energia_filho);
            sofreu_mutacao = true;
        } else{
            taxa_gasto_energia_filho = this.taxa_gasto_energia;
        }

        // cansaço máximo
        var mutacao_cansaco_maximo = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var cansaco_max_filho;
        if(Math.random() < probabilidade_mutacao){
            cansaco_max_filho = parseFloat((this.cansaco_max + mutacao_cansaco_maximo).toFixed(4));
            console.log("Cansaço máx: " + this.cansaco_max + " --> " + cansaco_max_filho);
            sofreu_mutacao = true;
        } else{
            cansaco_max_filho = this.cansaco_max;
        }

        // taxa de aumento do cansaço
        var mutacao_taxa_aum_cansaco = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var taxa_aum_cansaco_filho;
        if(Math.random() < probabilidade_mutacao){
            taxa_aum_cansaco_filho = parseFloat((this.taxa_aum_cansaco + mutacao_taxa_aum_cansaco).toFixed(4));
            console.log("Taxa de aumento do cansaço: " + this.taxa_aum_cansaco + " --> " + taxa_aum_cansaco_filho);
            sofreu_mutacao = true;
        } else{
            taxa_aum_cansaco_filho = this.taxa_aum_cansaco;
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
        this.energia -= this.taxa_gasto_energia // 
        // Atualização da velocidade (soma vetor velocidade com o vetor aceleração)
        console.log("vel antes de add a acel: ", this.vel);
        console.log("Acel: ", this.acel);
        this.vel.add(this.acel);
        console.log("vel depois de add a acel: ", this.vel);
        // Limita velocidade
        this.vel.limit(this.vel_max);
        // A velocidade altera a posição (assim como a aceleração altera a velocidade)
        this.posicao.add(this.vel);
        // Reseta a aceleração para 0 a cada ciclo
        this.acel.mul(0);

        this.display();
    }

    // Método para aplicar a força que fará o organismo virar na direção do alvo mais próximo de modo natural
    aplicaForca(forca){
        // Adiciona a força à aceleração, o que a faz aumentar
        // Podemos considerar a massa no cálculo também: A = F / M
        console.log("força: ", forca);
        this.acel.add(forca);
        console.log("aplicaForca() ativado")
    }

    // Teste para implementação de aprendizado
    comportamento(bom, ruim){
        
    }

    // Método que calcula a força de redirecionamento em direção a um alvo
    // REDIRECIONAMENTO = VELOCIDADE DESEJADA - VELOCIDADE
    persegue(alvo){
        // O vetor da velocidade desejada é o vetor de posição do alvo menos o da própria posição
        var vel_desejada = alvo.posicao.subNew(this.posicao); // Um vetor apontando da localização dele para o alvo
        // Amplia a velocidade desejada para a velocidade máxima
        vel_desejada.setMag(this.vel_max);

        // Redirecionamento = velocidade desejada - velocidade
        var redirecionamento = vel_desejada.subNew(this.vel);
        redirecionamento.limit(this.forca_max); // Limita o redirecionamento para a força máxima

        console.log("vel: ", this.vel);
        // Soma a força de redirecionamento à aceleração
        this.aplicaForca(redirecionamento);
    }

    estaMorto(){
        return this.energia <= 0;
    }
    
    display(){
        c.beginPath();
        c.arc(this.posicao.x, this.posicao.y, this.raio, 0, Math.PI * 2);
        c.fillStyle = this.cor;
        c.fill();
    }
}