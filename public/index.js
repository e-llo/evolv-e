const tela = {width: innerWidth - 8, height: innerHeight - 8}
const canvas = document.querySelector("canvas");
canvas.width = tela.width;
canvas.height = tela.height;


const c = canvas.getContext('2d');


// ------------------------------------------------------------------------------------
//                         Criação dos carnívoros
// ------------------------------------------------------------------------------------
var x = Math.random() * canvas.width;
var y = Math.random() * canvas.height;
var raio = Math.random() * 3 + 5;
var vel_max = Math.random() * 1.2 + 1; // Altere esse valor para ver o comportamento dos bichos!
var forca_max = Math.random()/5; // Altere esse valor para ver o comportamento do bicho!
var cor = geraCor();
var raio_deteccao = Math.random() * 50 + 120;
var energia_max = Math.random() * 100 + 80;
var taxa_gasto_energia = Math.random() / 80 + 0.002;
var cansaco_max = Math.random() * 50 + 20;
var taxa_aum_cansaco = Math.random() + 0.05;

const carnivoro = new Carnivoro(canvas.width/2, canvas.height/2, raio, vel_max, forca_max, cor, 
    raio_deteccao, energia_max, taxa_gasto_energia, cansaco_max, taxa_aum_cansaco);

const carnivoro_filho = carnivoro.reproduzir();


// ------------------------------------------------------------------------------------
//                    Criação de alimentos aleatórios no início
// ------------------------------------------------------------------------------------
var alimentos = [];
var n_alimentos = 150;
for(var i = 0; i < n_alimentos; i++){
    var x = Math.random() * (canvas.width - 20) + 10;
    var y = Math.random() * (canvas.height - 20) + 10;
    var raio = Math.random() + 1;

    alimentos.push(new Alimento(x, y, raio));
}
// cria mais alimentos ao longo do tempo
// a função setInterval() permite que ele chame o loop a cada x milisegundos
const novosAlimentos = setInterval(criaAlimentosGradativo, 100); //a cada 5 segundos ele joga os elementos


// ------------------------------------------------------------------------------------
//                     Criação da primeira getação de herbívoros
// ------------------------------------------------------------------------------------
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

var n_herbivoros = 15;

for(var i = 0; i < n_herbivoros; i++){
    x = Math.random() * canvas.width;
    y = Math.random() * canvas.height;
    raio = Math.random() * 3 + 4;
    vel_max = Math.random() * 1.2 + 1; // Altere esse valor para ver o comportamento dos bichos!
    forca_max = Math.random()/10 + 0.001; // Altere esse valor para ver o comportamento do bicho!
    cor = geraCor();
    raio_deteccao = Math.random() * 50 + 150;
    energia_max = Math.random() * 100 + 80
    taxa_gasto_energia = Math.random() / 80 + 0.002;
    cansaco_max = Math.random() * 50 + 20;
    taxa_aum_cansaco = Math.random() + 0.05;

    new Herbivoro(
        x, y, raio, vel_max, forca_max, cor, raio_deteccao, energia_max, taxa_gasto_energia,
        cansaco_max, taxa_aum_cansaco
    );
}



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

function corMutacao(colorStylePai) {
    let cores = [];
    colorStylePai.substring(4, colorStylePai.length - 1).split(',')
        .forEach(cor => {
            if(cor <= 10 ||  cor <= 246) { //não gerar números negativos
                cores.push(parseInt(cor) + Math.ceil(Math.random() * 10))
            } else {
                cores.push(parseInt(cor) - Math.ceil(Math.random() * 10))
            }
        });

    return `rgb(${cores[0]}, ${cores[1]}, ${cores[2]})`
}

function mutacao(porcent) { //porcentagem em decimal
    let calculo = ((Math.random() - 0.5) * porcent).toFixed(4);
    return parseFloat(calculo);
}

function newMutacao(valor, porcent) { //quanto menor a % menor a variação (em decimal)
    let calculo = (valor + mutacao(porcent)).toFixed(4);
    return parseFloat(calculo);
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    Alimento.alimentos.forEach((alimento) => {
        alimento.display();
        // // console.log("alimento",alimento.posicao);
    })
    
    Herbivoro.herbivoros.forEach(herbivoro => {
        herbivoro.update();
        herbivoro.buscarAlimento(Alimento.alimentos);
        herbivoro.detectaPredador(Carnivoro.carnivoros);
    })

    Carnivoro.carnivoros.forEach(carnivoro => {
        carnivoro.update();
        carnivoro.buscarHerbivoro(Herbivoro.herbivoros);
    })
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
    for(var i = 0; i < 1; i++){
        var x = Math.random() * (canvas.width - 20) + 10;
        var y = Math.random() * (canvas.height - 20) + 10;
        var raio = Math.random() * 1.5 + 1;
    
        if(Alimento.alimentos.length < 200){ // Limitador temporário para não sobrecarregar a simulação
            Alimento.alimentos.push(new Alimento(x, y, raio));
        }
        
    }
} 
