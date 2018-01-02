/**
 * Created by JJW on 2017-07-14.
 */


var Utils = require('./util/Utils');
var Const = require('./util/const');
var IntentRegModel = require("./db/model/intentRegModel");

//현재 위치 주변의 장소를 검색 하는 로직
var IntentRequestLogic = {
    selectIntentRequest : function(param,onSuccess,onError){

        IntentRegModel.selectIntentRequest(param, function (err, rows) {

            if (err) {
                if (onError)
                    onError(err, null);
            } else {
                if (onSuccess)
                    onSuccess({
                        commentList: rows,
                        placeId: param
                    })
            }

        });

    },

    writeIntentRequest : function(param,onSuccess,onError){

        IntentRegModel.insertIntentRequest(param, function (err, rows) {

            if (err) {
                if (onError)
                    onError(err, null);
            } else {
                if (onSuccess)
                    onSuccess({
                        msg : '성공적으로 등록되었습니다.'
                    })
            }

        });

    }
}

module["exports"] = IntentRequestLogic;