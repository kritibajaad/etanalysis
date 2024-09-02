document.getElementById('searchButton').addEventListener('click', function() {
  const ticker = document.getElementById('tickerInput').value;
  const actionName = "details";
  const resultDivDetails = document.getElementById('resultDetails');
  const moreDetailsLink = document.getElementById('moreDetailsLink');
  const graphsLink = document.getElementById('graphsLink');

  // Clear any previous results
  resultDivDetails.innerHTML = '';
  moreDetailsLink.style.display = 'none';

  // Make the AJAX call
  fetch(`http://localhost:8080/tickerData/${ticker}?actionName=${actionName}`)
    .then(response => response.json())
    .then(data => {
      // Display the result on the page
      resultDivDetails.innerHTML = `
        <h2>${data.name} (${data.ticker})</h2>
        <p><strong>Description:</strong> ${data.description}</p>
        <p><strong>Exchange:</strong> ${data.exchangeCode}</p>
        <p><strong>Start Date:</strong> ${data.startDate}</p>
        <p><strong>End Date:</strong> ${data.endDate}</p>
      `;
      moreDetailsLink.style.display = 'inline';
      moreDetailsLink.href = `stock-details?ticker=${ticker}`;
      graphsLink.style.display = 'inline';
      graphsLink.href = `stockchart?ticker=${ticker}`;
    })
    .catch(error => {
      resultDivDetails.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
    });
});
