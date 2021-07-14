var cnt = 0;
//var segundoRepetido = -1;
const chartGroup = document.getElementById("chart-group")
const chartPopulacao = document.getElementById("chartPopulacao")
const chartVelocidade = document.getElementById("chartVelocidade")
const chartAgilidade = document.getElementById("chartAgilidade")
const chartRaio = document.getElementById("chartRaio")
const chartDeteccao = document.getElementById("chartDeteccao")
const chartEnergia = document.getElementById("chartEnergia")
const chartGasto = document.getElementById("chartGasto")

function resetCharts() {
  // Deleta todos os gráficos
  Plotly.purge(chartPopulacao);
  Plotly.purge(chartVelocidade);
  Plotly.purge(chartAgilidade);
  Plotly.purge(chartRaio);
  Plotly.purge(chartDeteccao);
  Plotly.purge(chartEnergia);
  Plotly.purge(chartGasto);
  
  // Chama a função para construir os gráficos novamente
  buildCharts();
}

function insertNextDataCharts() {
  // Mesma variável para todos
  let arraySeconds = [[segundos], [segundos]];
  //console.log(arraySeconds)

  // População
  let popCarnivoros = Carnivoro.carnivoros.length;
  let popHerbivoros = Herbivoro.herbivoros.length;
  let valoresPop = [[popCarnivoros], [popHerbivoros]];
  Plotly.extendTraces(chartPopulacao,{y: valoresPop, x: arraySeconds}, [0,1]);

  // Velocidade
  let velCarnivoros = velMedC;
  let velHerbivoros = velMedH;
  let valoresVel = [[velCarnivoros], [velHerbivoros]];
  Plotly.extendTraces(chartVelocidade,{y: valoresVel, x: arraySeconds}, [0,1]);

  // Força
  let forcaCarnivoros = forcaMedC;
  let forcaHerbivoros = forcaMedH;
  let valoresAgi = [[forcaCarnivoros], [forcaHerbivoros]];
  Plotly.extendTraces(chartAgilidade,{y: valoresAgi, x: arraySeconds}, [0,1]);

  // Raio
  let raioCarnivoros = raioMedC;
  let raioHerbivoros = raioMedH;
  let valoresRai = [[raioCarnivoros], [raioHerbivoros]];
  Plotly.extendTraces(chartRaio,{y: valoresRai, x: arraySeconds}, [0,1]);

  // Raio de detecção
  let raioDetCarnivoros = raioDetMedC;
  let raioDetHerbivoros = raioDetMedH;
  let valoresDet = [[raioDetCarnivoros], [raioDetHerbivoros]];
  Plotly.extendTraces(chartDeteccao,{y: valoresDet, x: arraySeconds}, [0,1]);
  
  // Energia
  let energiaCarnivoros = energMedC;
  let energiaHerbivoros = energMedH;
  let valoresEne = [[energiaCarnivoros], [energiaHerbivoros]];
  Plotly.extendTraces(chartEnergia,{y: valoresEne, x: arraySeconds}, [0,1]);
  
  // Taxa de gasto de energia
  let taxaEnerCarnivoros = taxaEnergMedC;
  let taxaEnerHerbivoros = taxaEnergMedH;
  let valoresGas = [[taxaEnerCarnivoros], [taxaEnerHerbivoros]];
  Plotly.extendTraces(chartGasto, {y: valoresGas, x: arraySeconds}, [0,1]);

  //if(seconds != segundoRepetido) {
    cnt++;
    if(cnt >500) {
        Plotly.relayout(chartPopulacao,{ xaxis: {range: [cnt-500,cnt] } });
        Plotly.relayout(chartVelocidade,{ xaxis: {range: [cnt-500,cnt] } });
        Plotly.relayout(chartAgilidade,{ xaxis: {range: [cnt-500,cnt] } });
        Plotly.relayout(chartRaio,{ xaxis: {range: [cnt-500,cnt] } });
        Plotly.relayout(chartDeteccao,{ xaxis: {range: [cnt-500,cnt] } });
        Plotly.relayout(chartEnergia,{ xaxis: {range: [cnt-500,cnt] } });
        Plotly.relayout(chartGasto,{ xaxis: {range: [cnt-500,cnt] } });
    }

  //} else {
    // console.log("entrou : "+seconds+"s");
    // Se for pra repetir segundo e dados nem envia!
  //}
  //segundoRepetido = seconds;
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

function buildCharts() {
  // TEMPLATES PARA A CRIAÇÃO DAS LINHAS DOS GRÁFICOS
  let carnivoros = {
    x: [0],
    //y: [],
    type: 'scattergl',
    mode: 'lines',
    name: 'Carnívoros',
    line: { color: 'red', shape: 'spline'}
  };

  let herbivoros = {
    x: [0],
    //y: [],
    type: 'scattergl',
    mode: 'lines',
    name: 'Herbívoros',
    line: {color: 'green', shape: 'spline'}
  };

  //let data = [carnivoros, herbivoros];

  var layout = {
  //title: title,

  xaxis: {
      showline: true,
      domain: [0],
      title: "Segundos",
      showgrid: true
  },
  yaxis: { 
      showline: true,
      domain: [0],
      //title: yTitle, 
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

  // COMPLETAR OS TEMPLATES DE ACORDO COM AS VARIÁVEIS DE CADA GRÁFICO
  // E CRIAR OS GRÁFICOS
  // @@@@@@@@ População
  let popCarn = {...carnivoros}, popHerb = {...herbivoros}, popLayo = {...layout}; // Clonando o template
  popCarn.y = [Carnivoro.carnivoros.length];
  popHerb.y = [Herbivoro.herbivoros.length];
  console.log(`Populaçao carnivoros inicial: ${popCarn.y} e herb: ${popHerb.y}`)
  popLayo.title = "População";
  popLayo.yaxis.title = "N° Indivíduos";
  Plotly.newPlot(chartPopulacao, [popCarn, popHerb], popLayo);

  // @@@@@@@@ Velocidade
  let velCarn = {...carnivoros}, velHerb = {...herbivoros}, velLayo = {...layout};
  velCarn.y = [velMedC];
  velHerb.y = [velMedH];
  velLayo.title = "Velocidade";
  velLayo.yaxis.title = "Velocidade média";
  Plotly.newPlot(chartVelocidade, [velCarn, velHerb], velLayo);
  
  // @@@@@@@@ Agilidade
  let forcaCarn = {...carnivoros}, forcaHerb = {...herbivoros}, forcaLayo = {...layout};
  forcaCarn.y = [forcaMedC];
  forcaHerb.y = [forcaMedH];
  forcaLayo.title = "Agilidade";
  forcaLayo.yaxis.title = "Agilidade média";
  Plotly.newPlot(chartAgilidade, [forcaCarn, forcaHerb], forcaLayo);
  
  // @@@@@@@@ Raio
  let raioCarn = {...carnivoros}, raioHerb = {...herbivoros}, raioLayo = {...layout};
  raioCarn.y = [raioMedC];
  raioHerb.y = [raioMedH];
  raioLayo.title = "Raio";
  raioLayo.yaxis.title = "Raio médio";
  Plotly.newPlot(chartRaio, [raioCarn, raioHerb], raioLayo);

  // @@@@@@@@ Raio de detecção
  let detCarn = {...carnivoros}, detHerb = {...herbivoros}, detLayo = {...layout};
  detCarn.y = [raioDetMedC];
  detHerb.y = [raioDetMedH];
  detLayo.title = "Alcance de detecção";
  detLayo.yaxis.title = "Raio de detecção médio";
  Plotly.newPlot(chartDeteccao, [detCarn, detHerb], detLayo);
  
  // @@@@@@@@ Energia
  let eneCarn = {...carnivoros}, eneHerb = {...herbivoros}, eneLayo = {...layout};
  eneCarn.y = [energMedC];
  eneHerb.y = [energMedH];
  eneLayo.title = "Energia";
  eneLayo.yaxis.title = "Nível de energia médio";
  Plotly.newPlot(chartEnergia, [eneCarn, eneHerb], eneLayo);
  
  // @@@@@@@@ Gasto de energia
  let gasCarn = {...carnivoros}, gasHerb = {...herbivoros}, gasLayo = {...layout};
  gasCarn.y = [taxaEnergMedC];
  gasHerb.y = [taxaEnergMedH];
  gasLayo.title = "Gasto de energia";
  gasLayo.yaxis.title = "Taxa de energia média";
  Plotly.newPlot(chartGasto, [gasCarn, gasHerb], gasLayo);
}