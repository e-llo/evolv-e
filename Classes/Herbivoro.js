import {Organismo} from "./Organismo.js";

export class Herbivoro extends Organismo{
    static n_herbivoros = 0;
    constructor(x, y, raio, vel, acel, vel_max, forca_max, cor, raio_deteccao, energia, energia_max, taxa_gasto_energia, cansaco_max, taxa_aum_cansaco){
        super(x, y, raio, vel, acel, vel_max, forca_max, cor, raio_deteccao, energia, energia_max, taxa_gasto_energia, cansaco_max, taxa_aum_cansaco);
       //alguma coisa que quer que aconteça logo na criação
       Herbivoro.n_herbivoros++;
     }

    // Método de reprodução (com mutações)
    reproduzir(){
        var probabilidade_mutacao = 1; // chances de cada gene (atributo) sofrer mutação
        var sofreu_mutacao = false;
        // As mutações poderão ter valores positivos ou negativos com a mesma probabilidade (daí o "- 0.5").
        // A divisão é para diminuir a magnitude da diferença de uma geração para a outra
        // o (...).toFixed(4) é para arredondar para 4 casas decimais, mas retorna uma String
        // então o parseFloat() transforma tudo em float novamente

        // raio
        var mutacao_raio = parseFloat(((Math.random() - 0.5) / 4).toFixed(4));
        var raio_filho;
        if(Math.random() < probabilidade_mutacao){
            console.log("\nraio do pai: " + this._raio);
            raio_filho = parseFloat((this._raio + mutacao_raio).toFixed(4));
            console.log("raio do filho: " + raio_filho);
            sofreu_mutacao = true;
        }
        else{
            raio_filho = this._raio;
        }
        
        // velocidade máxima
        var mutacao_vel_max = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var vel_max_filho;
        if(Math.random() < probabilidade_mutacao){
            console.log("\nvel máx do pai: " + this._vel_max);
            vel_max_filho = parseFloat((this._vel_max + mutacao_vel_max).toFixed(4));
            console.log("vel máx filho: " + vel_max_filho);
            sofreu_mutacao = true;
        } else{
            vel_max_filho = this._vel_max;
        }
        // força máxima
        var mutacao_forca_max = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var forca_max_filho;
        if(Math.random() < probabilidade_mutacao){
            console.log("\nforça máx pai: " + this._forca_max);
            forca_max_filho = parseFloat((this._forca_max + mutacao_forca_max).toFixed(4));
            console.log("força máx filho: " + forca_max_filho);
            sofreu_mutacao = true;
        } else{
            forca_max_filho = this._forca_max;
        }
        // cor

        // raio de detecção
        var mutacao_raio_deteccao = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var raio_deteccao_filho;
        if(Math.random() < probabilidade_mutacao){
            console.log("\nraio de detecção pai: " + this._raio_deteccao);
            raio_deteccao_filho = parseFloat((this._raio_deteccao + mutacao_raio_deteccao).toFixed(4));
            console.log("raio de detecção filho: " + raio_deteccao_filho);
            sofreu_mutacao = true;
        } else{
            raio_deteccao_filho = this._raio_deteccao;
        }
        
        // energia máxima
        var mutacao_energia_max = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var energia_max_filho;
        if(Math.random() < probabilidade_mutacao){
            console.log("\nenergia máx pai: " + this._energia_max);
            energia_max_filho = parseFloat((this._energia_max + mutacao_energia_max).toFixed(4));
            console.log("energia máx filho: " + energia_max_filho);
            sofreu_mutacao = true;
        } else{
            energia_max_filho = this._energia_max;
        }

        // taxa de gasto de energia
        var mutacao_taxa_gasto_energia = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var taxa_gasto_energia_filho;
        if(Math.random() < probabilidade_mutacao){
            console.log("\ntaxa de gasto de energia pai: " + this._taxa_gasto_energia);
            taxa_gasto_energia_filho = parseFloat((this._taxa_gasto_energia + mutacao_taxa_gasto_energia).toFixed(4));
            console.log("taxa de gasto de energia filho: " + taxa_gasto_energia_filho);
            sofreu_mutacao = true;
        } else{
            taxa_gasto_energia_filho = this._taxa_gasto_energia;
        }

        // cansaço máximo
        var mutacao_cansaco_maximo = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var cansaco_max_filho;
        if(Math.random() < probabilidade_mutacao){
            console.log("\ncansaço máx pai: " + this._cansaco_max);
            cansaco_max_filho = parseFloat((this._cansaco_max + mutacao_cansaco_maximo).toFixed(4));
            console.log("cansaço máx filho: " + cansaco_max_filho);
            sofreu_mutacao = true;
        } else{
            cansaco_max_filho = this._cansaco_max;
        }

        // taxa de aumento do cansaço
        var mutacao_taxa_aum_cansaco = parseFloat(((Math.random() - 0.5) / 2).toFixed(4));
        var taxa_aum_cansaco_filho;
        if(Math.random() < probabilidade_mutacao){
            console.log("\ntaxa de aumento do cansaço pai: " + this.taxa_aum_cansaco);
            taxa_aum_cansaco_filho = parseFloat((this._taxa_aum_cansaco + mutacao_taxa_aum_cansaco).toFixed(4));
            console.log("taxa de aumento do cansaço filho: " + taxa_aum_cansaco_filho);
            sofreu_mutacao = true;
        } else{
            taxa_aum_cansaco_filho = this._taxa_aum_cansaco;
        }

        if(sofreu_mutacao == true){
            console.log("Sofri uma mutação!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        }

        return new Herbivoro(
            this._x, this._y, raio_filho, this._vel, this._acel, vel_max_filho, forca_max_filho, 
            this._cor, raio_deteccao_filho, this._energia, energia_max_filho, taxa_gasto_energia_filho, 
            cansaco_max_filho, taxa_aum_cansaco_filho
            );
    }

    hello(){
        let tipo = "herbívoro";
        return this._hello(tipo);
    }
}