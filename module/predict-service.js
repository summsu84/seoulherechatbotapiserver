/**
 * Created by JJW on 2017-10-13.
 */

var Utils = require('./util/Utils');
var Const = require('./util/const');
var request = require('request');

//현재 위치 주변의 장소를 검색 하는 로직
var PredictionPlaceLogic = {
    execute : function(param,onSuccess,onError){


        var host = 'https://seoulherepredition.herokuapp.com/predict';

        var parameters = param.parameters;
        var babyInfo = (parameters.BabyInfo == '아니요') ? 0 : 1;
        var companionInfo = parameters.CompanionInfo;
        var sexInfo = (parameters.SexInfo == '남') ? 0 : 1;
        var visitSeoulInfo = parameters.VisitSeoulInfo;
        var ageInfo = parameters.AgeInfo




        var predictionValue =
        [{
            "Age" : ageInfo,
            "Sex" : sexInfo,
            "Companion" : companionInfo,
            "Baby" : babyInfo,
            "VisitSeoul" : visitSeoulInfo
        }];


        const requestData = {
            url: host,
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            json: predictionValue
        };

        request(requestData, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let predictionList = body.prediction;
                if(predictionList > 0)
                {
                    let predict = predictionList[0];
                    //먼저 없는 경우 확인 (result 0인경우)
                    console.log(">>Predictionvalue.. : " + predict);
                    if (onSuccess)
                        onSuccess({
                            predictValue: predict,
                            placeSource: param
                        })
                }else {
                    //error
                    if (onError)
                        onError(err, null);
                }

            }else{
                //error 인경우
                if (onError)
                    onError(err, null);
            }

        });
    }
}

module["exports"] = PredictionPlaceLogic;