/**
 * Created by JJW on 2017-07-20.
 */


var IntentRequestLogic = require("./intent-req-service");
var RequestHandlerBase = require("./RequestHandlerBase");
var _ = require('lodash');
var Const = require('./util/const');
var Utils = require('./util/Utils');
var IntentRegActionHandler = function(){

}

_.extend(IntentRegActionHandler.prototype,RequestHandlerBase.prototype);

IntentRegActionHandler.prototype.processAction = function(action, params, res) {

    var self = this;

    /**********************************************************
     *  Source : API.AI
     *  Desc : GuInfo 정보와 함께 해당 구 주변의 문화 행사 정보를 가져온다.
     *  Remark : 현재 해당 엔티티 정보 포함은 API.AI와 추후 연동 필요
     ***********************************************************/

    if (action == 'action-selectIntentRequest') {

        let placeId = params;

        IntentRequestLogic.selectCoomments(placeId, function (result) {

            let responseMessage = "select success";


            self.successResponse(res, Const.responsecodeSucceed, responseMessage, result);

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

    else if (action == 'action-insertIntentRequest') {


       let regParam = params;


        IntentRequestLogic.writeIntentRequest(regParam, function (result) {

            self.successHtmlResponse(res, Const.responsecodeSucceed, "댓글작성완료", result);

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

    }
}

module["exports"] = new IntentRegActionHandler();