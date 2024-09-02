document.addEventListener('DOMContentLoaded', function() {
	  const urlParams = new URLSearchParams(window.location.search);
	  const ticker = urlParams.get('ticker');
	  document.getElementById('tickerInput').value = ticker;

document.getElementById('fetchDataButton').addEventListener('click', function() {
  const ticker = document.getElementById('tickerInput').value;
  const timeRange = document.getElementById('timeRange').value;
  const detailsLink = document.getElementById('detailsLink');
  let startDate, endDate, tmpDate;
  const today = new Date();

  if (!ticker) {
    alert("Please enter a valid stock ticker.");
    return;
  }

  if (timeRange === 'days') {
    const days = document.getElementById('daysInput').value;
    if (!days || isNaN(days) || days <= 0) {
      alert("Please enter a valid number of days.");
      return;
    }
    endDate = new Date(today);
    startDate = new Date(today);
    startDate.setDate(startDate.getDate() - days);

  } else if (timeRange === 'year') {
    const year = document.getElementById('yearInput').value;
    if (!year || isNaN(year) || year < 1900 || year > 2100) {
      alert("Please enter a valid year.");
      return;
    }
    startDate = new Date(`${year}-01-01`);
    endDate = new Date(`${year}-12-31`);

  } else if (timeRange === 'month') {
    const month = document.getElementById('monthInput').value;
    if (!month) {
      alert("Please select a valid month.");
      return;
    }
    startDate = new Date(month + "-01");
    tmpDate = new Date(month);
    endDate = new Date(startDate.getFullYear(), startDate.getMonth() +2, 0); // Last day of the month
  }

  // Format dates to yyyy-mm-dd
  const startDateStr = startDate.toISOString().split('T')[0];
  const endDateStr = endDate.toISOString().split('T')[0];

  const apiUrl = `http://localhost:8080/tickerData/${ticker}?actionName=historical&startDate=${startDateStr}&endDate=${endDateStr}`;

  // Clear any previous chart
  const ctx = document.getElementById('stockChart').getContext('2d');
  if (window.stockChart && window.stockChart instanceof Chart) {
    window.stockChart.destroy();
  }

  // Fetch the data from the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        alert("No data available for the selected time range.");
        return;
      }

      const labels = data.map(entry => new Date(entry.date));
      const prices = data.map(entry => entry.close);

      // Draw the chart
      window.stockChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: `${ticker.toUpperCase()} Stock Price`,
            data: prices,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                tooltipFormat: 'MMM d, yyyy'
              },
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Price (USD)'
              }
            }
          }
        }
      });
      detailsLink.style.display = 'inline';
      detailsLink.href = `stock-details?ticker=${ticker}`;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert("Failed to fetch data. Please try again.");
    });
  });
});


