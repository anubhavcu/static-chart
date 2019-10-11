
// createChart();
// loadData();
//   async function createChart(){

//    const data =  await loadData();
//     const ctx = document.getElementById('chart').getContext('2d');
//     const myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: data.xlabels,
//         datasets: [{
//             label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in ℃',
//             data: data.ytemps,
//             fill : false,
//             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//             borderColor: 'rgba(255, 99, 132, 1)',
//             borderWidth: 1
//         }]
//     },
//     options: {
//       scales: {
//           yAxes: [{
//               ticks: {
//                   // Include a degree sign in the ticks
//                   callback: function(value, index, values) {
//                       return  value + '℃';
//                   }
//               }
//           }]
//       }
//   }
//  });
// }

// loadData();
// async function loadData(){
//   const xlabels =[];
//   const ytemps = [];
//   const res = await fetch('data.csv');
//   const data = await res.text();
//   //console.log(data)

//   const table = data.split('\n').splice(1);
//   table.forEach(row => {
//     const col = row.split(',')
//     const year = col[0];
//     const temp = col[1]
//     xlabels.push(year);
//     ytemps.push(parseFloat(temp) + 14)
//     console.log(year,temp);
//   })
//   return {xlabels , ytemps};  
// }


//Loading multiple charts 
//Manual splitting 

window.addEventListener('load', setup);
      async function setup() {
        const ctx = document.getElementById('chart').getContext('2d');
        const dataTemps = await getData();
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: dataTemps.years,
            datasets: [
              {
                label: 'Global Temperature in °C',
                data: dataTemps.temps,
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1
              },
              {
                label: 'Northern Hemisphere Temperature in °C',
                data: dataTemps.northern,
                fill: false,
                borderColor: 'rgba(99, 132, 255, 1)',
                backgroundColor: 'rgba(99, 132, 255, 0.5)',
                borderWidth: 1
              },
              {
                label: 'Souther Hemisphere in °C',
                data: dataTemps.southern,
                fill: false,
                borderColor: 'rgba(99, 255, 132, 1)',
                backgroundColor: 'rgba(99, 255, 132, 0.5)',
                borderWidth: 1
              }
            ]
          },
          options: {}
        });
      }
      async function getData() {
        const response = await fetch('data.csv');
        const data = await response.text();
        const years = [];
        const temps = [];
        const northern = [];
        const southern = [];
        const rows = data.split('\n').slice(1);
        rows.forEach(row => {
          const cols = row.split(',');
          years.push(cols[0]);
          temps.push(14 + parseFloat(cols[1]));
          northern.push(14 + parseFloat(cols[2]));
          southern.push(14 + parseFloat(cols[3]));
        });
        return { years, temps, northern, southern };
      }

