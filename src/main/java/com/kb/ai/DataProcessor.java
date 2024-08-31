package com.kb.ai;

import weka.core.Attribute;
import weka.core.DenseInstance;
import weka.core.Instances;

import java.util.ArrayList;
import java.util.List;

public class DataProcessor {

    // Method to calculate SMA
    private static double calculateSMA(List<Double> prices, int period, int endIndex) {
        System.out.println("Inside calculateSMA");
        double sum = 0.0;
        for (int i = endIndex; i > endIndex - period && i >= 0; i--) {
            sum += prices.get(i);
        }
        return sum / period;
    }

    // Method to calculate Volatility
    private static double calculateVolatility(List<Double> prices, int period, int endIndex) {
        System.out.println("Inside calculateVolatility");
        double mean = calculateSMA(prices, period, endIndex);
        double sumSquareDiffs = 0.0;
        for (int i = endIndex; i > endIndex - period && i >= 0; i--) {
            sumSquareDiffs += Math.pow(prices.get(i) - mean, 2);
        }
        return Math.sqrt(sumSquareDiffs / period);
    }

    public static Instances prepareDataForAIModel(List<Double> prices) {
        System.out.println("Inside prepareDataForAIModel without SMA & Velocity");
        // Create attributes
        ArrayList<Attribute> attributes = new ArrayList<Attribute>();
        attributes.add(new Attribute("Price"));

        // Create dataset
        Instances dataset = new Instances("StockPrices", attributes, prices.size());
        dataset.setClassIndex(dataset.numAttributes() - 1);

        // Add data to dataset
        for (double price : prices) {
            DenseInstance instance = new DenseInstance(1);
            instance.setValue(attributes.get(0), price);
            dataset.add(instance);
        }

        return dataset;
    }

    public static Instances prepareDataForAIModelWithParams(List<Double> prices, int smaPeriod, int volatilityPeriod) {
        System.out.println("smaPeriod inside prepareDate is : " + smaPeriod);
        System.out.println("volatilityPeriod inside prepareDate is : : " + volatilityPeriod);
        // Create attributes
        ArrayList<Attribute> attributes = new ArrayList<Attribute>();
        attributes.add(new Attribute("Price"));
        attributes.add(new Attribute("SMA"));
        attributes.add(new Attribute("Volatility"));

        // Create dataset
        Instances dataset = new Instances("StockPrices", attributes, prices.size());
        dataset.setClassIndex(0);  // Price is the target variable

        // Add data to dataset
        for (int i = 0; i < prices.size(); i++) {
            DenseInstance instance = new DenseInstance(attributes.size());

            // Set the price
            instance.setValue(attributes.get(0), prices.get(i));

            // Calculate and set SMA
            double sma = i >= smaPeriod - 1 ? calculateSMA(prices, smaPeriod, i) : Double.NaN;
            instance.setValue(attributes.get(1), sma);

            // Calculate and set Volatility
            double volatility = i >= volatilityPeriod - 1 ? calculateVolatility(prices, volatilityPeriod, i) : Double.NaN;
            instance.setValue(attributes.get(2), volatility);

            // Add instance to dataset if SMA and Volatility are not NaN
            if (!Double.isNaN(sma) && !Double.isNaN(volatility)) {
                dataset.add(instance);
            }
        }

        return dataset;
    }

}
