const tela = {width: innerWidth - 8, height: innerHeight - 8}
const canvas = document.querySelector("canvas");
canvas.width = tela.width;
canvas.height = tela.height;


const c = canvas.getContext('2d');



var x;
var y;
var raio;
var vel_max; // Altere esse valor para ver o comportamento do bicho!
var forca_max; // Altere esse valor para ver o comportamento do bicho!
var cor = geraCor();
var raio_deteccao;
var energia;
var energia_max;
var taxa_gasto_energia;
var cansaco_max;
var taxa_aum_cansaco;
var tempo_vida;



// ------------------------------------------------------------------------------------
//                         Criação dos carnívoros
// ------------------------------------------------------------------------------------

var n_carnivoros = 4;

for(var i = 0; i < n_carnivoros; i++){
    x = Math.random() * (canvas.width - 50) + 25;
    y = Math.random() * (canvas.height - 50) + 25;
    raio = Math.random() * 3 + 4;
    vel_max = Math.random() * 1.2 + 1; // Altere esse valor para ver o comportamento dos bichos!
    forca_max = Math.random()/20 + 0.001; // Altere esse valor para ver o comportamento do bicho!
    cor = geraCor();
    raio_deteccao = Math.random() * 50 + 40;
    energia_max = Math.random() * 100 + 80
    taxa_gasto_energia = Math.random() / 20 + 0.005;
    cansaco_max = Math.random() * 50 + 20;
    taxa_aum_cansaco = Math.random() + 0.05;
    tempo_vida = Math.random()*30000+40000;

    new Carnivoro(
        x, y, raio, vel_max, forca_max, cor, raio_deteccao, energia_max, taxa_gasto_energia,
        cansaco_max, taxa_aum_cansaco, tempo_vida
    );
}


// ------------------------------------------------------------------------------------
//                     Criação da primeira getação de herbívoros
// ------------------------------------------------------------------------------------


var n_herbivoros = 40;

for(var i = 0; i < n_herbivoros; i++){
    x = Math.random() * (canvas.width - 50) + 25;
    y = Math.random() * (canvas.height - 50) + 25;
    raio = Math.random() * 3 + 4;
    vel_max = Math.random() * 1.2 + 1; // Altere esse valor para ver o comportamento dos bichos!
    forca_max = Math.random()/20 + 0.001; // Altere esse valor para ver o comportamento do bicho!
    cor = geraCor();
    raio_deteccao = Math.random() * 50 + 50;
    energia_max = Math.random() * 100 + 80
    taxa_gasto_energia = Math.random() / 20 + 0.005;
    cansaco_max = Math.random() * 50 + 20;
    taxa_aum_cansaco = Math.random() + 0.05;
    tempo_vida = 10000;

    new Herbivoro(
        x, y, raio, vel_max, forca_max, cor, raio_deteccao, energia_max,
        cansaco_max, taxa_aum_cansaco, tempo_vida
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
    let cores = [];
    estilo.substring(4, estilo.length - 1) // remover os caracteres de texto. ex: "rgb(256,20,40)"
        .split(',') // retornar um array com os elementos separados por virgula. ex: 256,20,40
        .forEach(cor => { //pegar cada elemento do array e fazer os cálculos a seguir
            if(cor <= 10) { //para não gerar números negativos
                cores.push(parseInt(cor) + Math.ceil(Math.random() * 10))
            } else if(cor >= 246) { //para não gerar valores maiores que 256
                cores.push(parseInt(cor) - Math.ceil(Math.random() * 10))

            } else { //randomiza se vai ser add ou subtraido valores caso a cor estiver entre 10 e 246
                if(Math.random() < 0.5) {
                    cores.push(parseInt(cor) + Math.ceil(Math.random() * 10))
                } else {
                    cores.push(parseInt(cor) - Math.ceil(Math.random() * 10)) // salva o valor novo no array cores
                }
            }
        });

    return `rgb(${cores[0]}, ${cores[1]}, ${cores[2]})`
}

function mutacao(porcent) { //porcentagem em decimal
    let calculo = ((Math.random() - 0.5) * porcent).toFixed(4);
    return parseFloat(calculo);
}

function newMutacao(valor, porcent) { //quanto menor a % menor a variação (em decimal)
    //o valor_minimo é um parametro opcional, que se não for definido na chamada da função recebe o valor 0.
    let calculo = (valor + mutacao(porcent)).toFixed(4);
    // if(calculo <= valor_minimo) {
    //     return newMutacao(valor, porcent, valor_minimo);
    // }
    return parseFloat(calculo);
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

        Alimento.alimentos.push(new Alimento(x, y, raio));
        // if(Alimento.alimentos.length < 200){ // Limitador para não sobrecarregar a simulação
        //     Alimento.alimentos.push(new Alimento(x, y, raio));
        // }
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
