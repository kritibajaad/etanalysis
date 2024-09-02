document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const ticker = urlParams.get('ticker');
  document.getElementById('tickerDisplay').textContent = ticker;
  const graphsLink = document.getElementById('graphsLink');

  let latestClosePrice = null; // Variable to store the latest close price

  document.getElementById('priceButton').addEventListener('click', function() {
    const actionName = "eodprice";
    const resultDivPrices = document.getElementById('resultPrices');

    // Clear any previous results
    resultDivPrices.innerHTML = '';
    graphsLink.style.display = 'none';

    // Make the AJAX call
    fetch(`http://localhost:8080/tickerData/${ticker}?actionName=${actionName}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          latestClosePrice = data[0].close; // Store the latest closing price

          // Create a table to display the data
          let table = '<h2>Latest Prices</h2><br><table border="1"><thead><tr><th>Date</th><th>Open</th><th>High</th><th>Low</th><th>Close</th><th>Volume</th><th>Adjusted Open</th><th>Adjusted High</th><th>Adjusted Low</th><th>Adjusted Close</th><th>Adjusted Volume</th></tr></thead><tbody>';

          // Iterate over the array and add rows to the table
          data.forEach(item => {
            table += `
              <tr>
                <td>${new Date(item.date).toLocaleDateString()}</td>
                <td>${item.open}</td>
                <td>${item.high}</td>
                <td>${item.low}</td>
                <td>${item.close}</td>
                <td>${item.volume}</td>
                <td>${item.adjOpen}</td>
                <td>${item.adjHigh}</td>
                <td>${item.adjLow}</td>
                <td>${item.adjClose}</td>
                <td>${item.adjVolume}</td>
              </tr>
            `;
          });

          table += '</tbody></table>';

          // Display the table in the result div
          resultDivPrices.innerHTML = table;
        } else {
          resultDivPrices.innerHTML = '<p>No data available.</p>';
        }
        graphsLink.style.display = 'inline';
        graphsLink.href = `stockchart?ticker=${ticker}`;
      })
      .catch(error => {
        resultDivPrices.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
      });
  });

  document.getElementById('predictButton').addEventListener('click', function() {
    // Show the prediction options and button
    document.getElementById('predictionOptions').style.display = 'block';
  });

  document.getElementById('submitPrediction').addEventListener('click', function() {
    const useSMA = document.getElementById('useSMA').checked;
    const days = document.getElementById('daysInput').value;
    const resultDivPrediction = document.getElementById('resultPrediction');

    // Clear any previous results
    resultDivPrediction.innerHTML = '';

    // Validate input
    if (isNaN(days) || days <= 0) {
      resultDivPrediction.innerHTML = '<p style="color:red;">Please enter a valid number of days.</p>';
      return;
    }

    // Build the API URL with prediction parameters
    const url = `http://localhost:8080/predictPrice/${ticker}?useSMA=${useSMA}&days=${days}`;

    // Make the AJAX call for prediction
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let suggestion = '';
        if (latestClosePrice !== null) {
          if (latestClosePrice < data.predictedPrice) {
            suggestion = '<p style="color:green;">Suggestion: Buy the this stock.</p>';
          } else {
            suggestion = '<p style="color:red;">Suggestion: Do NOT buy the this stock.</p>';
          }
        } else {
          suggestion = '<p style="color:orange;">Suggestion: Latest price data is not available. Please check latest price first and then run the prediction again.</p>';
        }

        resultDivPrediction.innerHTML = `
          <h2>Predicted Future Price</h2>
          <p><strong>Predicted Price:</strong> ${data.predictedPrice}</p>
          ${suggestion}
        `;
         graphsLink.style.display = 'inline';
         graphsLink.href = `stockchart?ticker=${ticker}`;
      })
      .catch(error => {
        resultDivPrediction.innerHTML = `<p>Error fetching prediction: ${error.message}</p>`;
      });
  });
});
