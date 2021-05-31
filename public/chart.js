var cnt = 0;
var segundoRepetido = -1;

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
  
  var taxaEnerCarnivoros =[dados[dados.length-1][11]];
  var taxaEnerHerbivoros = [dados[dados.length-1][12]];
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


var carnivoros = {
  x: [segundos],
  y: [Carnivoro.carnivoros.length],
  type: 'scatter',
  mode: 'lines',
  name: 'Carnívoros',
  line: {
    color: 'red',
    shape: 'spline'
  }
};

var herbivoros = {
  x: [segundos],
  y: [Herbivoro.herbivoros.length],
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
  }

};

Plotly.newPlot('chart', data, layout);


