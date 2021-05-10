// // import * as echarts from 'echarts';

// var ROOT_PATH = 'https://echarts.apache.org/examples';

// var chartDom = document.getElementById('chart');
// var myChart = echarts.init(chartDom, 'dark');
// var option;

// $.get(ROOT_PATH + '/data/asset/data/life-expectancy-table.json', function (_rawData) {
//     run(_rawData);
// });

// function run(_rawData) {

//     option = {
//         dataset: [{
//             id: 'dataset_raw',
//             source: _rawData
//         }, {
//             id: 'dataset_since_1950_of_germany',
//             fromDatasetId: 'dataset_raw',
//             transform: {
//                 type: 'filter',
//                 config: {
//                     and: [
//                         { dimension: 'Year', gte: 1950 },
//                         { dimension: 'Country', '=': 'Germany' }
//                     ]
//                 }
//             }
//         }, {
//             id: 'dataset_since_1950_of_france',
//             fromDatasetId: 'dataset_raw',
//             transform: {
//                 type: 'filter',
//                 config: {
//                     and: [
//                         { dimension: 'Year', gte: 1950 },
//                         { dimension: 'Country', '=': 'France' }
//                     ]
//                 }
//             }
//         }],
//         title: {
//             text: 'Income of Germany and France since 1950'
//         },
//         tooltip: {
//             trigger: 'axis'
//         },
//         xAxis: {
//             type: 'category',
//             nameLocation: 'middle'
//         },
//         yAxis: {
//             name: 'Income'
//         },
//         series: [{
//             type: 'line',
//             datasetId: 'dataset_since_1950_of_germany',
//             showSymbol: false,
//             encode: {
//                 x: 'Year',
//                 y: 'Income',
//                 itemName: 'Year',
//                 tooltip: ['Income'],
//             }
//         }, {
//             type: 'line',
//             datasetId: 'dataset_since_1950_of_france',
//             showSymbol: false,
//             encode: {
//                 x: 'Year',
//                 y: 'Income',
//                 itemName: 'Year',
//                 tooltip: ['Income'],
//             }
//         }]
//     };

//     myChart.setOption(option);

// }

// option && myChart.setOption(option);
















google.charts.load('current', {'packages':['line']});
      google.charts.setOnLoadCallback(drawChart);

    function drawChart(array) {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Segundos');
      data.addColumn('number', 'Carnívoros');
      data.addColumn('number', 'Herbívoros');
    //   data.addColumn('number', 'Alimentos');

      data.addRows(array);

      var options = {
        chart: {
          title: 'População',
        },
        width: 380,
        height: 300,
        // colors: ['#ff0000', '#008f39', '#ffe135'],
        colors: ['#ff0000', '#008f39'],
        axes: {
          x: {
            0: {side: 'bottom'}
          }
        }
      };

      var chart = new google.charts.Line(document.getElementById('chart'));

      chart.draw(data, options);
    }