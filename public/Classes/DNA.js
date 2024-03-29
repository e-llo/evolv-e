class DNA{
    constructor(raio_inicial, vel_max, forca_max, cor, raio_deteccao_inicial, intervalo_ninhada, sexo){
        this.raio_inicial = raio_inicial;
        this.vel_max = vel_max;
        this.forca_max = forca_max;
        this.cor = cor;
        this.raio_deteccao_inicial = raio_deteccao_inicial;
        this.intervalo_ninhada = intervalo_ninhada;
        this.sexo = sexo; // string que pode ser XX (fêmea) ou XY (macho)
    }

    mutar(){
        var dna_mutado;

        // raio inicial
        var raio_inicial_filho = newMutacao(this.raio_inicial);
        if(raio_inicial_filho < 0){
            raio_inicial_filho = 0;
        }
        // velocidade máxima
        var vel_max_filho = newMutacao(this.vel_max);
        if(vel_max_filho < 0){
            vel_max_filho = 0;
        }

        // força máxima
        var forca_max_filho = newMutacao(this.forca_max);

        // cor
        var cor_filho = corMutacao(this.cor);

        // raio de detecção inicial
        var raio_deteccao_inicial_filho = newMutacao(this.raio_deteccao_inicial);
        if(raio_deteccao_inicial_filho < raio_inicial_filho){
            raio_deteccao_inicial_filho = raio_inicial_filho;
        }

        // tamanho da ninhada
        var intervalo_ninhada_filho = mutacaoNinhada(this.intervalo_ninhada[0], this.intervalo_ninhada[1]);

        dna_mutado = new DNA(
            raio_inicial_filho, 
            vel_max_filho,
            forca_max_filho,
            cor_filho,
            raio_deteccao_inicial_filho,
            intervalo_ninhada_filho
            )

        return dna_mutado;
    }

}