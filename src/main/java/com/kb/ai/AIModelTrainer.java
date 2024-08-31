package com.kb.ai;

import weka.classifiers.functions.LinearRegression;
import weka.core.Instances;

public class AIModelTrainer {
    public static LinearRegression trainModel(Instances dataset) throws Exception {
        LinearRegression model = new LinearRegression();
        model.buildClassifier(dataset);
        return model;
    }
}
