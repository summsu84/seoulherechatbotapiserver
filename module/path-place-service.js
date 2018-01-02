/**
 * Created by JJW on 2017-07-14.
 */


var Utils = require('./util/Utils');
var PlaceModel = require("./db/model/placeModel");

//현재 위치 주변의 장소를 검색 하는 로직
var PathPlaceSearchLogic = {
    execute : function(param,onSuccess,onError){

        var currentInfo_x = param.x_coord;
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

        }


        PlaceModel.selectCurrentPlaceList(currentInfo_x, cuurentInfo_y, 5, function (err,rows) {

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
            /*
             if(rows == null){
             //레코드가 없는 경우


             } else {
             //레코드가 있는 경우

             }*/

        });

    }
}

module["exports"] = PathPlaceSearchLogic;