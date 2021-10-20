class Organismo{
    static organismos = [];
    static n_total_organismos = 0;
    static id = 0;

    constructor(x, y, dna, pai = null){
        this.id = Organismo.id++;        
        this.posicao = new Vetor(x, y);
        if(pai){
            this.pai = pai;
        }
        this.filhos = [];

        this.raio_inicial = dna.raio_inicial;
        this.vel_max = dna.vel_max;
        this.forca_max = dna.forca_max;
        this.cor = dna.cor;
        this.raio_deteccao_inicial = dna.raio_deteccao_inicial;
        this.intervalo_ninhada = dna.intervalo_ninhada;
        this.sexo = dna.sexo;

        // DNA -> Objeto para separar apenas os atributos passados para os descendentes
        this.dna = new DNA(
            this.raio_inicial,
            this.vel_max,
            this.forca_max,
            this.cor,
            this.raio_deteccao_inicial,
            this.intervalo_ninhada,
            this.sexo
        )

        this.raio = this.raio_inicial;
        this.vel = new Vetor(0.0001, 0.0001);
        this.acel = new Vetor(0, 0);
        var rgb = this.cor.substring(4, this.cor.length - 1).split(",");
        this.cor2 = "rgba(" + Math.floor(parseInt(rgb[0]) * 0.4) + "," + Math.floor(parseInt(rgb[1]) * 0.4) + "," + Math.floor(parseInt(rgb[2]) * 0.4) + ")";
        
        this.raio_deteccao = this.raio_deteccao_inicial;
        this.energia_max = Math.pow(this.raio, 2) * 6;
        this.energia_max_fixa = Math.pow(this.raio_inicial * 1.5, 2) * 6; // Usada para obter valores não-variáveis no gráfico


        // NINHADAS

        // this.energia = this.energia_max * 0.75
        if(pai){
            this.energia = (this.energia_max * (0.75 + Math.random() / 4)) / (pai.tamanho_ninhada) * 0.6; // Começa com uma parcela da energia máxima
        } else{
            this.energia = this.energia_max * 0.75
        }

        this.taxa_gasto_energia;
        this.gasto_minimo = 0.0032 * Math.pow(Math.pow(this.raio, 2), 0.75); // Seguindo a lei de Kleiber para a taxa metabólica dos seres vivos
        this.taxa_gasto_energia_max = this.gasto_minimo + (Math.pow(this.raio_inicial * 1.5, 2) * Math.pow(this.vel_max, 2)) * 0.00012;;
        this.chance_de_reproducao = 0.5;
        this.status;
        this.qdade_comida = 0;
        this.vezes_reproduzidas = 0;
        this.segundo_nascimento = segundos_totais; // "segundo" é a variável global
        this.tempo_vida = parseInt(geraNumeroPorIntervalo(200, 300)); // tempo de vida do organismo
        this.tempo_vivido = 0;
        this.tamanho_ninhada;

        // Variáveis de status
        this.comendo = false;
        this.fugindo = false;
        this.vagueando = false;

        // Variável que delimita a distância da borda a partir da qual os organismos começarão a fazer a curva para não bater nas bordas 
        this.d = 20; 

        // variáveis usadas para o método vagueia()
        this.d_circulo = 2;
        this.raio_circulo = 1;
        this.angulo_vagueio = Math.random() * 360;

        // variável para separar os organismos que nasceram antes da divisão da tela dos que nasceram depois
        this.antes_da_divisao = false;
        this.posicao_fixa_momentanea = new Vetor(x, y);

        Organismo.organismos.push(this);
        Organismo.n_total_organismos++;
    }
  
    // Criando um método de reprodução comum a todos os organismos
    _reproduzir(){
        return this.dna.mutar();
    }

    // Método para atualizar o estado do organismo
    update(){
        this.tempo_vivido = segundos_totais - this.segundo_nascimento;
        this.taxa_gasto_energia = (Math.pow(this.raio, 2) * Math.pow(this.vel.mag(), 2)) * 0.0002; // Atualiza de acordo com a velocidade atual
        // Taxa de diminuição de energia
        if(this.energia > 0){
            this.energia -= (this.taxa_gasto_energia + this.gasto_minimo);

            if(Math.random() < (0.0005 * this.qdade_comida)/10){ // Número baixo pois testa a cada frame. Quando mais comeu, maiores as chances
                if(Math.random() <= this.chance_de_reproducao){
                    // this.reproduzir();
                    // NINHADA

                    this.tamanho_ninhada = geraInteiro(this.intervalo_ninhada[0], this.intervalo_ninhada[1] + 1);
                    for(var i = 0; i < this.tamanho_ninhada; i++){
                        if(Math.random() < 0.2){ // Para espaçar os nascimentos
                            this.reproduzir();
                        }
                    }
                }
            }
        } else{
            this.morre(); 
        }
        
        if(this.tempo_vivido >= this.tempo_vida){ // se se passar mais tempo desde o nascimento que o tempo de vida do organismo
            this.morre();
        }

        // Delimitação de bordas
        if(telaDividida){
            this.criaBordas(true);
        } else{
            this.criaBordas(false);
        }
    
        // Atualização da velocidade (soma vetor velocidade com o vetor aceleração)
        this.vel.add(this.acel);
        // Limita velocidade
        this.vel.limit(this.vel_max);

        // console.log("ângulo vel: ", this.vel.headingDegs());

        // Se existir um proxy, inserir por lá para que seja possível monitorar a mudança de posicao
        if(this.proxy) {
            this.proxy.add(this.vel)
        } else {
            // A velocidade altera a posição (assim como a aceleração altera a velocidade)
            this.posicao.add(this.vel);
        }
        // Reseta a aceleração para 0 a cada ciclo
        this.acel.mul(0);

        this.display();
    }

    aumentaTamanho(){
        if(this.raio<(this.raio_inicial*1.5)){
            this.raio += 0.05*this.raio;
            this.raio_deteccao += 0.03*this.raio_deteccao;
        }
        this.energia_max = Math.pow(this.raio, 2) * 6
    }

    // Método para criar bordas que delimitarão o espaço do organismo
    criaBordas(telaDividida){ // telaDividida: boolean
        this.delimitaBordas(telaDividida);
        this.evitaBordas(telaDividida);
    }

    // Método para impedir a passagem dos organismos para fora da tela
    delimitaBordas(telaDividida){
        if(telaDividida == true){
            // Delimitação para quem ficou no lado esquerdo
            if(this.posicao.x <= universoWidth/2){
                if(this.posicao.x + 2*this.raio > universoWidth / 2) // borda direita (a divisão, ou seja, na metade da tela)
                    this.vel.x = this.vel.x * -1; // inverte a velocidade x se ultrapassa a borda

                if(this.posicao.x < 0) // borda esquerda
                    this.vel.x = this.vel.x * -1;

                if(this.posicao.y + this.raio > universoHeight) // borda baixo
                    this.vel.y = this.vel.y* -1;

                if(this.posicao.y < 0) // borda cima
                    this.vel.y = this.vel.y * -1;
            } else{ // Delimitação para quem ficou no lado direito
                if(this.posicao.x + 2*this.raio > universoWidth) // borda direita
                    this.vel.x = this.vel.x * -1; //inverte a velocidade x se ultrapassa a borda do canvas

                if(this.posicao.x - this.raio < universoWidth / 2) // borda esquerda (a divisão, ou seja, na metade da tela)
                    this.vel.x = this.vel.x * -1;

                if(this.posicao.y + this.raio > universoHeight) // borda baixo
                    this.vel.y = this.vel.y* -1;

                if(this.posicao.y < 0) // borda cima
                    this.vel.y = this.vel.y * -1;
            }
            
        } else{ // se a tela NÃO estiver dividida
            if(this.posicao.x + 2*this.raio > universoWidth) // borda direita
                this.vel.x = this.vel.x * -1; //inverte a velocidade x se ultrapassa a borda do canvas

            if(this.posicao.x - this.raio < 0) // borda esquerda
                this.vel.x = this.vel.x * -1;

            if(this.posicao.y + this.raio > universoHeight) // borda baixo
                this.vel.y = this.vel.y* -1;

            if(this.posicao.y < 0) // borda cima
                this.vel.y = this.vel.y * -1;
        }
        
    }

    // Método para aplicar força ao organismo que o impeça de continuar a seguir por uma trajetória para fora da tela
    evitaBordas(telaDividida){
        var vel_desejada = null; // Esta velocidade será o vetor que dirá para onde o organismo deve ir para não sair da borda
        this.perto_da_borda = false;

        if(telaDividida == true){
            // Para quem ficou na parte esquerda
            if(this.posicao.x <= universoWidth/2){
                // Borda esquerda
                if(this.posicao.x - this.raio < this.d){ // d é um atributo de todo organismo que delimita a distância de uma borda a partir da qual ele começará a manobrar
                    vel_desejada = new Vetor(this.vel_max, this.vel.y); // Faz sua velocidade ser máxima na direção x (para a direita)
                    this.perto_da_borda = true;
                } 
                // Borda direita
                else if(this.posicao.x + 2*this.raio > universoWidth / 2 - this.d){ // a borda direita é a metade do canvas (na tela dividida)
                    vel_desejada = new Vetor(-this.vel_max, this.vel.y); // Faz sua velocidade ser máxima na direção -x (para a esquerda)
                    this.perto_da_borda = true;
                }
                // Borda de cima
                if(this.posicao.y - this.raio < this.d){
                    vel_desejada = new Vetor(this.vel.x, this.vel_max); // Faz sua velocidade ser máxima na direção y (para a baixo)
                    this.perto_da_borda = true;
                }
                // Borda de baixo
                else if(this.posicao.y + this.raio > universoHeight - this.d){
                    vel_desejada = new Vetor(this.vel.x, -this.vel_max); // Faz sua velocidade ser máxima na direção -y (para a cima)
                    this.perto_da_borda = true;
                }
            }

            // Para quem ficou na parte direita
            else{
                // Borda esquerda
                if(this.posicao.x - this.raio < universoWidth/2 + this.d){ // a borda esquerda é a metade do canvas (na tela dividida)
                    vel_desejada = new Vetor(this.vel_max, this.vel.y); // Faz sua velocidade ser máxima na direção x (para a direita)
                    this.perto_da_borda = true;
                } 
                // Borda direita
                else if(this.posicao.x + 2*this.raio > universoWidth - this.d){
                    vel_desejada = new Vetor(-this.vel_max, this.vel.y); // Faz sua velocidade ser máxima na direção -x (para a esquerda)
                    this.perto_da_borda = true;
                }
                // Borda de cima
                if(this.posicao.y < this.d){
                    vel_desejada = new Vetor(this.vel.x, this.vel_max); // Faz sua velocidade ser máxima na direção y (para a baixo)
                    this.perto_da_borda = true;
                }
                // Borda de baixo
                else if(this.posicao.y > universoHeight - this.d){
                    vel_desejada = new Vetor(this.vel.x, -this.vel_max); // Faz sua velocidade ser máxima na direção -y (para a cima)
                    this.perto_da_borda = true;
                }
            }
            
        } else{ // se a tela NÃO estiver dividida
             // Borda esquerda
             if(this.posicao.x - this.raio < this.d){ 
                vel_desejada = new Vetor(this.vel_max, this.vel.y); // Faz sua velocidade ser máxima na direção x (para a direita)
                this.perto_da_borda = true;
            } 
            // Borda direita
            else if(this.posicao.x + this.raio > universoWidth - this.d){
                vel_desejada = new Vetor(-this.vel_max, this.vel.y); // Faz sua velocidade ser máxima na direção -x (para a esquerda)
                this.perto_da_borda = true;
            }
            // Borda de cima
            if(this.posicao.y - this.raio < this.d){
                vel_desejada = new Vetor(this.vel.x, this.vel_max); // Faz sua velocidade ser máxima na direção y (para a baixo)
                this.perto_da_borda = true;
            }
            // Borda de baixo
            else if(this.posicao.y + this.raio> universoHeight - this.d){
                vel_desejada = new Vetor(this.vel.x, -this.vel_max); // Faz sua velocidade ser máxima na direção -y (para a cima)
                this.perto_da_borda = true;
            }
        }
        

        if(vel_desejada != null){ // Caso qualquer uma das condições anteriores tenha sido satisfeita
            vel_desejada.normalize(); // Normaliza (transforma para ter tamanho 1) o vetor vel_desejada
            vel_desejada.mul(this.vel_max); // Multiplica o vetor (que agora tem tamanho 1) pela velocidade máxima
            var redirecionamento = vel_desejada.sub(this.vel); // Cria um vetor de força que redirecionará o organismo
            redirecionamento.limit(this.forca_max * 100); // Limita essa força com uma folga maior para dar chances dela ser maior que as outras forças atuantes nele
            this.aplicaForca(redirecionamento); // Aplica esta força no organismo e a deixa levemente mais forte para ganhar prioridade em relação a outras forças
        }
    }


    // Método para aplicar a força que fará o organismo virar na direção do alvo mais próximo de modo natural
    aplicaForca(forca){
        // Adiciona a força à aceleração, o que a faz aumentar
        // Podemos considerar a massa no cálculo também: A = F / M (não implementado)
        this.acel.add(forca);
    }

    // Teste para implementação de aprendizado de comportamento
    comportamento(bom, ruim){
        
    }

    // Método que fará o organismo vaguear por aí quando não está fugindo ou perseguindo
    vagueia(){
        // if(!this.fugindo && !this.comendo){
            this.vagueando = true;
            this.status = "vagueando";
            // A ideia é criar uma pequena força a cada frame logo à frente do organismo, a uma d dele.
            // Desenharemos um círculo à frente do organismo, e o vetor da força de deslocamento partirá do centro
            // do círculo e terá o tamanho de seu raio. Assim, quanto maior o círculo, maior a força.
            // A fim de sabermos qual é a frente do organismo, utilizaremos o vetor velocidade para nos auxiliar, 
            // já que ele está sempre apontando na direção do movimento do organismo.

            // CRIANDO O CÍRCULO
            var centro_circulo = new Vetor(0, 0); // Criamos um vetor que representará a distância do organismo ao centro do círculo
            centro_circulo = this.vel.copy(); // Isso é para que o círculo esteja exatamente à frente do organismo (como explicado um pouco acima)
            centro_circulo.normalize(); // Normalizamos o vetor, ou seja, seu tamanho agora é 1 (e não mais o tamanho do vetor velocidade, como era na linha acima)
            centro_circulo.mul(this.d_circulo); // A variável d_circulo é uma constante definida globalmente, e guarda o valor da distância do centro do círculo
            
            // CRIANDO A FORÇA DE DESLOCAMENTO
            var deslocamento = new Vetor(0, -1);
            deslocamento.mul(this.raio_circulo); // A força terá o tamanho do raio do círculo
            // Mudando a direção da força randomicamente
            deslocamento.rotateDegs(this.angulo_vagueio); // Rotaciona a força em angulo_vagueio (variável definida no construtor)
            // Mudando ligeiramente o valor de angulo_vagueio para que ele mude pouco a pouco a cada frame
            this.angulo_vagueio += Math.random() * 30 - 15; // Muda num valor entre -15 e 15
            
            // CRIANDO A FORÇA DE VAGUEIO
            // A força de vagueio pode ser pensada como um vetor que sai da posição do organismo e vai até um ponto
            // na circunferência do círculo que criamos
            // Agora que os vetores do centro do círculo e da força de deslocamento foram criados, basta somá-los
            // para criar a força de vagueio
            var forca_vagueio = new Vetor(0, 0);
            forca_vagueio = centro_circulo.add(deslocamento);
            
            if(this.comendo || this.fugindo){ // Diminui a força de vagueio quando vai comer ou fugir para dar prioridade a estas tarefas
                forca_vagueio.mul(0.03);
            }
            this.aplicaForca(forca_vagueio.mul(0.2));
        // }
    }

    // Método que calcula a força de redirecionamento em direção a um alvo
    // REDIRECIONAMENTO = VELOCIDADE DESEJADA - VELOCIDADE
    persegue(alvo){
        alvo.fugindo = true;
        // O vetor da velocidade desejada é o vetor de posição do alvo menos o da própria posição
        var vel_desejada = alvo.posicao.subNew(this.posicao); // Um vetor apontando da localização dele para o alvo
        // Amplia a velocidade desejada para a velocidade máxima
        vel_desejada.setMag(this.vel_max);

        // Redirecionamento = velocidade desejada - velocidade
        var redirecionamento = vel_desejada.subNew(this.vel);
        redirecionamento.limit(this.forca_max); // Limita o redirecionamento para a força máxima

        // Soma a força de redirecionamento à aceleração
        this.aplicaForca(redirecionamento);
    }

    // Método de comportamento reprodutivo sexuado para procurar parceiros próximos 
    procuraParceiros(){

    }

    // Método de comportamento reprodutivo sexuado para se aproximar do parceiro encontrado 
    aproximaDoParceiro(){
        // CHAMAR AQUI DENTRO O MÉTODO combinaDnas()
    }

    // Método de comportamento reprodutivo sexuado para randomicamente escolher genes do pai e da mãe
    combinaDnas(parceiro){
        var dnaFilho = [];

        // Raio inicial
        if(Math.random() < 0.5){
            dnaFilho.push(this.dna.raio_inicial)
        } else{
            dnaFilho.push(parceiro.dna.raio_inicial)
        }

        // Velocidade máxima
        if(Math.random() < 0.5){
            dnaFilho.push(this.dna.vel_max)
        } else{
            dnaFilho.push(parceiro.dna.vel_max)
        }

        // Força máxima
        if(Math.random() < 0.5){
            dnaFilho.push(this.dna.forca_max)
        } else{
            dnaFilho.push(parceiro.dna.forca_max)
        }

        // Cor
        if(Math.random() < 0.5){
            dnaFilho.push(this.dna.cor)
        } else{
            dnaFilho.push(parceiro.dna.cor)
        }

        // Raio detecção inicial
        if(Math.random() < 0.5){
            dnaFilho.push(this.dna.raio_deteccao_inicial)
        } else{
            dnaFilho.push(parceiro.dna.raio_deteccao_inicial)
        }

        // Intervalo ninhada
        if(Math.random() < 0.5){
            dnaFilho.push(this.dna.intervalo_ninhada)
        } else{
            dnaFilho.push(parceiro.dna.intervalo_ninhada)
        }

        // Sexo
        if(Math.random() < 0.5){
            dnaFilho.push(this.dna.sexo)
        } else{
            dnaFilho.push(parceiro.dna.sexo)
        }

        var dna_filho = new DNA(dnaFilho[0], dnaFilho[1], dnaFilho[2], dnaFilho[3], 
            dnaFilho[4], dnaFilho[5], dnaFilho[6])
        
        return dna_filho;
    }

    estaMorto(){
        return this.energia <= 0;
    }
    
    remove(lista) {
        var what, a = arguments, L = a.length, indice;
        while (L > 1 && lista.length) {
            what = a[--L];
            while ((indice = lista.indexOf(what)) !== -1) {
                lista.splice(indice, 1);
            }
        }
        return lista;
    }

    checaId(id){
        return (id == this.id);
    }
    
}