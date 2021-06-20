const tela = {width: innerWidth - 500, height: innerHeight - 8}
const canvas = document.querySelector("canvas");
canvas.width = tela.width;
canvas.height = tela.height;

const c = canvas.getContext('2d');

var mudarGrafico = false;
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


// Variáveis para o gráfico (herbívoro)
var velMedH = 0;
var forcaMedH = 0;
var raioMedH = 0;
var raioDetMedH = 0;
var energMedH = 0;
var taxaEnergMedH = 0;

// Variáveis para o gráfico (carnívoro)
var velMedC = 0;
var forcaMedC = 0;
var raioMedC = 0;
var raioDetMedC = 0;
var energMedC = 0;
var taxaEnergMedC = 0;

// Variável para calcular frame rate (usada no animate())
var lastLoop = new Date();

// QuadTree
let retanguloCanvas = new Retangulo(canvas.width/2, canvas.height/2, canvas.width/2, canvas.height/2);

// // Criação da QuadTree
// // Criando o primeiro retângulo (com centro no centro do canvas, e os valores de w e h são a distância do centro até a borda)
// let limite = new Retangulo(canvas.width/2, canvas.height/2, canvas.width/2, canvas.height/2);
// let qtree = new QuadTree(limite, 4);

// criaPontos();
// desenhaQuadTree();


let ret = new Retangulo(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 250 + 10, Math.random() * 250 + 10);
let cir = new Circulo(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 200 + 10);

// desenhando o retangulo
c.beginPath();
c.lineTo(ret.x - ret.w, ret.y - ret.h);
c.lineTo(ret.x + ret.w, ret.y - ret.h);
c.lineTo(ret.x + ret.w, ret.y + ret.h);
c.lineTo(ret.x - ret.w, ret.y + ret.h);
c.lineTo(ret.x - ret.w, ret.y - ret.h);
c.strokeStyle = "red";
c.stroke();

// desenhando o circulo
c.beginPath();
c.arc(cir.x, cir.y, cir.r, 0, Math.PI * 2);
c.strokeStyle = "yellow";
c.stroke();

// testando o método interceptaC()
// console.log(ret.interseptaC(cir));

// ---------------------------------------------------------------------------------------
//                                  FUNÇÕES
// ---------------------------------------------------------------------------------------

function criaObjetos(n_carnivoros, n_herbivoros, n_alimentos){
    for(var i = 0; i < n_carnivoros; i++){
        var x =(Math.random() * (canvas.width - 50) + 25);
        var y = (Math.random() * (canvas.height - 50) + 25);
        geraCarnivoro(x,y);
    }
    for(var i = 0; i < n_herbivoros; i++){
        var x =(Math.random() * (canvas.width - 50) + 25);
        var y = (Math.random() * (canvas.height - 50) + 25);
        geraHerbivoro(x,y);    
    }
    for(var i = 0; i < n_alimentos; i++){
        var x =(Math.random() * (canvas.width - 50) + 25);
        var y = (Math.random() * (canvas.height - 50) + 25);
        geraAlimento(x,y);
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





function geraAlimento(x,y){
    var raio = Math.random() + 1;
    new Alimento(x, y, raio);
}


function geraCarnivoro(x,y){ // função para poder adicionar mais carnívoros manualmente 
    raio_min = Math.random() * 3 + 4;
    vel_max = Math.random() * 1.2 + 1; 
    forca_max = Math.random()/20 + 0.001; 
    cor = geraCor();
    raio_deteccao_min = Math.random() * 50 + 40;
    energia_max = Math.random() * 100 + 80
    cansaco_max = Math.random() * 50 + 20;
    taxa_aum_cansaco = Math.random() + 0.05;
    tempo_vida_min = 80000;
    tempo_vida_max = 140000;

    new Carnivoro(
        x, y, raio_min, vel_max, forca_max, cor, raio_deteccao_min, energia_max,
        cansaco_max, taxa_aum_cansaco, tempo_vida_min, tempo_vida_max
    );
}


function geraHerbivoro(x,y){ // função para poder adicionar mais herbivoros manualmente    
    raio_min = Math.random() * 3 + 4;
    vel_max = Math.random() * 1.2 + 1; // Altere esse valor para ver o comportamento dos bichos!
    forca_max = Math.random()/20 + 0.001; // Altere esse valor para ver o comportamento do bicho!
    cor = geraCor();
    raio_deteccao_min = Math.random() * 50 + 50;
    energia_max = Math.random() * 100 + 80;
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
            let p = Math.random();

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
                if(p < 0.005){ // Há 0.5% de chance de a mutação ser grande
                    return cor + Math.ceil(Math.random() * 100)
                } else if(p < 0.015){ // Há 1% de chance (1.5% - o 0.5% do if anterior) de a mutação ser razoavelmente grande
                    return cor + Math.ceil(Math.random() * 50)
                } else if(p < 0.05){ // Há 3.5% de chance (5% - o 1.5% do if anterior) de a mutação ser razoável
                    return cor + Math.ceil(Math.random() * 30)
                } else{
                    return cor + Math.ceil(Math.random() * 10)
                }
                
            } else { //subtração
                if(p < 0.005){ // Há 0.5% de chance de a mutação ser grande
                    return cor - Math.ceil(Math.random() * 100)
                } else if(p < 0.015){ // Há 1% de chance (1.5% - o 0.5% do if anterior) de a mutação ser razoavelmente grande
                    return cor - Math.ceil(Math.random() * 50)
                } else if(p < 0.05){ // Há 3.5% de chance (5% - o 1.5% do if anterior) de a mutação ser razoável
                    return cor - Math.ceil(Math.random() * 30)
                } else{
                    return cor - Math.ceil(Math.random() * 10)
                }
            }
        });

    return `rgb(${cores[0]}, ${cores[1]}, ${cores[2]})`
}

