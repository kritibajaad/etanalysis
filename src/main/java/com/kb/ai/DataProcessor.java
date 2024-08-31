package com.kb.ai;

import weka.core.Attribute;
import weka.core.DenseInstance;
import weka.core.Instances;

import java.util.ArrayList;
import java.util.List;

public class DataProcessor {

    public static Instances prepareDataForAIModel(List<Double> prices) {
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
}
