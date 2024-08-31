package com.kb.ai;

import com.kb.constants.ETAConstants;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;

import org.json.JSONArray;
import org.json.JSONObject;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class StockDataGatherer {

    public static List<Double> fetchStockPrices(String ticker, int numOfDays) throws Exception {

        LocalDate endDate = LocalDate.now().minusDays(1); // Yesterday
        LocalDate startDate = endDate.minusDays(numOfDays); // 90 days before yesterday

        // Format dates
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String startDateStr = startDate.format(formatter);
        String endDateStr = endDate.format(formatter);

        // String url = ETAConstants.apiUrl + ticker + "/prices?token=" + ETAConstants.apiKey;
        String url = ETAConstants.apiUrl + ticker + "/prices?" +
                "startDate=" + startDateStr +
                "&endDate=" + endDateStr +
                "&token=" + ETAConstants.apiKey;

        HttpResponse<JsonNode> jsonResponse = Unirest.get(url).asJson();

        JSONArray data = jsonResponse.getBody().getArray();
        List<Double> prices = new ArrayList<>();



        for (int i = 0; i < data.length(); i++) {
            JSONObject dayData = data.getJSONObject(i);
            double closePrice = dayData.getDouble("close");
            prices.add(closePrice);
        }
        System.out.println("Length of List is : " + prices.size());
        System.out.println("Fetched Prices (as List String): " + prices.toString());
        return prices;
    }

}
