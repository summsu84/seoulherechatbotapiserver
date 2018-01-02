/**
 * Created by JJW on 2017-07-14.
 */


var Utils = require('./util/Utils');
var Const = require('./util/const');
var PlaceModel = require("./db/model/placeModel");

//현재 위치 주변의 장소를 검색 하는 로직
var CurrentPlaceSearchLogic = {
    execute : function(param,onSuccess,onError){

        var currentInfo_x = param.x_coord;
        var currentInfo_y = param.y_coord;
        var round = param.round;
        var currentPlaceRequestType = null;
        if(param.hasOwnProperty('currentPlaceRequestType'))
        {
            currentPlaceRequestType = param.currentPlaceRequestType;
        }else
        {
            currentPlaceRequestType =    Const.deviceReqCurrentPlace;
        }


/*        if(Utils.isEmpty(currentInfo_x)){

            if(onError)
                onError(null,Const.resNoCoordinate);

            return;

        }
        if(Utils.isEmpty(cuurentInfo_y)){

            if(onError)
                onError(null,Const.resNoCoordinate);

            return;

        }*/


        if(currentPlaceRequestType == Const.deviceReqCurrentPlace) {


            PlaceModel.selectCurrentPlaceList(currentInfo_x, currentInfo_y, round, 5, function (err, rows) {

                if (err) {
                    if (onError)
                        onError(err, null);
                } else {
                    if (onSuccess)
                        onSuccess({
                            placeList: rows,
                            placeSource: param
                        })
                }
                /*
                 if(rows == null){
                 //레코드가 없는 경우


                 } else {
                 //레코드가 있는 경우

                 }*/

            });
        }else if(currentPlaceRequestType == Const.deviceReqCurrentPlaceRecommend) {

            //현재 위치에 랜덤으로 보여주기
            PlaceModel.selectCurrentRecommendPlaceList(currentInfo_x, currentInfo_y, round, 5, function (err, rows) {

                if (err) {
                    if (onError)
                        onError(err, null);
                } else {
                    if (onSuccess)
                        onSuccess({
                            placeList: rows,
                            placeSource: param
                        })
                }
                /*
                 if(rows == null){
                 //레코드가 없는 경우


                 } else {
                 //레코드가 있는 경우

                 }*/

            });
        }

    }
}

module["exports"] = CurrentPlaceSearchLogic;