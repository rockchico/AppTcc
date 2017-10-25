/**
 * Created by francisco on 01/08/17.
 */








function Filter() {


    var maxElements = 500;
    var elementCount = 0;


    var measuredValuesArray = [];








    var options = {
        stateTransition: 1.0,
        observation: 1.0,
        initialState: 1.0,
        initialCovariance: 1.0,
        processError: 0.001,
        measurementError: 0.001,
        noise: 0.25,
        //iterations: 1000,
        observationCutoff: maxElements
    };





    var stateTransitionMatrix       = $M([[options.stateTransition]]),         // A
        controlMatrix               = $M([[0]]),                                    // B
        observationMatrix           = $M([[options.observation]]),             // H
        initialStateEstimate        = $M([[options.initialState]]),            // X
        initialCovarianceEstimate   = $M([[options.initialCovariance]]),       // P
        processErrorEstimate        = $M([[options.processError]]),            // Q
        measurementErrorEstimate    = $M([[options.measurementError]]),        // R
        controlVector               = $M([[0]]),                                    // C
        measurementVector,
        filter = new LinearKalmanFilter(
            stateTransitionMatrix,
            controlMatrix,
            observationMatrix,
            initialStateEstimate,
            initialCovarianceEstimate,
            processErrorEstimate,
            measurementErrorEstimate
        ),

        measuredValues = [],
        filteredValues = [],
        predictedStateValues = [],
        predictionProbabilityValues = [],
        covarianceValues = [],
        gainValues = [],
        innovationValues = [],
        innovationCovarianceValues = [],
        measuredValue,
        filteredValue,
        predictedState,
        predictedProbability,
        covariance,
        gain,
        innovation,
        innovationCovariance;


    this.run = function () {


        measuredValues = [];
        filteredValues = [];
        predictedStateValues = [];
        predictionProbabilityValues = [];
        covarianceValues = [];
        gainValues = [];
        innovationValues = [];
        innovationCovarianceValues = [];

        //console.log("measuredValuesArray.length = "+measuredValuesArray.length);

        for (var i = 0; i < measuredValuesArray.length; i++) {

            //measuredValue = process.getMeasuredValue(i);

            measuredValue = measuredValuesArray[i];

            measurementVector = $M([[measuredValue]]);


            filter.predict(controlVector);
            filter.observe(i < options.observationCutoff ? measurementVector : null);
            filter.update();

            filteredValue = filter.getStateEstimate().e(1, 1);

            predictedState = filter.predictedStateEstimate.e(1, 1);
            predictedProbability = filter.predictedProbabilityEstimate.e(1, 1);
            covariance = filter.covarianceEstimate.e(1, 1);
            gain = filter.kalmanGain.e(1, 1);
            innovation = filter.innovation.e(1, 1);
            innovationCovariance = filter.innovationCovariance.e(1, 1);

            measuredValues.push(measuredValue);
            filteredValues.push(filteredValue);

            predictedStateValues.push(predictedState);
            predictionProbabilityValues.push(predictedProbability);
            covarianceValues.push(covariance);
            gainValues.push(gain);
            innovationValues.push(innovation);
            innovationCovarianceValues.push(innovationCovariance);

            //console.log("predictedState");
            //console.log(predictedState);
        }
    }




    this.getFilteredValues = function () {
        return filteredValues;
    }

    this.getFilteredValue = function () {
        return filteredValues[elementCount-1];
    }



    this.getMeasuredValues = function () {
        return measuredValues;
    }

    this.addValue = function(value) {

        // The push() method adds new items to the end of an array, and returns the new length.
        if(elementCount < maxElements) {
            measuredValuesArray.push(value);
            elementCount ++;
        } else {
            measuredValuesArray.shift();

            measuredValuesArray.push(value);
        }

    }




};