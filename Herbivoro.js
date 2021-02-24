import {Organismo} from "./Organismo.js";

export class Herbivoro extends Organismo{
    constructor(tamanho, velocidade, cor, raio_deteccao, energia, cansaco){
        super(tamanho, velocidade, cor, raio_deteccao, energia, cansaco);
       //alguma coisa que quer que aconteça logo na criação
     }

    hello(){
        let tipo = "herbívoro";
        return this._hello(tipo);
    }
}