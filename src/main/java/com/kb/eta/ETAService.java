package com.kb.eta;

import com.kb.ai.AIModelTrainer;
import com.kb.ai.DataProcessor;
import com.kb.ai.StockDataGatherer;
import com.kb.constants.ETAConstants;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;

import weka.classifiers.functions.LinearRegression;
import weka.core.Instance;
import weka.core.Instances;

@RestController
public class ETAService {

    @PostMapping("ticker")
    public String getStockMetaData(){
        return "Hello Ji";
    }


    @GetMapping("/tickerData/{ticker}")
    public String getStockMetaData(@PathVariable String ticker,  @RequestParam String actionName) {
        // String ticker = "AAPL"; // Example ticker

        String url = ETAConstants.apiUrl + ticker;

        if (actionName.equalsIgnoreCase("eodprice"))
            url = url + "/prices";
        else if (actionName.equalsIgnoreCase("historical"))
            url = url + "/prices?startDate=" + "2024-6-1&endDate=2024-8-28";

        // Setup RestTemplate
        RestTemplate restTemplate = new RestTemplate();

        // Set headers (Authorization)
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Token " + ETAConstants.apiKey);

        // Build the HttpEntity with headers
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Call the API
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        // Print the response body
        System.out.println(response.getBody());
        return response.getBody();
    }

    public static double predictNextPrice(LinearRegression model, Instances dataset) throws Exception {
        Instance lastInstance = dataset.lastInstance();
        return model.classifyInstance(lastInstance);
    }

    @GetMapping("/predictPrice/{ticker}")
    public String predictStockPrice(@PathVariable String ticker,
                                    @RequestParam String useSMA,
                                    @RequestParam int days) {

        System.out.println("Inside the predictStockPrice" + ticker + " " + useSMA + " "+ days);
        List<Double> prices = null;
        int numOfDays = 0;
        // int calendarDays = Integer.parseInt(days);
        boolean useSMAFlag = "true".equalsIgnoreCase(useSMA);

        try {
            prices = StockDataGatherer.fetchStockPrices(ticker, days);
            numOfDays = prices.size();
        }
        catch (Exception excp){
            System.out.println(Arrays.toString(excp.getStackTrace()));
        }

        // Prepare data for Weka
        Instances dataset = null;
        if (useSMAFlag){
            dataset = DataProcessor.prepareDataForAIModelWithParams(prices, numOfDays, numOfDays-1);
        } else {
            dataset = DataProcessor.prepareDataForAIModel(prices);
        }

        // Train the model
        double predictedPrice = 0;
        try {
            LinearRegression model = AIModelTrainer.trainModel(dataset);

            // Predict the next price
            predictedPrice = predictNextPrice(model, dataset);
        }
        catch (Exception exc){
            System.out.println(Arrays.toString(exc.getStackTrace()));
        }

        System.out.println("Predicted next stock price: " + Double.toString(predictedPrice));

        JSONObject json = new JSONObject();
        json.put("predictedPrice", Double.toString(predictedPrice));
        System.out.println("The size of price list is : " + prices.size());
        return json.toString();
    }

    /*
    The purpose of this method is to just test the data retrieval of data from API
    This method is NOT being called from JS or HTML page.
    * */
    @GetMapping("msg")
    public String showMessage(){
        String ticker = "AAPL";
        List<Double> prices = null;
        try {
            prices = StockDataGatherer.fetchStockPrices(ticker, Integer.getInteger("90"));
        }
        catch (Exception excp){
            System.out.println(Arrays.toString(excp.getStackTrace()));
        }

        JSONArray jsonPrices = new JSONArray(prices);
        System.out.println("Length of List is : " + prices.size());
        System.out.println("Fetched Prices (as JSON): " + jsonPrices.toString(4));
        return jsonPrices.toString(4);
    }

}