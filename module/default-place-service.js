/**
 * Created by JJW on 2017-07-14.
 */



var Utils = require('./util/Utils');
var PlaceModel = require("./db/model/placeModel");

//현재 위치 주변의 장소를 검색 하는 로직
var DefaultPlaceSearchLogic = {
    execute : function(onSuccess,onError){


        PlaceModel.selectPlaceAll(function (err,rows) {

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
    updateViewCount : function(placeId, onSuccess, onError){

        PlaceModel.updateViewCount(placeId, function (err,rows) {

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
    }
}

module["exports"] = DefaultPlaceSearchLogic;