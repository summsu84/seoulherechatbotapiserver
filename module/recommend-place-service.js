/**
 * Created by JJW on 2017-07-14.
 */


var Utils = require('./util/Utils');
var PlaceModel = require("./db/model/placeModel");
var PredictionLogic = require("./predict-service")

//현재 위치 주변의 장소를 검색 하는 로직
var RecommendPlaceSearchLogic = {
    execute : function(param,   onSuccess,  onError){

       /* var currentInfo_x = param.x_coord;
        var cuurentInfo_y = param.y_coord;

        if(Utils.isEmpty(currentInfo_x)){

            if(onError)
                onError(null,Const.resNoCoordinate);

            return;

        }
        if(Utils.isEmpty(cuurentInfo_y)){

            if(onError)
                onError(null,Const.resNoCoordinate);

            return;

        }*/

        PlaceModel.selectRecommendPlaceList(5, function (err,rows) {

            if(err)
            {
                if(onError)
                    onError(err, null);
            }else
            {
                if(onSuccess)
                    onSuccess({
                        placeList : rows
                    })
            }

        });

    },
    executePrediction : function(param,   onSuccess,  onError){

        //예측 서버에 값을 전달하여 결과 값을 받아 온다.
        PredictionLogic.execute(param, function(predictValue){

            let predictCode = predictValue.predictValue;

            PlaceModel.selectPredictionRecommendPlaceList(predictCode, 5, function (err,rows) {

                if(err)
                {
                    if(onError)
                        onError(err, null);
                }else
                {
                    if(onSuccess)
                        onSuccess({
                            placeList : rows
                        })
                }

            });
        }, function(err){
            if(onError)
                onError(err, null);
        })






    }
}

module["exports"] = RecommendPlaceSearchLogic;