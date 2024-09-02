# etanalysis

## Overview

This project is a Spring Boot-based Java application developed to predict stock prices and analyze market trends. It utilizes Gradle for build and dependency management, and the Tiingo open market data API for retrieving and processing stock and market data. The application is designed to expose REST APIs, which are consumed by HTML and JavaScript pages through AJAX calls, providing a seamless and interactive user experience.

## Key Features

- **Stock Price Prediction**: Using the WEKA machine learning API, models are trained with historical market data to predict stock prices. The application offers various prediction options, including simple moving averages and volatility analysis.

- **Market Data Retrieval**: By integrating the Tiingo API, the application retrieves detailed stock information such as metadata, range, and standard data. This data is then processed and displayed in a user-friendly format, including tables and formatted text.

- **AJAX-Based Interaction**: Users can input a stock ticker symbol, and the application retrieves the relevant data from the server using AJAX. The stock information and pricing data are then displayed dynamically on the web page.

- **REST API Development**: The application exposes REST APIs that are consumed by the front-end, allowing for a smooth and interactive user experience.

- **Machine Learning Integration**: The application uses various AI model APIs such as Linear Regression, SMO (Support Vector Machine), and RandomForest to analyze and predict stock prices. This includes handling data in JSON structures, connecting to databases, and processing data files.

- **Future Enhancements**:
  - **Real-Time Alerts**: Integration of real-time alerts for significant market changes.
  - **User Accounts**: Support for user accounts to provide personalized data storage.
  - **Advanced Analytics**: Integration of advanced analytics, including news source analysis.
  - **Options Trading**: Expansion to include other forms of trading such as Options Trading.

## Technologies Used

- **Spring Boot**: Backend framework for building RESTful APIs.
- **Gradle**: Build and dependency management tool.
- **Tiingo API**: External API used for retrieving stock and market data.
- **WEKA Machine Learning API**: Java API used for training and applying machine learning models.
- **AJAX**: Used for asynchronous requests between the client and server.
- **HTML/CSS/JavaScript**: Front-end technologies for creating user interfaces.

### Prerequisites

- JDK 11 or higher
- Gradle 6.x or higher
- A Tiingo API key for market data retrieval

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/stock-market-prediction-tool.git

 
