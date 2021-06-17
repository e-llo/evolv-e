var cnt = 0;
var segundoRepetido = -1;
const chartElement = document.getElementById("chart")

function resetChart() {
  Plotly.purge(chartElement)
  mudarGrafico = true;
}

function getDataPop(dados) { 
  var popCarnivoros =[dados[dados.length-1][1]];
  var popHerbivoros = [dados[dados.length-1][2]];
  var valores = [popCarnivoros, popHerbivoros];
  let seconds = dados[dados.length-1][0];
  var valsegundos = [];

  if(seconds != segundoRepetido) {
    // console.log("não entrou: "+seconds);
    valsegundos.push([seconds], [seconds]);

    Plotly.extendTraces('chart',{y: valores, x: valsegundos}, [0,1]);
    cnt++;
    if(cnt >500) {
        Plotly.relayout('chart',{
            xaxis: {
                range: [cnt-500,cnt]
            }
        });
    }

  } else {
    // console.log("entrou : "+seconds+"s");
    // Se for pra repetir segundo e dados nem envia!
  }
  segundoRepetido = seconds;
} 
 
function getDataVel(dados) { 
  
  var velCarnivoros =[dados[dados.length-1][3]];
  var velHerbivoros = [dados[dados.length-1][4]];
  var valores = [velCarnivoros, velHerbivoros];
  let seconds = dados[dados.length-1][0];
  var valsegundos = [];

  if(seconds != segundoRepetido) {
    // console.log("não entrou: "+seconds);
    valsegundos.push([seconds], [seconds]);

    Plotly.extendTraces('chart',{y: valores, x: valsegundos}, [0,1]);
    cnt++;
    if(cnt >500) {
        Plotly.relayout('chart',{
            xaxis: {
                range: [cnt-500,cnt]
            }
        });
    }

  } else {
    // console.log("entrou : "+seconds+"s");
    // Se for pra repetir segundo e dados nem envia!
  }
  segundoRepetido = seconds;
  
}  


function getDataForca(dados) { 
  
  var forcaCarnivoros =[dados[dados.length-1][5]];
  var forcaHerbivoros = [dados[dados.length-1][6]];
  var valores = [forcaCarnivoros, forcaHerbivoros];
  let seconds = dados[dados.length-1][0];
  var valsegundos = [];

  if(seconds != segundoRepetido) {
    // console.log("não entrou: "+seconds);
    valsegundos.push([seconds], [seconds]);

    Plotly.extendTraces('chart',{y: valores, x: valsegundos}, [0,1]);
    cnt++;
    if(cnt >500) {
        Plotly.relayout('chart',{
            xaxis: {
                range: [cnt-500,cnt]
            }
        });
    }

  } else {
    // console.log("entrou : "+seconds+"s");
    // Se for pra repetir segundo e dados nem envia!
  }
  segundoRepetido = seconds;
  
}  


function getDataRaio(dados) { 
  
  var raioCarnivoros =[dados[dados.length-1][7]];
  var raioHerbivoros = [dados[dados.length-1][8]];
  var valores = [raioCarnivoros, raioHerbivoros];
  let seconds = dados[dados.length-1][0];
  var valsegundos = [];

  if(seconds != segundoRepetido) {
    // console.log("não entrou: "+seconds);
    valsegundos.push([seconds], [seconds]);

    Plotly.extendTraces('chart',{y: valores, x: valsegundos}, [0,1]);
    cnt++;
    if(cnt >500) {
        Plotly.relayout('chart',{
            xaxis: {
                range: [cnt-500,cnt]
            }
        });
    }

  } else {
    // console.log("entrou : "+seconds+"s");
    // Se for pra repetir segundo e dados nem envia!
  }
  segundoRepetido = seconds;
  
}  


function getDataRaioDet(dados) { 
  
  var raioDetCarnivoros =[dados[dados.length-1][9]];
  var raioDetHerbivoros = [dados[dados.length-1][10]];
  var valores = [raioDetCarnivoros, raioDetHerbivoros];
  let seconds = dados[dados.length-1][0];
  var valsegundos = [];

  if(seconds != segundoRepetido) {
    // console.log("não entrou: "+seconds);
    valsegundos.push([seconds], [seconds]);

    Plotly.extendTraces('chart',{y: valores, x: valsegundos}, [0,1]);
    cnt++;
    if(cnt >500) {
        Plotly.relayout('chart',{
            xaxis: {
                range: [cnt-500,cnt]
            }
        });
    }

  } else {
    // console.log("entrou : "+seconds+"s");
    // Se for pra repetir segundo e dados nem envia!
  }
  segundoRepetido = seconds;
  
}  


function getDataEner(dados) { 
  
  var energiaCarnivoros =[dados[dados.length-1][11]];
  var energiaHerbivoros = [dados[dados.length-1][12]];
  var valores = [energiaCarnivoros, energiaHerbivoros];
  let seconds = dados[dados.length-1][0];
  var valsegundos = [];

  if(seconds != segundoRepetido) {
    // console.log("não entrou: "+seconds);
    valsegundos.push([seconds], [seconds]);

    Plotly.extendTraces('chart',{y: valores, x: valsegundos}, [0,1]);
    cnt++;
    if(cnt >500) {
        Plotly.relayout('chart',{
            xaxis: {
                range: [cnt-500,cnt]
            }
        });
    }

  } else {
    // console.log("entrou : "+seconds+"s");
    // Se for pra repetir segundo e dados nem envia!
  }
  segundoRepetido = seconds;
  
}  


