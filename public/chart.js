// Função para retornar o ultimo elemento de um array sem retira-lo de la
Array.prototype.last = function() {
  return this[this.length - 1];
}

var cnt = 0;
var segundoRepetido = -1;
const chart = document.getElementById("chart")
const chartSecundario = document.getElementById("chartSecundario")

let historico = new Historico();
let historicoE = new Historico();
let historicoD = new Historico();

// if(telaDividida)

function resetChart() {
  Plotly.purge(chart);
  if(!telaDividida) Plotly.purge(chartSecundario);
}

function splitChart() {
  telaDividida = !telaDividida;
  historicoE.clear();
  historicoD.clear();
  resetChart();
  // Remover títulos dos gráficos
  removeChartTitle();
  //Construir
  buildChart(chartType);

  // Adicionar título aos gráficos
  insertChartTitle();
}

function insertChartTitle() {
  if(telaDividida) {
    $(chart).prepend(`<div class="sideTitle">Lado esquerdo</div>`)
    $(chartSecundario).prepend(`<div class="sideTitle">Lado direito</div>`)
  }
}

function removeChartTitle() {
  $(chart).html("")
  $(chartSecundario).html("")
}

function insertNextDataChart() {
  // Não deixa inserir dados para segundos repetidos
  if(segundos == segundoRepetido) {
    return;
  }
  segundoRepetido = segundos;
  // Salva os valores atuais no(s) historico(s) ---------------------------------------------
    //  Carnivoros
    historico.carnivoros.populacao.push(popC.esq + popC.dir)
    historico.carnivoros.velocidade.push( (velMedC.esq + velMedC.dir)/2 )
    historico.carnivoros.agilidade.push( (forcaMedC.esq + forcaMedC.dir)/2 )
    historico.carnivoros.raio.push( (raioMedC.esq + raioMedC.dir)/2 )
    historico.carnivoros.deteccao.push( (raioDetMedC.esq + raioDetMedC.dir)/2 )
    historico.carnivoros.energia.push( (energMedC.esq + energMedC.dir)/2 )
    historico.carnivoros.gasto.push( (taxaEnergMedC.esq + taxaEnergMedC.dir)/2 )

    //  Herbivoros
    historico.herbivoros.populacao.push(popH.esq + popH.dir)
    historico.herbivoros.velocidade.push( (velMedH.esq + velMedH.dir)/2 )
    historico.herbivoros.agilidade.push( (forcaMedH.esq + forcaMedH.dir)/2 )
    historico.herbivoros.raio.push( (raioMedH.esq + raioMedH.dir)/2 )
    historico.herbivoros.deteccao.push( (raioDetMedH.esq + raioDetMedH.dir)/2 )
    historico.herbivoros.energia.push( (energMedH.esq + energMedH.dir)/2 )
    historico.herbivoros.gasto.push( (taxaEnergMedH.esq + taxaEnergMedH.dir)/2 )

    //  Segundos
    historico.segundos.push(segundos)

    if(telaDividida) {
      // Historico do lado esquerdo
        // Carnivoros
        historicoE.carnivoros.populacao.push(popC.esq)
        historicoE.carnivoros.velocidade.push(velMedC.esq)
        historicoE.carnivoros.agilidade.push(forcaMedC.esq)
        historicoE.carnivoros.raio.push(raioMedC.esq)
        historicoE.carnivoros.deteccao.push(raioDetMedC.esq)
        historicoE.carnivoros.energia.push(energMedC.esq)
        historicoE.carnivoros.gasto.push(taxaEnergMedC.esq)

        // Herbivoros
        historicoE.herbivoros.populacao.push(popH.esq)
        historicoE.herbivoros.velocidade.push(velMedH.esq)
        historicoE.herbivoros.agilidade.push(forcaMedH.esq)
        historicoE.herbivoros.raio.push(raioMedH.esq)
        historicoE.herbivoros.deteccao.push(raioDetMedH.esq)
        historicoE.herbivoros.energia.push(energMedH.esq)
        historicoE.herbivoros.gasto.push(taxaEnergMedH.esq)

        historicoE.segundos.push(segundos)

      // Historico do lado direito
        // Carnivoros
        historicoD.carnivoros.populacao.push(popC.dir)
        historicoD.carnivoros.velocidade.push(velMedC.dir)
        historicoD.carnivoros.agilidade.push(forcaMedC.dir)
        historicoD.carnivoros.raio.push(raioMedC.dir)
        historicoD.carnivoros.deteccao.push(raioDetMedC.dir)
        historicoD.carnivoros.energia.push(energMedC.dir)
        historicoD.carnivoros.gasto.push(taxaEnergMedC.dir)

        // Herbivoros
        historicoD.herbivoros.populacao.push(popH.dir)
        historicoD.herbivoros.velocidade.push(velMedH.dir)
        historicoD.herbivoros.agilidade.push(forcaMedH.dir)
        historicoD.herbivoros.raio.push(raioMedH.dir)
        historicoD.herbivoros.deteccao.push(raioDetMedH.dir)
        historicoD.herbivoros.energia.push(energMedH.dir)
        historicoD.herbivoros.gasto.push(taxaEnergMedH.dir)

        historicoD.segundos.push(segundos)
    }
  // ------------------------------------------------------------------------------------------
  // Mesma variável de tempo para todos
  let arraySeconds = [[segundos], [segundos]];

  // Identificar qual o gráfico atual
  let valores;
  let valores2;

  switch(chartType) {
    case 1:
      if(telaDividida) {
        valores = [[historicoE.carnivoros.populacao.last()], [historicoE.herbivoros.populacao.last()]];
        valores2 = [[historicoD.carnivoros.populacao.last()], [historicoD.herbivoros.populacao.last()]];
      } else
        valores = [[historico.carnivoros.populacao.last()], [historico.herbivoros.populacao.last()]];
      break;
    case 2:
      if(telaDividida) {
        valores = [[historicoE.carnivoros.velocidade.last()], [historicoE.herbivoros.velocidade.last()]];
        valores2 = [[historicoD.carnivoros.velocidade.last()], [historicoD.herbivoros.velocidade.last()]];
      } else
        valores = [[historico.carnivoros.velocidade.last()], [historico.herbivoros.velocidade.last()]];
      break;
    case 3:
      if(telaDividida) {
        valores = [[historicoE.carnivoros.agilidade.last()], [historicoE.herbivoros.agilidade.last()]];
        valores2 = [[historicoD.carnivoros.agilidade.last()], [historicoD.herbivoros.agilidade.last()]];
      } else
        valores = [[historico.carnivoros.agilidade.last()], [historico.herbivoros.agilidade.last()]];
      break;
    case 4:
      if(telaDividida) {
        valores = [[historicoE.carnivoros.raio.last()], [historicoE.herbivoros.raio.last()]];
        valores2 = [[historicoD.carnivoros.raio.last()], [historicoD.herbivoros.raio.last()]];
      } else
        valores = [[historico.carnivoros.raio.last()], [historico.herbivoros.raio.last()]];
      break;
    case 5:
      if(telaDividida) {
        valores = [[historicoE.carnivoros.deteccao.last()], [historicoE.herbivoros.deteccao.last()]];
        valores2 = [[historicoD.carnivoros.deteccao.last()], [historicoD.herbivoros.deteccao.last()]];
      } else
        valores = [[historico.carnivoros.deteccao.last()], [historico.herbivoros.deteccao.last()]];
      break;
    case 6:
      if(telaDividida) {
        valores = [[historicoE.carnivoros.energia.last()], [historicoE.herbivoros.energia.last()]];
        valores2 = [[historicoD.carnivoros.energia.last()], [historicoD.herbivoros.energia.last()]];
      } else
        valores = [[historico.carnivoros.energia.last()], [historico.herbivoros.energia.last()]];
      break;
    case 7:
      if(telaDividida) {
        valores = [[historicoE.carnivoros.gasto.last()], [historicoE.herbivoros.gasto.last()]];
        valores2 = [[historicoD.carnivoros.gasto.last()], [historicoD.herbivoros.gasto.last()]];
      } else
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
  
  if(telaDividida) {
    Plotly.extendTraces(chartSecundario,{y: valores2, x: arraySeconds}, [0,1]);
    cnt++;
    if(cnt >500) {
        Plotly.relayout('chartSecundario',{
            xaxis: {
                range: [cnt-500,cnt]
            }
        });
    }
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
  removeChartTitle();
  buildChart(type);
  insertChartTitle();
  chartType = type;
}

function buildChart(type) {
  // ÍNDICE DE QUAL DADO PEGARÁ DO ARRAY DE DADOS (em relação ao carnívoro)
  //let indice = 1;               // Valores do gráfico 1 para servir de inicializador
  let title = "População";
  let yTitle = "N° Indivíduos"; //Título do eixo y
  let data = [];
  let data2 = [];

  // Puxar o historico do novo tipo de grafico -----------------------------------------------------
  switch (type) {
    case 1: // População
      if(telaDividida) {
        data = [historicoE.carnivoros.populacao, historicoE.herbivoros.populacao];
        data2 = [historicoD.carnivoros.populacao, historicoD.herbivoros.populacao];
      } else
        data = [historico.carnivoros.populacao, historico.herbivoros.populacao];
      break;
    case 2: // Velocidade
      //indice = 3;
      title = "Velocidade";
      yTitle = "Velocidade média";

      if(telaDividida) {
        data = [historicoE.carnivoros.velocidade, historicoE.herbivoros.velocidade];
        data2 = [historicoD.carnivoros.velocidade, historicoD.herbivoros.velocidade];
      } else
        data = [historico.carnivoros.velocidade, historico.herbivoros.velocidade];
      break;
    case 3: // Força
      //indice = 5;
      title = "Agilidade";
      yTitle = "Agilidade Média";

      if(telaDividida) {
        data = [historicoE.carnivoros.agilidade, historicoE.herbivoros.agilidade];
        data2 = [historicoD.carnivoros.agilidade, historicoD.herbivoros.agilidade];
      } else
        data = [historico.carnivoros.agilidade, historico.herbivoros.agilidade];
      break;
    case 4: // Raio
      //indice = 7;
      title = "Raio";
      yTitle = "Raio médio";

      if(telaDividida) {
        data = [historicoE.carnivoros.raio, historicoE.herbivoros.raio];
        data2 = [historicoD.carnivoros.raio, historicoD.herbivoros.raio];
      } else
        data = [historico.carnivoros.raio, historico.herbivoros.raio];
      break;
    case 5: // Raio deteccao
      //indice = 9;
      title = "Alcance de detecção";
      yTitle = "Raio de detecção médio";

      if(telaDividida) {
        data = [historicoE.carnivoros.deteccao, historicoE.herbivoros.deteccao];
        data2 = [historicoD.carnivoros.deteccao, historicoD.herbivoros.deteccao];
      } else
        data = [historico.carnivoros.deteccao, historico.herbivoros.deteccao];
      break;
    case 6: // Energia
      //indice = 11;
      title = "Energia";
      yTitle = "Nível de energia médio";

      if(telaDividida) {
        data = [historicoE.carnivoros.energia, historicoE.herbivoros.energia];
        data2 = [historicoD.carnivoros.energia, historicoD.herbivoros.energia];
      } else
        data = [historico.carnivoros.energia, historico.herbivoros.energia];
      break;
    case 7: // Taxa de energia
      //indice = 13;
      title = "Gasto de energia";
      yTitle = "Taxa de energia média";

      if(telaDividida) {
        data = [historicoE.carnivoros.gasto, historicoE.herbivoros.gasto];
        data2 = [historicoD.carnivoros.gasto, historicoD.herbivoros.gasto];
      } else
        data = [historico.carnivoros.gasto, historico.herbivoros.gasto];
  }
  // -----------------------------------------------------------------------------------------------

  // INSERE TODO O HISTÓRICO DE DADOS NO GRÁFICO
  let carnivoros = {
    x: telaDividida? historicoE.segundos:historico.segundos,
    y: data[0],
    type: 'scatter',
    mode: 'lines',
    name: 'Carnívoros',
    line: { color: 'red', shape: 'spline'}
  };

  let herbivoros = {
    x: telaDividida? historicoE.segundos:historico.segundos,
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

  let carnivoros2, herbivoros2, dataConfig2;
  if(telaDividida) {
    carnivoros2 = {
      x: historicoD.segundos,
      y: data2[0],
      type: 'scatter',
      mode: 'lines',
      name: 'Carnívoros',
      line: { color: 'red', shape: 'spline'}
    };
  
    herbivoros2 = {
      x: historicoD.segundos,
      y: data2[1],
      type: 'scatter',
      mode: 'lines',
      name: 'Herbívoros',
      line: {color: 'green', shape: 'spline'}
    };
  
    dataConfig2 = [carnivoros2, herbivoros2];

    Plotly.newPlot(chartSecundario, dataConfig2, layout);
  }
}

