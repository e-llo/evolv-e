class Cronometro {
    constructor(tempo) { // tempo em milissegundos
        this._dataInicio = new Date(); // salva a data de quando o crônometro é criado
        this._tempo = tempo; // salva e deixa reservado o tempo que o crônometro contará até 0
        this._contador = tempo; // quanto falta pra acabar o tempo
    }
       
    getTempo = function() {
        if(this._contador <= 0) { // se acabar o tempo, retorna 0
            return 0;
        } else {
            this._contador = this._tempo - (new Date() - this._dataInicio); // calcula a diferença do tempo inicial com a hora atual
            // e subtrai do tempo do cronômetro
            return this._contador;
        }
    }
}