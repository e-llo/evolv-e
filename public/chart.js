

// google.charts.load('current', {'packages':['line']});
//       google.charts.setOnLoadCallback(drawChart);

//     function drawChart(array) {

//       var data = new google.visualization.DataTable();
//       data.addColumn('number', 'Segundos');
//       data.addColumn('number', 'Carnívoros');
//       data.addColumn('number', 'Herbívoros');
//     //   data.addColumn('number', 'Alimentos');

//       data.addRows(array);

//       var options = {
//         chart: {
//           title: 'População',
//         },
//         width: 380,
//         height: 300,
//         // colors: ['#ff0000', '#008f39', '#ffe135'],
//         colors: ['#ff0000', '#008f39'],
//         axes: {
//           x: {
//             0: {side: 'bottom'}
//           }
//         }
//       };

//       var chart = new google.charts.Line(document.getElementById('chart'));

//       chart.draw(data, options);
//     }
var cnt = 0;
function getData(dados) { 
  
  var carnivoros =[dados[dados.length-1][1]];
  
  var herbivoros = [dados[dados.length-1][2]];
  var segundos = [dados[dados.length-1][0]];
  var valores = [carnivoros, herbivoros];


  Plotly.extendTraces('chart',{y: valores}, [0,1]);
  cnt++;
  if(cnt >500) {
      Plotly.relayout('chart',{
          xaxis: {
              range: [cnt-500,cnt]
          }
      });
  }
  
}  


var carnivoros = {
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
    domain: [0, 1],
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


