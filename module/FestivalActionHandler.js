/**
 * Created by JJW on 2017-07-20.
 */


var RecommendFestivalSearchLogic = require("./festival-recommend-service");
var FestivalSearchLogic = require("./festival-search-service");
var RequestHandlerBase = require("./RequestHandlerBase");
var _ = require('lodash');
var Const = require('./util/const');
var Utils = require('./util/Utils');
var FestivalActionHandler = function(){

}

_.extend(FestivalActionHandler.prototype,RequestHandlerBase.prototype);

FestivalActionHandler.prototype.processAction = function(action, res, option) {

    var self = this;

    /**********************************************************
     *  Source : API.AI
     *  Desc : GuInfo 정보와 함께 해당 구 주변의 문화 행사 정보를 가져온다.
     *  Remark : 현재 해당 엔티티 정보 포함은 API.AI와 추후 연동 필요
     ***********************************************************/
    if (action == 'action-festivalSearch') {

        var  param =
        {
            type : action,
            guInfo : option.parameters.GuInfo
        }

        FestivalSearchLogic.execute(param, function (result) {

            var guInfo = param.guInfo;

            var responseMessage = "요청 하신 " + guInfo + " 지역에서 " + result.festivalList.length.toString() + " 개의 문화 행사를 검색하였습니다.'자세히 보기'를 클릭하시면 자세히 보실 수 있습니다.";


            self.successResponse(res, Const.responsecodeSucceed, responseMessage, {
                festivalList: result.festivalList,
                placeSource: result.placeSource
            });

        }, function (err, code) {

            if (err) {

                self.errorResponse(
                    response,
                    Const.httpCodeSeverError
                );

            } else {

                self.successResponse(res, code);

            }

        });
        //var testDump = Utils.objCopy(Const.TestData);
        //self.successResponse(res, Const.responsecodeSucceed, "아래 장소는 어때요?", testDump);
    }
    /**********************************************************
     *  Source : 디바이스
     *  Desc : 요청지 주변 문화행사를 보여준다..
     *  Remark : 현재 해당 엔티티 정보 포함은 API.AI와 추후 연동 필요
     ***********************************************************/

    else if (action == 'action-festivalSearchFromDevice') {


       var  param =
            {
                type : 'device',
                x_coord : option.place.x_coord ,
                y_coord : option.place.y_coord ,
                round : option.round
            }


        FestivalSearchLogic.execute(param, function (result) {

            self.successResponse(res, Const.responsecodeSucceed, "문화행사검색", {
                festivalList: result.festivalList,
                placeSource: result.placeSource
            });

        }, function (err, code) {

            if (err) {

                self.errorResponse(
                    response,
                    Const.httpCodeSeverError
                );

            } else {

                self.successResponse(res, code);

            }

        });
        //var testDump = Utils.objCopy(Const.TestData);
        //self.successResponse(res, Const.responsecodeSucceed, "아래 장소는 어때요?", testDump);
    }
    /**********************************************************
     *  Source : 디바이스
     *  Desc : 랜덤으로 문화 행사를 추천 한다.
     * Parameters ; Get Request
     ***********************************************************/
    else if (action == 'action-request-festival-recommend')
    {
        console.log(">>action-request-festival-recommend request");
        var param = {};

        RecommendFestivalSearchLogic.execute(param, function(result){

            var responseMessage =  result.festivalList.length.toString() + " 개의 추천 문화 행사를 검색하였습니다.'자세히 보기'를 클릭하시면 자세히 보실 수 있습니다.";

            self.successResponse(res,Const.responsecodeSucceed, responseMessage, {
                festivalList : result.festivalList
            });

        },function(err,code){

            if(err){

                self.errorResponse(
                    response,
                    Const.httpCodeSeverError
                );

            }else{

                self.successResponse(res,code);

            }

        });

    }
}

module["exports"] = new FestivalActionHandler();