function getDataTaxEner(dados) { 
  
  var taxaEnerCarnivoros =[dados[dados.length-1][13]];
  var taxaEnerHerbivoros = [dados[dados.length-1][14]];
  var valores = [taxaEnerCarnivoros, taxaEnerHerbivoros];
  let seconds = dados[dados.length-1][0];
  var valsegundos = [];

  if(seconds != segundoRepetido) {
    // console.log("não entrou: "+seconds);
    valsegundos.push([seconds], [seconds]);

    Plotly.extendTraces('chart',{y: valores, x: valsegundos}, [0,1]);
    cnt++;
    if(cnt >500) {
        Plotly.relayout('chart',{
            xaxis: {
                range: [cnt-500,cnt]
            }
        });
    }

  } else {
    // console.log("entrou : "+seconds+"s");
    // Se for pra repetir segundo e dados nem envia!
  }
  segundoRepetido = seconds;
  
}  

/*var carnivoros = {
  x: [],
  y: [],
  type: 'scatter',
  mode: 'lines',
  name: 'Carnívoros',
  line: {
    color: 'red',
    shape: 'spline'
  }
};

var herbivoros = {
  x: [],
  y: [],
  type: 'scatter',
  mode: 'lines',
  name: 'Herbívoros',
  line: {
    color: 'green',
    shape: 'spline'
  }
};

var data = [carnivoros, herbivoros];

var layout = {
  title: "População",

  xaxis: {
    showline: true,
    domain: [0],
    title: "Segundos",
    showgrid: true
  },
  yaxis: { 
    showline: true, 
    title: "N° Indivíduos", 
    rangemode: "tozero" 
  },
  legend: {
    orientation: 'h',
          traceorder: 'reversed',
    x: 0.05,
    y: -.3
  },
  plot_bgcolor:"#222",
  paper_bgcolor:"#222",
  font: {
    color: '#ddd'
  }


};

Plotly.newPlot('chart', data, layout); */

function changeChart(novoTipo, dados) {
  resetChart();

  // ÍNDICE DE QUAL DADO PEGARÁ DO ARRAY DE DADOS (em relação ao carnívoro)
  let indice = 1;               // Valores do gráfico 1 para servir de inicializador
  let titulo = "População";
  let yTitulo = "N° Indivíduos"; //Título do eixo y
  switch (novoTipo) {
    case 1: // População
      break;
    case 2: // Velocidade
      indice = 3;
      titulo = "Velocidade";
      yTitulo = "Velocidade média";
      break;
    case 3: // Força
      indice = 5;
      titulo = "Agilidade";
      yTitulo = "Agilidade Média";
      break;
    case 4: // Raio
      indice = 7;
      titulo = "Raio";
      yTitulo = "Raio médio";
      break;
    case 5: // Raio deteccao
      indice = 9;
      titulo = "Alcance de detecção";
      yTitulo = "Raio de detecção médio";
      break;
    case 6: // Energia
      indice = 11;
      titulo = "Energia";
      yTitulo = "Nível de energia médio";
      break;
    case 7: // Taxa de energia
      indice = 13;
      titulo = "Gasto de energia";
      yTitulo = "Taxa de energia média";
  }

  // CAPTURA TODO O HISTÓRICO DE DADOS E JOGA EM UM ARRAY
  let tempo = dados.map(elemento => elemento[0]) // faz um array novo com todos os valores de segundos
  let yCarn = dados.map(elemento => elemento[indice]);
  let yHerb = dados.map(elemento => elemento[indice + 1]);

  // INSERE TODO O HISTÓRICO DE DADOS NO GRÁFICO
  let carnivoros = {
    x: tempo,
    y: yCarn,
    type: 'scatter',
    mode: 'lines',
    name: 'Carnívoros',
    line: { color: 'red', shape: 'spline'}
  };

  let herbivoros = {
    x: tempo,
    y: yHerb,
    type: 'scatter',
    mode: 'lines',
    name: 'Herbívoros',
    line: {color: 'green', shape: 'spline'}
  };

  let data = [carnivoros, herbivoros];

  var layout = {
  title: titulo,

  xaxis: {
      showline: true,
      domain: [0],
      title: "Segundos",
      showgrid: true
  },
  yaxis: { 
      showline: true, 
      title: yTitulo, 
      rangemode: "tozero" 
  },
  legend: {
      orientation: 'h',
          traceorder: 'reversed',
      x: 0.05,
      y: -.3
  },
  plot_bgcolor:"#222",
  paper_bgcolor:"#222",
  font: {
      color: '#ddd'
  }
}

  Plotly.newPlot('chart', data, layout);
  mudarGrafico = false;
}

