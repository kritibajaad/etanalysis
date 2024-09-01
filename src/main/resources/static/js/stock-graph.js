document.getElementById('fetchDataButton').addEventListener('click', function() {
  const ticker = document.getElementById('tickerInput').value;
  const actionName = "historical";
  const url = `http://localhost:8080/tickerData/${ticker}?actionName=${actionName}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        const dates = data.map(item => item.date.split('T')[0]);
        const closingPrices = data.map(item => item.close);

        // Draw the chart
        drawChart(dates, closingPrices);
      } else {
        alert('No data available for this ticker.');
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data. Please try again.');
    });
});

function drawChart(labels, data) {
  const ctx = document.getElementById('stockChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Closing Price',
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      }]
    },
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'month'
          }
        },
        y: {
          beginAtZero: false
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        }
      }
    }
  });
}
