// import Organismo from Organismo.js;
// import Carnivoro from Carnivoro.js;

const tela = {width: innerWidth - 400, height: innerHeight - 8}
const canvas = document.querySelector("canvas");
canvas.width = tela.width;
canvas.height = tela.height;


const c = canvas.getContext('2d');



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



// ------------------------------------------------------------------------------------
//                         Criação dos carnívoros
// ------------------------------------------------------------------------------------

var n_carnivoros = 10;

for(var i = 0; i < n_carnivoros; i++){
    x = Math.random() * (canvas.width - 50) + 25;
    y = Math.random() * (canvas.height - 50) + 25;
    raio_min = Math.random() * 3 + 4;
    vel_max = Math.random() * 1.2 + 1; // Altere esse valor para ver o comportamento dos bichos!
    forca_max = Math.random()/20 + 0.001; // Altere esse valor para ver o comportamento do bicho!
    cor = geraCor();
    raio_deteccao_min = Math.random() * 50 + 40;
    energia_max = Math.random() * 100 + 80
    taxa_gasto_energia = Math.random() / 20 + 0.005;
    cansaco_max = Math.random() * 50 + 20;
    taxa_aum_cansaco = Math.random() + 0.05;
    tempo_vida_min = 20000;
    tempo_vida_max = 40000;

    new Carnivoro(
        x, y, raio_min, vel_max, forca_max, cor, raio_deteccao_min, energia_max, taxa_gasto_energia,
        cansaco_max, tempo_vida_min, tempo_vida_max
    );
}


// ------------------------------------------------------------------------------------
//                     Criação da primeira geração de herbívoros
// ------------------------------------------------------------------------------------


var n_herbivoros = 40;

for(var i = 0; i < n_herbivoros; i++){
    x = Math.random() * (canvas.width - 50) + 25;
    y = Math.random() * (canvas.height - 50) + 25;
    raio_min = Math.random() * 3 + 4;
    vel_max = Math.random() * 1.2 + 1; // Altere esse valor para ver o comportamento dos bichos!
    forca_max = Math.random()/20 + 0.001; // Altere esse valor para ver o comportamento do bicho!
    cor = geraCor();
    raio_deteccao_min = Math.random() * 50 + 50;
    energia_max = Math.random() * 100 + 80
    taxa_gasto_energia = Math.random() / 20 + 0.005;
    cansaco_max = Math.random() * 50 + 20;
    taxa_aum_cansaco = Math.random() + 0.05;
    tempo_vida_min = 20000;
    tempo_vida_max = 40000;

    new Herbivoro(
        x, y, raio_min, vel_max, forca_max, cor, raio_deteccao_min, energia_max,
        cansaco_max, taxa_aum_cansaco, tempo_vida_min, tempo_vida_max
    );
}


// ------------------------------------------------------------------------------------
//                    Criação de alimentos aleatórios no início
// ------------------------------------------------------------------------------------
var alimentos = [];
var n_alimentos = 150;
for(var i = 0; i < n_alimentos; i++){
    var x = Math.random() * (canvas.width - 50) + 25;
    var y = Math.random() * (canvas.height - 50) + 25;
    var raio = Math.random() + 1;

    alimentos.push(new Alimento(x, y, raio));
}
// cria mais alimentos ao longo do tempo
// a função setInterval() permite que ele chame o loop a cada x milisegundos
const novosAlimentos = setInterval(criaAlimentosGradativo, 80); 


animate();

// ----------------------------------------------------------------------------------------------
//                                         Funções
// ----------------------------------------------------------------------------------------------

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

function desenhaOval(ctx, x, y, w, h, style) {

    var kappa = .5522848,
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = x + w,           // x-end
        ye = y + h,           // y-end
        xm = x + w / 2,       // x-middle
        ym = y + h / 2;       // y-middle

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.quadraticCurveTo(x,y,xm,y);
    ctx.quadraticCurveTo(xe,y,xe,ym);
    ctx.quadraticCurveTo(xe,ye,xm,ye);
    ctx.quadraticCurveTo(x,ye,x,ym);
    ctx.restore();
    }

function criaAlimentosGradativo(){
    for(var i = 0; i < 2; i++){
        var x = Math.random() * (canvas.width - 50) + 25;
        var y = Math.random() * (canvas.height - 50) + 25;
        var raio = Math.random() * 1.5 + 1;

        if(Alimento.alimentos.length < 2000){ // Limitador para não sobrecarregar a simulação
            Alimento.alimentos.push(new Alimento(x, y, raio));
        }
    }
} 

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    Alimento.alimentos.forEach((alimento) => {
        alimento.display();
    })
    
    Herbivoro.herbivoros.forEach(herbivoro => {
        herbivoro.update();
        herbivoro.vagueia();
        herbivoro.buscarAlimento(Alimento.alimentos);
        herbivoro.detectaPredador(Carnivoro.carnivoros);
    })

    Carnivoro.carnivoros.forEach(carnivoro => {
        carnivoro.update();
        carnivoro.vagueia();
        carnivoro.buscarHerbivoro(Herbivoro.herbivoros);
    })
}

// ----------------------------------------------------------------------------------------------
//                                         Cronômetro
// ----------------------------------------------------------------------------------------------
var cronometro = setInterval(() => { timer(); }, 10);

function timer() {
    if ((milisegundo += 10) == 1000) {
      milisegundo = 0;
      segundo++;
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