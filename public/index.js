

const tela = {width: innerWidth - 500, height: innerHeight - 8}
const canvas = document.querySelector("canvas");
canvas.width = tela.width;
canvas.height = tela.height;


const c = canvas.getContext('2d');

var iniciar;
var x;
var y;
var raio;
var raio_min;
var vel_max; // Altere esse valor para ver o comportamento do bicho!
var forca_max; // Altere esse valor para ver o comportamento do bicho!
var cor = geraCor();
var raio_deteccao_min;
var raio_deteccao;
var energia;
var energia_max;
var taxa_gasto_energia;
var cansaco_max;
var taxa_aum_cansaco;
var tempo_vida_min;
var tempo_vida_max;
var fome_c = 0.9; // porcentagem da energia máxima acima da qual eles não comerão
var fome_h = 0.9; // porcentagem da energia máxima acima da qual eles não comerão



function criaObjetos(n_carnivoros, n_herbivoros, n_alimentos){
    for(var i = 0; i < n_carnivoros; i++){
        geraCarnivoro();
    }
    for(var i = 0; i < n_herbivoros; i++){
        geraHerbivoro(); 
    }
    for(var i = 0; i < n_alimentos; i++){
        geraAlimento();
    }
}

function destroiObjetos(){
    Carnivoro.carnivoros.length = 0;
    Herbivoro.herbivoros.length = 0;
    Alimento.alimentos.length = 0;
    hora = minuto = segundo = milisegundo = segundos = 0;

    //limpar o cronometro se ele existe.
    try {
        clearInterval(cronometro);
    } catch(e){}
}

// cria mais alimentos ao longo do tempo
// a função setInterval() permite que ele chame o loop a cada x milisegundos
var intervaloTaxaAlimentos;

// variáveis de auxílio para a implementação da divisão de tela
var checkbox_divisao = document.getElementById('divisao');
var telaDividida;
var limitador_de_loop = 0;


// ----------------------------------------------------------------------------------------------
//                                         Funções
// ----------------------------------------------------------------------------------------------
function geraAlimento(){
    var x = Math.random() * (canvas.width - 50) + 25;
    var y = Math.random() * (canvas.height - 50) + 25;
    var raio = Math.random() + 1;

    Alimento.alimentos.push(new Alimento(x, y, raio));
}


function geraCarnivoro(){ // função para poder adicionar mais carnívoros manualmente
    x = Math.random() * (canvas.width - 50) + 25;
    y = Math.random() * (canvas.height - 50) + 25;
    raio_min = Math.random() * 3 + 4;
    vel_max = Math.random() * 1.2 + 1; 
    forca_max = Math.random()/20 + 0.001; 
    cor = geraCor();
    raio_deteccao_min = Math.random() * 50 + 40;
    energia_max = Math.random() * 100 + 80
    taxa_gasto_energia = Math.random() / 20 + 0.005;
    cansaco_max = Math.random() * 50 + 20;
    taxa_aum_cansaco = Math.random() + 0.05;
    tempo_vida_min = 80000;
    tempo_vida_max = 140000;

    new Carnivoro(
        x, y, raio_min, vel_max, forca_max, cor, raio_deteccao_min, energia_max, taxa_gasto_energia,
        cansaco_max, tempo_vida_min, tempo_vida_max
    );
}


function geraHerbivoro(){ // função para poder adicionar mais herbivoros manualmente
    x = Math.random() * (canvas.width - 50) + 25;
    y = Math.random() * (canvas.height - 50) + 25;    
    raio_min = Math.random() * 3 + 4;
    vel_max = Math.random() * 1.2 + 1; // Altere esse valor para ver o comportamento dos bichos!
    forca_max = Math.random()/20 + 0.001; // Altere esse valor para ver o comportamento do bicho!
    cor = geraCor();
    raio_deteccao_min = Math.random() * 50 + 50;
    energia_max = Math.random() * 100 + 80;
    taxa_gasto_energia = Math.random() / 20 + 0.005;
    cansaco_max = Math.random() * 50 + 20;
    taxa_aum_cansaco = Math.random() + 0.05;
    tempo_vida_min = 80000;
    tempo_vida_max = 140000;

    new Herbivoro(
        x, y, raio_min, vel_max, forca_max, cor, raio_deteccao_min, energia_max,
        cansaco_max, taxa_aum_cansaco, tempo_vida_min, tempo_vida_max
    );
}


function geraCor(){
    // variáveis para a geração de cores
    var r = Math.floor(Math.random() * 256); 
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var cor = "rgb(" + r + "," + g + "," + b + ")";

    return cor;
}

function corMutacao(estilo) {
    let cores = estilo.substring(4, estilo.length - 1) // remover os caracteres de texto. ex: "rgb(256,20,40)"
        .split(',') // retornar um array com os elementos separados por virgula. ex: 256,20,40
        .map(function(cor) { //pegar cada elemento do array e fazer os cálculos a seguir
            cor = parseInt(cor);
            let operacao = "";

            if(cor <= 10) { //para não gerar números negativos
                operacao = "adicao"
            } else if(cor >= 246) { //para não gerar valores maiores que 256
                operacao = "subtracao"

            } else { //randomiza se vai ser add ou subtraido valores caso a cor estiver entre 10 e 246
                if(Math.random() < 0.5) {
                    operacao = "adicao"
                } else {
                    operacao = "subtracao"
                }
            }

            if(operacao == "adicao") {
                return cor + Math.ceil(Math.random() * 10)
            } else { //subtração
                return cor - Math.ceil(Math.random() * 10)
            }
        });

    return `rgb(${cores[0]}, ${cores[1]}, ${cores[2]})`
}

