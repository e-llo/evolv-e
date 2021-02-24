import {Organismo} from "./Organismo.js";

export class Carnivoro extends Organismo{
    constructor(tamanho, velocidade, cor, raio_deteccao, energia, cansaco){
        super(tamanho, velocidade, cor, raio_deteccao, energia, cansaco); // referenciando o construtor da classe mãe
      
        //alguma coisa que quer que aconteça logo na criação
    }
    hello(){
        let tipo = "carnívoro";
        return super._hello(tipo);
    }
}