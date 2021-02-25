import {Vetor} from "./Vetor.js"

export class Organismo{
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