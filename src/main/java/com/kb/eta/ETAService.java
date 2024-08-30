package com.kb.eta;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
public class ETAService {

    @GetMapping("msg")
    public String showMessage(){
        return "Hello Ji";
    }

    @PostMapping("ticker")
    public String getStockMetaData(){
        return "Hello Ji";
    }


    @GetMapping("/tickerData/{ticker}")
    public String getStockMetaData(@PathVariable String ticker,  @RequestParam String actionName) {
        // String ticker = "AAPL"; // Example ticker
        String apiKey = "9945aa2975816044fcbdd6088c7ce48efb9c6456"; // Your Tiingo API Key

        String url = "https://api.tiingo.com/tiingo/daily/" + ticker;

        if (actionName.equalsIgnoreCase("eodprice"))
            url = url + "/prices";
        else if (actionName.equalsIgnoreCase("historical"))
            url = url + "/prices?startDate=" + "2024-6-1&endDate=2024-8-28";

        // Setup RestTemplate
        RestTemplate restTemplate = new RestTemplate();

        // Set headers (Authorization)
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Token " + apiKey);

        // Build the HttpEntity with headers
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // Call the API
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        // Print the response body
        System.out.println(response.getBody());
        return response.getBody();
    }

}