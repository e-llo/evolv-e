const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

const c = canvas.getContext('2d');
//x, y, raio, vel_max, forca_max, cor, raio_deteccao, energia, energia_max, taxa_gasto_energia, cansaco_max, taxa_aum_cansaco
var x = Math.random() * canvas.width;
var y = Math.random() * canvas.height;
var raio = 7;
var vel_max = 2.2; // Altere esse valor para ver o comportamento do bicho!
var forca_max = 0.1; // Altere esse valor para ver o comportamento do bicho!
var cor = geraCor();
var raio_deteccao = 100;
var energia = 100;
var energia_max = 100;
var taxa_gasto_energia = 0.1;
var cansaco_max = 9;
var taxa_aum_cansaco = 0.5;

const herbivoro = new Herbivoro(x, y, raio, vel_max, forca_max, cor, 
    raio_deteccao, energia, energia_max, taxa_gasto_energia, cansaco_max, taxa_aum_cansaco);

const herbivoro2 = new Herbivoro(x, y, raio, 2, 0.2, geraCor(), 
    70, energia, energia_max, taxa_gasto_energia, cansaco_max, taxa_aum_cansaco);


const carnivoro = new Carnivoro(canvas.width/2, canvas.height/2, raio, vel_max, forca_max, "red", 
    200, energia, energia_max, taxa_gasto_energia, cansaco_max, taxa_aum_cansaco);

const carnivoro_filho = carnivoro.reproduzir();


var alimentos = [];
var herbivoros = [];
// var carnivoros = [];

herbivoros.push(herbivoro, herbivoro2);
// carnivoros.push(carnivoro);

// Testando a criação de alimentos aleatórios
var n_alimentos = 100;
for(var i = 0; i < n_alimentos; i++){
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var raio = Math.random() * 1.5 + 1;

    alimentos.push(new Alimento(x, y, raio));
}


// --------------------------------------- Funções ----------------------------------------------
function geraCor(){
    // variáveis para a geração de cores
    var r = Math.floor(Math.random() * 256); 
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var cor = "rgb(" + r + "," + g + "," + b + ")";

    return cor;
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
    c.clearRect(0, 0, innerWidth, innerHeight);
    alimentos.forEach((alimento) => {
        alimento.display();
        // // console.log("alimento",alimento.posicao);
    })
    
    herbivoros.forEach((herbivoro) => {
        herbivoro.update();
        herbivoro.buscarAlimento(alimentos);
    })

    Carnivoro.carnivoros.forEach((carnivoro) => {
        carnivoro.update();
        carnivoro.buscarHerbivoro(herbivoros);
    })
    

}

 function drawEllipseWithQuatraticCurve(ctx, x, y, w, h, style) {

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
    if(style)
      ctx.strokeStyle = style;
    ctx.stroke();
    ctx.restore();
  }

animate();