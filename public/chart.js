// Função para retornar o ultimo elemento de um array sem retira-lo de la
Array.prototype.last = function() {
  return this[this.length - 1];
}

var cnt = 0;
var segundoRepetido = -1;
const chart = document.getElementById("chart")

let historico = {
  herbivoros: {
    populacao:[],
    velocidade: [],
    agilidade: [],
    raio: [],
    deteccao: [],
    energia: [],
    gasto: []
  },
  carnivoros:{
    populacao:[],
    velocidade: [],
    agilidade: [],
    raio: [],
    deteccao: [],
    energia: [],
    gasto: []
  },
  segundos: []
}

function resetChart() {
  Plotly.purge(chart);
}

function insertNextDataChart() {
  // Não deixa inserir dados para segundos repetidos
  if(segundos == segundoRepetido) {
    return;
  }
  segundoRepetido = segundos;
  // Salva os valores atuais no historico
    //  Carnivoros
    historico.carnivoros.populacao.push(Carnivoro.carnivoros.length)
    historico.carnivoros.velocidade.push(velMedC)
    historico.carnivoros.agilidade.push(forcaMedC)
    historico.carnivoros.raio.push(raioMedC)
    historico.carnivoros.deteccao.push(raioDetMedC)
    historico.carnivoros.energia.push(energMedC)
    historico.carnivoros.gasto.push(taxaEnergMedC)

    //  Herbivoros
    historico.herbivoros.populacao.push(Herbivoro.herbivoros.length)
    historico.herbivoros.velocidade.push(velMedH)
    historico.herbivoros.agilidade.push(forcaMedH)
    historico.herbivoros.raio.push(raioMedH)
    historico.herbivoros.deteccao.push(raioDetMedH)
    historico.herbivoros.energia.push(energMedH)
    historico.herbivoros.gasto.push(taxaEnergMedH)

    //  Segundos
    historico.segundos.push(segundos)

  // Mesma variável para todos
  let arraySeconds = [[segundos], [segundos]];

  // Identificar qual o gráfico atual
  let valores;

  switch(chartType) {
    case 1:
      valores = [[historico.carnivoros.populacao.last()], [historico.herbivoros.populacao.last()]];
      break;
    case 2:
      valores = [[historico.carnivoros.velocidade.last()], [historico.herbivoros.velocidade.last()]];
      break;
    case 3:
      valores = [[historico.carnivoros.agilidade.last()], [historico.herbivoros.agilidade.last()]];
      break;
    case 4:
      valores = [[historico.carnivoros.raio.last()], [historico.herbivoros.raio.last()]];
      break;
    case 5:
      valores = [[historico.carnivoros.deteccao.last()], [historico.herbivoros.deteccao.last()]];
      break;
    case 6:
      valores = [[historico.carnivoros.energia.last()], [historico.herbivoros.energia.last()]];
      break;
    case 7:
      valores = [[historico.carnivoros.gasto.last()], [historico.herbivoros.gasto.last()]];
  }

  Plotly.extendTraces(chart,{y: valores, x: arraySeconds}, [0,1]);
  cnt++;
    if(cnt >500) {
        Plotly.relayout('chart',{
            xaxis: {
                range: [cnt-500,cnt]
            }
        });
    }

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

function changeChart(type) {
  if(type == chartType || type < 1 || type > 7) {
    return;
  }
  resetChart();
  buildChart(type);
  chartType = type;
}

function buildChart(type) {
  // ÍNDICE DE QUAL DADO PEGARÁ DO ARRAY DE DADOS (em relação ao carnívoro)
  //let indice = 1;               // Valores do gráfico 1 para servir de inicializador
  let title = "População";
  let yTitle = "N° Indivíduos"; //Título do eixo y
  let data = [];
  switch (type) {
    case 1: // População
      data = [historico.carnivoros.populacao, historico.herbivoros.populacao];
      break;
    case 2: // Velocidade
      //indice = 3;
      title = "Velocidade";
      yTitle = "Velocidade média";
      data = [historico.carnivoros.velocidade, historico.herbivoros.velocidade];
      break;
    case 3: // Força
      //indice = 5;
      title = "Agilidade";
      yTitle = "Agilidade Média";
      data = [historico.carnivoros.agilidade, historico.herbivoros.agilidade];
      break;
    case 4: // Raio
      //indice = 7;
      title = "Raio";
      yTitle = "Raio médio";
      data = [historico.carnivoros.raio, historico.herbivoros.raio];
      break;
    case 5: // Raio deteccao
      //indice = 9;
      title = "Alcance de detecção";
      yTitle = "Raio de detecção médio";
      data = [historico.carnivoros.deteccao, historico.herbivoros.deteccao];
      break;
    case 6: // Energia
      //indice = 11;
      title = "Energia";
      yTitle = "Nível de energia médio";
      data = [historico.carnivoros.energia, historico.herbivoros.energia];
      break;
    case 7: // Taxa de energia
      //indice = 13;
      title = "Gasto de energia";
      yTitle = "Taxa de energia média";
      data = [historico.carnivoros.gasto, historico.herbivoros.gasto];
  }
  console.log(data)

  // CAPTURA TODO O HISTÓRICO DE DADOS E JOGA EM UM ARRAY
  //let tempo = dados.map(elemento => elemento[0]) // faz um array novo com todos os valores de segundos
  //let yCarn = dados.map(elemento => elemento[indice]);
  //let yHerb = dados.map(elemento => elemento[indice + 1]);

  // INSERE TODO O HISTÓRICO DE DADOS NO GRÁFICO
  let carnivoros = {
    x: historico.segundos,
    y: data[0],
    type: 'scatter',
    mode: 'lines',
    name: 'Carnívoros',
    line: { color: 'red', shape: 'spline'}
  };

  let herbivoros = {
    x: historico.segundos,
    y: data[1],
    type: 'scatter',
    mode: 'lines',
    name: 'Herbívoros',
    line: {color: 'green', shape: 'spline'}
  };

  let dataConfig = [carnivoros, herbivoros];

  var layout = {
  title: title,

  xaxis: {
      showline: true,
      domain: [0],
      title: "Segundos",
      showgrid: true
  },
  yaxis: { 
      showline: true, 
      title: yTitle, 
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

  Plotly.newPlot('chart', dataConfig, layout);
}

