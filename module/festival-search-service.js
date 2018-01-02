/**
 * Created by JJW on 2017-07-14.
 */


var Utils = require('./util/Utils');
var Const = require('./util/const');
var FestivalModel = require("./db/model/festivalModel");

//현재 위치 주변의 장소를 검색 하는 로직
var FestivalSearchLogic = {
    execute : function(param,onSuccess,onError){

        var currentInfo_x = param.x_coord;
        var currentInfo_y = param.y_coord;
        var round = param.round;

        if(param.type == 'action-festivalSearch')
        {
            var guInfo = param.guInfo;

            FestivalModel.selectFestivalInformationByGu(guInfo, 5, function (err, rows) {

                if (err) {
                    if (onError)
                        onError(err, null);
                } else {
                    if (onSuccess)
                        onSuccess({
                            festivalList: rows,
                            placeSource: param
                        })
                }

            });
        }else
        {
            if(param.type == 'context-destPlaceSearch')
            {
                currentInfo_x = param.x_coord;
                currentInfo_y = param.y_coord;
                round = param.round;
            }else if(param.type == 'context-currentPlaceSearch')
            {
                currentInfo_x = param.x_coord;
                currentInfo_y = param.y_coord;
                round = param.round;
            }
            else
            {
                //Device 요청 시
                currentInfo_x = param.x_coord;
                currentInfo_y = param.y_coord;
                round = param.round;
            }

            FestivalModel.selectFestivalInformation(currentInfo_x, currentInfo_y, round, 5, function (err, rows) {

                if (err) {
                    if (onError)
                        onError(err, null);
                } else {
                    if (onSuccess)
                        onSuccess({
                            festivalList: rows,
                            placeSource: param
                        })
                }

            });
        }

    }
}

module["exports"] = FestivalSearchLogic;