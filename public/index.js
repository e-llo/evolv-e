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
var raio_deteccao = 50;
var energia = 100;
var energia_max = 100;
var taxa_gasto_energia = 0.1;
var cansaco_max = 9;
var taxa_aum_cansaco = 0.5;

const herbivoro = new Herbivoro(x, y, raio, vel_max, forca_max, cor, 
    raio_deteccao, energia, energia_max, taxa_gasto_energia, cansaco_max, taxa_aum_cansaco);

const herbivoro2 = new Herbivoro(x, y, raio, 2, 0.2, geraCor(), 
    raio_deteccao, energia, energia_max, taxa_gasto_energia, cansaco_max, taxa_aum_cansaco);
// const carnivoro = new Carnivoro(100, 200, 7, 15, 6, 20, 3, "rosa", 8, 13, 18, 1, 9, 0.5);

// console.log("\n\n------------ Herbívoro -------------\n\n");
// console.log(herbivoro);

// var clone_herbivoro = herbivoro1.reproduzir();
// console.log("\n\n------------ Clone do herbívoro -------------\n\n");
// console.log(clone_herbivoro);

// console.log("\n\n------------ Carnívoro -------------\n\n");
// console.log(carnivoro1);

// var clone_carnivoro = carnivoro1.reproduzir();
// console.log("\n\n------------ Clone do carnívoro -------------\n\n");
// console.log(clone_carnivoro);


var alimentos = [];

// Testando a criação de alimentos aleatórios
var n_alimentos = 150;
for(var i = 0; i < n_alimentos; i++){
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var raio = Math.random() * 1.5 + 1;

    alimentos.push(new Alimento(x, y, raio));
}

// // Testando a criação de alimentos aleatórios
//     var x1 = 100;
//     var y1 = 100;
//     var x2 = 200;
//     var y2 = 200;
//     var raio = Math.random() * 1.5 + 1;

//     var alimento1 = new Alimento(x1, y1, raio);
//     var alimento2 = new Alimento(x2, y2, raio);
//     alimentos.push(alimento1, alimento2);


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
    let calculo = ((Math.random() - 0.5) / (1 / porcent)).toFixed(4);
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
        console.log("alimento",alimento.posicao);
    })
    
    herbivoro.update();
    herbivoro2.update();
    herbivoro.comerAlimento(alimentos);
    herbivoro2.comerAlimento(alimentos);
    console.log(alimentos);
}


animate();