function newMutacao(valor, porcent) {// exemplo: valor = 20;  porcent = 0.1 || 10%
    let p = Math.random();
    let variacao = valor * porcent; //  variacao = 20 * 0.1 = 2, ou seja, poderá variar de +2 a -2 no resultado
    if(p < 0.005){ // Há 0.5% de chance de a mutação ser grande
        variacao *= 6;
    } else if(p < 0.015){ // Há 1% de chance (1.5% - o 0.5% do if anterior) de a mutação ser razoavelmente grande
        variacao *= 3;
    } else if(p < 0.05){ // Há 3.5% de chance (5% - o 1.5% do if anterior) de a mutação ser razoável
        variacao *= 1.8;
    }
    
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
            new Alimento(x, y, raio);
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

function desenhaQuadTree(qtree){
    qtree.desenha();

    // document.addEventListener('mousemove', (event) => {
    //     console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
    // });

    let alcance = new Retangulo(Math.random() * canvas.width, Math.random() * canvas.height, 170, 123);
    c.rect(alcance.x - alcance.w, alcance.y - alcance.h, alcance.w*2, alcance.h*2);
    c.strokeStyle = "green";
    c.lineWidth = 3;
    c.stroke();

    let pontos = qtree.procura(alcance);
    for(let p of pontos){
        c.beginPath();
        c.arc(p.x, p.y, 1, 0, 2 * Math.PI);
        c.strokeStyle = "red";
        c.stroke();
    }
}

function criaPontos(){
    let congregacao = new Ponto(Math.random() * canvas.width, Math.random() * canvas.height);
    
    for(var i = 0; i < 500; i++){
        let p = new Ponto(Math.random() * canvas.width, Math.random() * canvas.height);
        qtree.inserirPonto(p);
    }
    for(var i = 0; i < 300; i++){
        let p = new Ponto(congregacao.x + (Math.random() - 0.5) * 300, congregacao.y + (Math.random() - 0.5) * 300);
        qtree.inserirPonto(p);
    }
    for(var i = 0; i < 400; i++){
        let p = new Ponto(congregacao.x + (Math.random() - 0.5) * 600, congregacao.y + (Math.random() - 0.5) * 600);
        qtree.inserirPonto(p);
    }
    for(var i = 0; i < 400; i++){
        let p = new Ponto(congregacao.x + (Math.random() - 0.5) * 800, congregacao.y + (Math.random() - 0.5) * 800);
        qtree.inserirPonto(p);
    }
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calcula frame rate
    var thisFrameTime = (thisLoop=new Date) - lastLoop;
    frameTime+= (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;

    // Criando a Quadtree
    let qtree = new QuadTree(retanguloCanvas, 5);
    // console.log(qtree);

    // Divisão de tela
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

            qtree.inserirAlimento(alimento); // Insere o alimento na QuadTree

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

        // Inserindo os organismos na QuadTree antes de chamar os métodos de cada um
        Herbivoro.herbivoros.forEach(herbivoro => {
            qtree.inserirHerbivoro(herbivoro); // Insere o herbivoro na QuadTree
        });
        Carnivoro.carnivoros.forEach(carnivoro => {
            qtree.inserirCarnivoro(carnivoro); // Insere o carnivoro na QuadTree
        });

        // resetando
        velMedH = 0;
        forcaMedH = 0;
        raioMedH = 0;
        raioDetMedH = 0;
        energMedH = 0;
        taxaEnergMedH = 0;

        Herbivoro.herbivoros.forEach(herbivoro => {
            herbivoro.update();
            herbivoro.vagueia();

            // Transforma o raio de detecção em um objeto círculo para podermos manipulá-lo
            let visaoH = new Circulo(herbivoro.posicao.x, herbivoro.posicao.y, herbivoro.raio_deteccao);
                        
            herbivoro.buscarAlimento(qtree, visaoH);
            herbivoro.detectaPredador(qtree, visaoH);

            // Soma o valor das variáveis pra todos os herbívoros
            velMedH += herbivoro.vel_max;
            forcaMedH += herbivoro.forca_max;
            raioMedH += herbivoro.raio_min * 1.5; // o raio máximo é 1.5 * o mínimo
            raioDetMedH += herbivoro.raio_deteccao_min; // não há ainda uma fórmula que relaciona o mín e o máx
            energMedH += herbivoro.energia_max;
            taxaEnergMedH += herbivoro.taxa_gasto_energia_max;
        })

        // Divide o valor (a soma total) pelo número de herbívoros para obter a média
        velMedH /= Herbivoro.herbivoros.length;
        forcaMedH /= Herbivoro.herbivoros.length;
        raioMedH /= Herbivoro.herbivoros.length;
        raioDetMedH /= Herbivoro.herbivoros.length;
        energMedH /= Herbivoro.herbivoros.length;
        taxaEnergMedH /= Herbivoro.herbivoros.length;


        // resetando
        velMedC = 0;
        forcaMedC = 0;
        raioMedC = 0;
        raioDetMedC = 0;
        energMedC = 0;
        taxaEnergMedC = 0;

        Carnivoro.carnivoros.forEach(carnivoro => {
            carnivoro.update();
            carnivoro.vagueia();

            // Transforma o raio de detecção em um objeto círculo para podermos manipulá-lo
            let visaoC = new Circulo(carnivoro.posicao.x, carnivoro.posicao.y, carnivoro.raio_deteccao);

            carnivoro.buscarHerbivoro(qtree, visaoC, false);

            // Soma o valor das variáveis pra todos os carnívoros
            velMedC += carnivoro.vel_max;
            forcaMedC += carnivoro.forca_max;
            raioMedC += carnivoro.raio_min * 1.5; // o raio máximo é 1.5 * o mínimo
            raioDetMedC += carnivoro.raio_deteccao_min; // não há ainda uma fórmula que relaciona o mín e o máx
            energMedC += carnivoro.energia_max;
            taxaEnergMedC += carnivoro.taxa_gasto_energia_max;
        })
         
        // Divide o valor (a soma total) pelo número de carnívoros para obter a média
        velMedC /= Carnivoro.carnivoros.length;
        forcaMedC /= Herbivoro.herbivoros.length;
        raioMedC /= Carnivoro.carnivoros.length;
        raioDetMedC /= Carnivoro.carnivoros.length;
        energMedC /= Carnivoro.carnivoros.length;
        taxaEnergMedC /= Carnivoro.carnivoros.length;

    } else{ // se a tela NÃO estiver dividida
        limitador_de_loop = 0;

        Alimento.alimentos.forEach(alimento => {
            alimento.display();
            qtree.inserirAlimento(alimento); // Insere o alimento na QuadTree

        })

        Organismo.organismos.forEach((organismo) => {
            organismo.criaBordas(false); // telaDividida: false
            // organismo.timer_reproducao++;
        })

        // Inserindo os organismos na QuadTree antes de chamar os métodos de cada um
        Herbivoro.herbivoros.forEach(herbivoro => {
            qtree.inserirHerbivoro(herbivoro); // Insere o herbivoro na QuadTree
        });
        Carnivoro.carnivoros.forEach(carnivoro => {
            qtree.inserirCarnivoro(carnivoro); // Insere o carnivoro na QuadTree
        });

        // resetando
        velMedH = 0;
        forcaMedH = 0;
        raioMedH = 0;
        raioDetMedH = 0;
        energMedH = 0;
        taxaEnergMedH = 0;
        
        Herbivoro.herbivoros.forEach(herbivoro => {
            herbivoro.update();
            herbivoro.vagueia();
            
            // Transforma o raio de detecção em um objeto círculo para podermos manipulá-lo
            let visaoH = new Circulo(herbivoro.posicao.x, herbivoro.posicao.y, herbivoro.raio_deteccao);
            
            herbivoro.buscarAlimento(qtree, visaoH);
            herbivoro.detectaPredador(qtree, visaoH);

            // Soma o valor das variáveis pra todos os herbívoros
            velMedH += herbivoro.vel_max;
            forcaMedH += herbivoro.forca_max;
            raioMedH += herbivoro.raio_min * 1.5; // o raio máximo é 1.5 * o mínimo
            raioDetMedH += herbivoro.raio_deteccao_min; // não há ainda uma fórmula que relaciona o mín e o máx
            energMedH += herbivoro.energia_max;
            taxaEnergMedH += herbivoro.taxa_gasto_energia_max;
        })

        // Divide o valor (a soma total) pelo número de herbívoros para obter a média
        velMedH /= Herbivoro.herbivoros.length;
        forcaMedH /= Herbivoro.herbivoros.length;
        raioMedH /= Herbivoro.herbivoros.length;
        raioDetMedH /= Herbivoro.herbivoros.length;
        energMedH /= Herbivoro.herbivoros.length;
        taxaEnergMedH /= Herbivoro.herbivoros.length;


        // resetando
        velMedC = 0;
        forcaMedC = 0;
        raioMedC = 0;
        raioDetMedC = 0;
        energMedC = 0;
        taxaEnergMedC = 0;

        Carnivoro.carnivoros.forEach(carnivoro => {
            carnivoro.update();
            carnivoro.vagueia();

            // Transforma o raio de detecção em um objeto círculo para podermos manipulá-lo
            let visaoC = new Circulo(carnivoro.posicao.x, carnivoro.posicao.y, carnivoro.raio_deteccao);

            carnivoro.buscarHerbivoro(qtree, visaoC, false);

            // Soma o valor das variáveis pra todos os carnívoros
            velMedC += carnivoro.vel_max;
            forcaMedC += carnivoro.forca_max;
            raioMedC += carnivoro.raio_min * 1.5; // o raio máximo é 1.5 * o mínimo
            raioDetMedC += carnivoro.raio_deteccao_min; // não há ainda uma fórmula que relaciona o mín e o máx
            energMedC += carnivoro.energia_max;
            taxaEnergMedC += carnivoro.taxa_gasto_energia_max;
        })

        // Divide o valor (a soma total) pelo número de carnívoros para obter a média
        velMedC /= Carnivoro.carnivoros.length;
        forcaMedC /= Carnivoro.carnivoros.length;
        raioMedC /= Carnivoro.carnivoros.length;
        raioDetMedC /= Carnivoro.carnivoros.length;
        energMedC /= Carnivoro.carnivoros.length;
        taxaEnergMedC /= Carnivoro.carnivoros.length;
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

// ----------------------------------------------------------------------------------------------
//                                         Frame rate
// ----------------------------------------------------------------------------------------------

// The higher this value, the less the fps will reflect temporary variations
// A value of 1 will only keep the last value
var filterStrength = 20;
var frameTime = 0, lastLoop = new Date, thisLoop;

function gameLoop(){
  // ...
  var thisFrameTime = (thisLoop=new Date) - lastLoop;
  frameTime+= (thisFrameTime - frameTime) / filterStrength;
  lastLoop = thisLoop;
}

// Report the fps only every second, to only lightly affect measurements
var fpsOut = document.getElementById('framerate');
setInterval(function(){
  fpsOut.innerHTML = parseFloat((1000/frameTime).toFixed(1)) + " fps";
},500);

// function calculaFrameRate(){
//     var fps;
//     var thisLoop = new Date();
//     fps = 1000/(thisLoop - lastLoop);
//     lastLoop = thisLoop;

//     return fps;
//     document.getElementById("framerate").innerHTML = fps;
// }

setInterval(() => {
    var thisLoop = new Date();
    var fps = 1000/(thisLoop - lastLoop);
    lastLoop = thisLoop;

    document.getElementById("framerate").innerHTML = fps;
}, 1000);








var isEqual = function (value, other) {

	// Get the value type
	var type = Object.prototype.toString.call(value);

	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;

	// If items are not an object or array, return false
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;

	// Compare the length of the length of the two items
	var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
	var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
	if (valueLen !== otherLen) return false;

	// Compare two items
	var compare = function (item1, item2) {

		// Get the object type
		var itemType = Object.prototype.toString.call(item1);

		// If an object or array, compare recursively
		if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
			if (!isEqual(item1, item2)) return false;
		}

		// Otherwise, do a simple comparison
		else {

			// If the two items are not the same type, return false
			if (itemType !== Object.prototype.toString.call(item2)) return false;

			// Else if it's a function, convert to a string and compare
			// Otherwise, just compare
			if (itemType === '[object Function]') {
				if (item1.toString() !== item2.toString()) return false;
			} else {
				if (item1 !== item2) return false;
			}

		}
	};

	// Compare properties
	if (type === '[object Array]') {
		for (var i = 0; i < valueLen; i++) {
			if (compare(value[i], other[i]) === false) return false;
		}
	} else {
		for (var key in value) {
			if (value.hasOwnProperty(key)) {
				if (compare(value[key], other[key]) === false) return false;
			}
		}
	}

	// If nothing failed, return true
	return true;

};