document.getElementById('searchButton').addEventListener('click', function() {
  const ticker = document.getElementById('tickerInput').value;
  const actionName = "details";
  const resultDiv = document.getElementById('result');

  // Clear any previous results
  resultDiv.innerHTML = '';

  // Make the AJAX call
  fetch(`http://localhost:8080/tickerData/${ticker}?actionName=${actionName}`)
    .then(response => response.json())
    .then(data => {
      // Display the result on the page
      resultDiv.innerHTML = `
        <h2>${data.name} (${data.ticker})</h2>
        <p><strong>Description:</strong> ${data.description}</p>
        <p><strong>Exchange:</strong> ${data.exchangeCode}</p>
        <p><strong>Start Date:</strong> ${data.startDate}</p>
        <p><strong>End Date:</strong> ${data.endDate}</p>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    });
});


document.getElementById('priceButton').addEventListener('click', function() {
  const ticker = document.getElementById('tickerInput').value;
  const actionName = "eodprice";
  const resultDiv = document.getElementById('result');

  // Clear any previous results
  resultDiv.innerHTML = '';

  // Make the AJAX call
  fetch(`http://localhost:8080/tickerData/${ticker}?actionName=${actionName}`)
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        // Create a table to display the data
        let table = '<table border="1"><thead><tr><th>Date</th><th>Open</th><th>High</th><th>Low</th><th>Close</th><th>Volume</th><th>Adjusted Open</th><th>Adjusted High</th><th>Adjusted Low</th><th>Adjusted Close</th><th>Adjusted Volume</th></tr></thead><tbody>';

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
        resultDiv.innerHTML = table;
      } else {
        resultDiv.innerHTML = '<p>No data available.</p>';
      }
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    });
});


document.getElementById('submitPrediction').addEventListener('click', function() {
  const ticker = document.getElementById('tickerInput').value;
  const useSMA = document.getElementById('useSMA').checked;
  const useVolatility = document.getElementById('useVolatility').checked;
  const days = document.getElementById('daysInput').value;
  const resultDiv = document.getElementById('result');

  // Clear any previous results
  resultDiv.innerHTML = '';

  // Validate input
  if (!ticker || isNaN(days) || days <= 0) {
    resultDiv.innerHTML = '<p>Please enter a valid ticker and number of days.</p>';
    return;
  }

  // Build the API URL with prediction parameters
  const url = `http://localhost:8080/predictPrice?ticker=${ticker}&useSMA=${useSMA}&useVolatility=${useVolatility}&days=${days}`;

  // Make the AJAX call for prediction
  fetch(url)
    .then(response => response.json())
    .then(data => {
      resultDiv.innerHTML = `
        <h2>Predicted Future Price</h2>
        <p><strong>Predicted Price:</strong> ${data.predictedPrice}</p>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>Error fetching prediction: ${error.message}</p>`;
    });
});