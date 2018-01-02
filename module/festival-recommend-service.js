/**
 * Created by JJW on 2017-07-14.
 */


var Utils = require('./util/Utils');
var Const = require('./util/const');
var FestivalModel = require("./db/model/festivalModel");

/**
 * 문화 행사를 임의로 추천 한다.
 * @type {{execute: RecommendFestivalSearchLogic.execute}}
 */
var RecommendFestivalSearchLogic = {
    execute : function(param,onSuccess,onError){

        FestivalModel.selectRecommendFestivalList(5, function (err, rows) {

            if (err) {
                if (onError)
                    onError(err, null);
            } else {
                if (onSuccess)
                    onSuccess({
                        festivalList: rows
                    })
            }

        });

    }
}

module["exports"] = RecommendFestivalSearchLogic;