function newMutacao(valor, porcent) {// exemplo: valor = 20;  porcent = 0.1 || 10%
    let variacao = valor * porcent; //  variacao = 20 * 0.1 = 2, ou seja, poderá variar de +2 a -2 no resultado
    let minimo = valor - variacao;  //  minimo = 20 - 2 = 18. Para que não precise sub-dividir o return em adição ou subtração
    variacao *= 2                   //  puxo o ponto de referência para o menor valor possível. Logo, o resultado variará de
                                    //  0 a +4, afinal a distância de 2 até -2 é 4.
    if(minimo <= 0) {
        minimo = valor;
    }
    return minimo + Math.random() * variacao; // 18 + Math.randon() * 4. O resultado estará entre o intervalo [18, 22]
}

function geraNumeroPorIntervalo(min, max) {
    let delta = max - min; // exemplo: 4000 e 6000. 6000 - 4000 = 2000
    return (Math.random() * delta + min).toFixed(0); // Math.random() * 2000 + 4000
}

function criaAlimentosGradativo(){
    for(var i = 0; i < 2; i++){
        var x = Math.random() * (canvas.width - 62) + 31;
        var y = Math.random() * (canvas.height - 62) + 31;
        var raio = Math.random() * 1.5 + 1;

        if(Alimento.alimentos.length < 2000){ // Limitador para não sobrecarregar a simulação
            Alimento.alimentos.push(new Alimento(x, y, raio));
        }
    }
}

function mudaIntervaloAlimentos(novoTempo, criar=false) {
    if(!criar) {
        clearInterval(intervaloTaxaAlimentos);
    }
    if(novoTempo > 1000) return;
    intervaloTaxaAlimentos = setInterval(criaAlimentosGradativo, novoTempo)
}

function desenhaDivisao(){
    c.beginPath();
    c.moveTo(canvas.width / 2, 0);
    c.lineTo(canvas.width / 2, canvas.height);
    c.strokeStyle = "black";
    c.stroke();
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    if(checkbox_divisao.checked){
        telaDividida = true;
    } else{
        telaDividida = false;
    }

    if(telaDividida){
        desenhaDivisao();

        Alimento.alimentos.forEach((alimento, i) => {
            alimento.display();
            // remove alimentos próximos da divisão para evitar que organismos se atraiam para perto dela
            if(alimento.posicao.x - canvas.width / 2 < 30 && alimento.posicao.x - canvas.width / 2 > -30){ 
                Alimento.alimentos.splice(i, 1);
            }
        })

        if(limitador_de_loop < 10){
            limitador_de_loop++;
        }
        
        Organismo.organismos.forEach((organismo) => {
            if(organismo.posicao.x <= canvas.width/2){ // se o organismo estiver na parte esquerda
                if(limitador_de_loop == 1 && canvas.width/2 - organismo.posicao.x < 10){ // empurra os organismos pertos da borda para o lado
                    organismo.posicao.x -= 10;
                }
                organismo.criaBordas(true); // telaDividida: true
            } else{ // se o organismo estiver na parte direita
                if(limitador_de_loop == 1 && organismo.posicao.x - canvas.width/2 < 10){ // empurra os organismos pertos da borda para o lado
                    organismo.posicao.x += 10;
                }
                organismo.criaBordas(true); // telaDividida: true
            }
        })


        Herbivoro.herbivoros.forEach(herbivoro => {
            herbivoro.update();
            herbivoro.vagueia();
            if(herbivoro.energia <= fome_h * herbivoro.energia_max){ // Não come se estiver bem alimentado  
                herbivoro.buscarAlimento(Alimento.alimentos);
            }
            herbivoro.detectaPredador(Carnivoro.carnivoros);
        })
    
        Carnivoro.carnivoros.forEach(carnivoro => {
            carnivoro.update();
            carnivoro.vagueia();
            if(carnivoro.energia <= fome_c * carnivoro.energia_max){ // Não come se estiver bem alimentado  
                carnivoro.buscarHerbivoro(Herbivoro.herbivoros);
            }
        })

    } else{ // se a tela não estiver dividida

        limitador_de_loop = 0;

        Alimento.alimentos.forEach(alimento => {
            alimento.display();
        })

        Organismo.organismos.forEach((organismo) => {
            organismo.criaBordas(false); // telaDividida: false
        })

        Herbivoro.herbivoros.forEach(herbivoro => {
            herbivoro.update();
            herbivoro.vagueia();
            if(herbivoro.energia <= fome_h * herbivoro.energia_max){ // Não come se estiver bem alimentado  
                herbivoro.buscarAlimento(Alimento.alimentos);
            }
            herbivoro.detectaPredador(Carnivoro.carnivoros);
        })
    
        Carnivoro.carnivoros.forEach(carnivoro => {
            carnivoro.update();
            carnivoro.vagueia();
            if(carnivoro.energia <= fome_c * carnivoro.energia_max){ // Não come se estiver bem alimentado  
                carnivoro.buscarHerbivoro(Herbivoro.herbivoros, false);
            }
        })
    }
}

// ----------------------------------------------------------------------------------------------
//                                         Cronômetro
// ----------------------------------------------------------------------------------------------
function criaCronometro(){
    var cronometro = setInterval(() => { timer(); }, 10);
}

function timer() {
    if ((milisegundo += 10) == 1000) {
      milisegundo = 0;
      segundo++;
      segundos++;
    }
    if (segundo == 60) {
      segundo = 0;
      minuto++;
    }
    if (minuto == 60) {
      minuto = 0;
      hora++;
    }
    document.getElementById('hora').innerText = returnData(hora);
    document.getElementById('minuto').innerText = returnData(minuto);
    document.getElementById('segundo').innerText = returnData(segundo);
    document.getElementById('milisegundo').innerText = returnData(milisegundo);
}
  
function returnData(input) {
    return input > 10 ? input : `0${input}`
}