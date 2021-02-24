export class Organismo{
    constructor(tamanho, velocidade, cor, raio_deteccao, energia, cansaco){
        this._tamanho = tamanho;
        this._velocidade = velocidade;
        this._cor = cor;
        this._raio_deteccao = raio_deteccao;
        this._energia = energia;
        this._cansaco = cansaco;

       
    }
    hello(){
        let tipo = "organismo";
        return this._hello(tipo);
    }
    _hello(tipo){
        console.log('oi eu sou um', tipo); 
    }
}