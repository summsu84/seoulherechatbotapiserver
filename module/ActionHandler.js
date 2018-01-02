/**
 * Created by JJW on 2017-07-20.
 */


var CurrentPlaceSearchLogic = require("./current-place-service");
var DestPlaceSearchLogic = require("./dest-place-service");
var PathPlaceSearchLogic = require("./path-place-service");
var RecommendPlaceSearchLogic = require("./recommend-place-service");
var FestivalSearchLogic = require("./festival-search-service");
var DefaultPlaceSearchLogic = require("./default-place-service");

var RequestHandlerBase = require("./RequestHandlerBase");
var _ = require('lodash');
var Const = require('./util/const');
var Utils = require('./util/Utils');
var ActionHandler = function(){

}

_.extend(ActionHandler.prototype,RequestHandlerBase.prototype);

ActionHandler.prototype.processAction = function(action, res, option){

    var self = this;


    /**
     *  Source : API.AI
     *  Desc : 장소 추천 하기
     */
    if(action == 'action-recommendPlaceSearch')
    {

        RecommendPlaceSearchLogic.execute(param, function(result){


            self.successResponse(res,Const.responsecodeSucceed, Const.responseMessageRecommendPlaceSearch, {
                placeList : result.placeList
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
        //var testDump = Utils.objCopy(Const.TestData);
        //self.successResponse(res, Const.responsecodeSucceed, "아래 장소는 어때요?", testDump);
    }
    /**********************************************************
     *  Source : API.AI
     *  Desc : 현재 위치 주변 검색하기
     *  Remark : 현재 현재 위치 주변 검색하기는 디바이스로 부터 요청 메시지를 받아서 처리하도록 구성
     ***********************************************************/
    else if(action == 'action-request-detail-place-recommend')
    {

        RecommendPlaceSearchLogic.execute(param, function(result){

            self.successResponse(res,Const.responsecodeSucceed, Const.responseMessageRecommendPlaceSearch, {
                placeList : result.placeList
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
        //var testDump = Utils.objCopy(Const.TestData);
        //self.successResponse(res, Const.responsecodeSucceed, "아래 장소는 어때요?", testDump);
    }
    /**********************************************************
     *  Source : API.AI
     *  Desc : 현재 위치 주변 검색하기
     *  Remark : 현재 현재 위치 주변 검색하기는 디바이스로 부터 요청 메시지를 받아서 처리하도록 구성
     ***********************************************************/
    else if(action == 'action-currentPlaceSearch')
    {

        console.log(">>action-request-place-current request");
        var param =
        {
            x_coord : option.place.x_coord,
            y_coord : option.place.y_coord,
            round : option.round
        }

        CurrentPlaceSearchLogic.execute(param, function(result){


            self.successResponse(res, Const.responsecodeSucceed, Const.responseMessageCurrentPlaceSearch, {
                placeList : result.placeList,
                placeSource: result.placeSource
            });

        },function(err,code){

            if(err){

                self.errorResponse(
                    response,
                    Const.httpCodeSeverError
                );
0
            }else{

                self.successResponse(res,code);

            }

        });

        //var testDump = Utils.objCopy(Const.TestData);
        //self.successResponse(res, Const.responsecodeSucceed, "현재 위치 주변의 장소를 검색했어요? 어때요?", testDump);

    }
    /**********************************************************
     *  Source : API.AI
     *  Desc : 목적지 주변 검색 (엔티티 정보 포함)
     *  Remark : 현재 해당 엔티티 정보 포함은 API.AI와 추후 연동 필요
     ***********************************************************/
    else if(action == 'action-destPlaceSearch')
    {
        var param =
        {
            x_coord : '37.5478818',
            y_coord : '126.8599269'
        }
        //현재 위치 주변 검색..
        DestPlaceSearchLogic.execute(param, function(result){

            self.successResponse(res,Const.responsecodeSucceed,{
                placeList : result.placeList
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
    /**********************************************************
     *  Source : API.AI
     *  Desc : 목적지 주변 검색 (엔티티 정보 미포함 - 대화형형)
     * Parmeters
     *  - DestLocation : 요청한 목적지 좌표 (Format : C 34.123456 123.1234567
     *  - ActionInComplete : 대화의 컨텍스트가 완료되었는지 여부 (False : 완료, True : 미완료)
     ***********************************************************/
    else if(action == 'action-destPlaceSearchNoEntity')
    {
        /*var param =
        {
            x_coord : '37.5478818',
            y_coord : '126.8599269'
        }
        //현재 위치 주변 검색..
        DestPlaceSearchLogic.execute(param, function(result){

            self.successResponse(res,Const.responsecodeSucceed,{
                placeList : result.placeList
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

        });*/
        //C:37.555619_127.04365500000002
        //C 37.555619 127.04365500000002
        //var locationLatLon = option.parameters.DestLocation.replace("C:",  "");
        var locationLatLon = option.parameters.DestLocation;
        var tmpResult = locationLatLon.split(' ');
        var tmpXCoord = tmpResult[1];
        var tmpYCoord = tmpResult[2];
        var param =
        {
            x_coord : tmpXCoord,
            y_coord : tmpYCoord,
            round : 1
        };

        DestPlaceSearchLogic.execute(param, function(result){

            self.successResponse(res, Const.responsecodeSucceed, Const.responseMessageDestPlaceSearchNoEntity, {
                placeList : result.placeList,
                placeSource: result.placeSource
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

        /*var testDump = Utils.objCopy(Const.TestData);
        self.successResponse(res, Const.responsecodeSucceed, "요청하신 장소 주변을 검색 했어요? 어때요?", testDump);*/

    }
    /**********************************************************
     *  Source : API.AI
     *  Desc : 현재 위치 답변 관련 액션 (엔티티 정보 미포함 - 대화형형)
     * Parmeters
     *  - Lat : 요청한 목적지 좌표 (Format : 34.123456 )
     *  - Lon : 요청한 목적지 좌표 (Format : 123.1234567 )
     *  - ActionInComplete : 대화의 컨텍스트가 완료되었는지 여부 (False : 완료, True : 미완료)
     ***********************************************************/
    else if(action == 'action-inputLatLon')
    {

        var tmpXCoord = option.parameters.Lat
        var tmpYCoord = option.parameters.Lon
        var param =
        {
            x_coord : tmpXCoord,
            y_coord : tmpYCoord,
            round : 1
        };

        DestPlaceSearchLogic.execute(param, function(result){

            self.successResponse(res, Const.responsecodeSucceed, Const.responseMessageDestPlaceSearchNoEntity, {
                placeList : result.placeList,
                placeSource: result.placeSource
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

        /*var testDump = Utils.objCopy(Const.TestData);
         self.successResponse(res, Const.responsecodeSucceed, "요청하신 장소 주변을 검색 했어요? 어때요?", testDump);*/

    }

    else if(action == 'action-pathPlaceSearch')
    {
        var param =
        {
            x_coord : '37.5478818',
            y_coord : '126.8599269'
        }
        //현재 위치 주변 검색..
        PathPlaceSearchLogic.execute(param, function(result){

            self.successResponse(res,Const.responsecodeSucceed,{
                placeList : result.placeList
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

    }else if(action == 'action-pathPlaceSearchNoEntity')
    {
        var param =
        {
            x_coord : '37.5478818',
            y_coord : '126.8599269'
        }
        //현재 위치 주변 검색..
        PathPlaceSearchLogic.execute(param, function(result){

            self.successResponse(res,Const.responsecodeSucceed,{
                placeList : result.placeList
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
    /**********************************************************
     *  Source : 디바이스
     *  Desc : 메인 화면의 이미지를 랜덤으로 새로고침 한다.
     ***********************************************************/
    else if(action == 'action-refresh-place')
    {
        /* 테스트 샘플 반환
        var x = Math.floor((Math.random() * 2) + 1);
        var testDump;
        if(x == 1)
        {
            testDump = Utils.objCopy(Const.TestData);
        }else
        {
            testDump = Utils.objCopy(Const.TestData2);
        }

        console.log(">>[Actionhandler] deviceRequest - refresh place Process perforemd..");
        self.successResponse(res, Const.responsecodeSucceed, "장소를 새로 고침 합니다.?", testDump);*/
        RecommendPlaceSearchLogic.execute(param, function(result){

/*            self.successResponse(res,Const.responsecodeSucceed,{
                placeList : result.placeList
            });*/
            self.successResponse(res, Const.responsecodeSucceed, "장소를 새로 고침 합니다.?", {
                placeList : result.placeList,
                returnActionValue : {
                    action : 'WEB_Action_RecommendPlaceSearch'
                },
                returnIntentValue : {
                    intent : 'WEB_RecommendPlaceSearch'
                }
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
    /**********************************************************
     *  Source : 디바이스
     *  Desc : 현재 위치 주변 검색
     * Parameters
     *  - place.x_coord : 디바이스 현재 위치의 위도 정보
     *  - place.y_coord : 디바이스 현재 위치의 경도 정보
     *  - round : 검색하고자 하는 반경 범위 (default : 1km)
     ***********************************************************/
    else if (action == 'action-request-place-current')
    {
        console.log(">>action-request-place-current request");
        var param =
        {
            x_coord : option.place.x_coord,
            y_coord : option.place.y_coord,
            round : option.round
        }

        CurrentPlaceSearchLogic.execute(param, function(result){

            /*            self.successResponse(res,Const.responsecodeSucceed,{
             placeList : result.placeList
             });*/
            self.successResponse(res, Const.responsecodeSucceed, "장소를 새로 고침 합니다.?", {
                placeList : result.placeList,
                placeSource : result.placeSource,
                returnActionValue : {
                    action : 'WEB_Action_CurrentPlaceSearch'
                },
                returnIntentValue : {
                    intent : 'WEB_CurrentPlaceSearch'
                }
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
    /**********************************************************
     *  Source : 디바이스
     *  Desc : 현재 위치 주변 추천 검색
     * Parameters
     *  - place.x_coord : 디바이스 현재 위치의 위도 정보
     *  - place.y_coord : 디바이스 현재 위치의 경도 정보
     *  - round : 검색하고자 하는 반경 범위 (default : 1km)
     ***********************************************************/
    else if (action == 'action-request-place-current-recommend')
    {
        console.log(">>action-request-place-current request");
        var param =
        {
            x_coord : option.place.x_coord,
            y_coord : option.place.y_coord,
            round : option.round
        }

        CurrentPlaceSearchLogic.execute(param, function(result){

            /*            self.successResponse(res,Const.responsecodeSucceed,{
             placeList : result.placeList
             });*/
            self.successResponse(res, Const.responsecodeSucceed, "장소를 새로 고침 합니다.?", {
                placeList : result.placeList,
                placeSource : result.placeSource
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
    /**********************************************************
     *  Source : 디바이스
     *  Desc : 추천 장소 검색
     * Parameters
     *  - place.x_coord : 디바이스 현재 위치의 위도 정보
     *  - place.y_coord : 디바이스 현재 위치의 경도 정보
     *  - round : 검색하고자 하는 반경 범위 (default : 1km)
     ***********************************************************/
    else if (action == 'action-request-place-recommend')
    {
        //그냥 추천 장소 검색하기
        RecommendPlaceSearchLogic.execute(param, function(result){

            self.successResponse(res,Const.responsecodeSucceed,"추천장소를 검색합니다.", {
                placeList : result.placeList
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
    /** 현재 위치에서 반경 default 1 검색 **/
    /**********************************************************
     *  Source : 디바이스
     *  Desc : 목적지 주변 검색
     * Parameters
     *  - place.x_coord : 요청한 목적지 위치의 위도 정보
     *  - place.y_coord : 요청한 목적지 위치의 경도 정보
     *  - round : 검색하고자 하는 반경 범위 (default : 1km)
     ***********************************************************/
    else if (action == 'action-request-place-dest')
    {
        console.log(">>action-request-place-dest request");
        var param =
        {
            x_coord : option.place.x_coord,
            y_coord : option.place.y_coord,
            round : option.round
        }

        DestPlaceSearchLogic.execute(param, function(result){

            self.successResponse(res, Const.responsecodeSucceed, "목적지 주변을 검색합니다.", {
                placeList : result.placeList,
                placeSource : result.placeSource,
                returnActionValue : {
                    action : 'WEB_Action_DestPlaceSearch'
                },
                returnIntentValue : {
                    intent : 'WEB_DestPlaceSearch'
                }
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
    /**********************************************************
     *  Source : 디바이스
     *  Desc : 현재 위치 주변 검색
     * Parameters
     *  - place.x_coord : 디바이스 현재 위치의 위도 정보
     *  - place.y_coord : 디바이스 현재 위치의 경도 정보
     *  - round : 검색하고자 하는 반경 범위 (default : 1km)
     ***********************************************************/
    else if (action == 'action-request-place-path')
    {
        console.log(">>action-request-place-path request");
        var param =
        {
            x_coord : option.place.x_coord,
            y_coord : option.place.y_coord,
            round : option.round
        }

        CurrentPlaceSearchLogic.execute(param, function(result){

            /*            self.successResponse(res,Const.responsecodeSucceed,{
             placeList : result.placeList
             });*/
            self.successResponse(res, Const.responsecodeSucceed, "장소를 새로 고침 합니다.?", {
                placeList : result.placeList,
                placeSource : result.placeSource
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
    /**********************************************************
     *  Source : API.AI
     *  Desc : 명소 검색 이후 주변 행사를 찾을 지 여부에 대한 PositiveAnswer
     *  Remark : 현재 현재 위치 주변 검색하기는 디바이스로 부터 요청 메시지를 받아서 처리하도록 구성
     ***********************************************************/
    else if(action == 'action-positiveAction')
    {
        //context 정보를 파싱한다.
        var contexts = option.context;
        var lastActionInformation;
        var lastparam;
        if(contexts.length > 0)
        {
            var context = contexts[0];
            var parameters = context.parameters;

            lastActionInformation = parameters['context-place-param'];

            if(lastActionInformation == "context-destPlaceSearch")
            {
                var destLocation = parameters['DestLocation'];

                //C 37.555619 127.04365500000002
                //var locationLatLon = option.parameters.DestLocation.replace("C:",  "");
                var locationLatLon = destLocation;
                var tmpResult = locationLatLon.split(' ');
                var tmpXCoord = tmpResult[1];
                var tmpYCoord = tmpResult[2];
                var param =
                {
                    type : lastActionInformation,
                    x_coord : tmpXCoord,
                    y_coord : tmpYCoord,
                    round : 10
                };

                FestivalSearchLogic.execute(param, function (result) {

                    let responseMesage = `요청하신 목적지 주변 반경 10 km 내의 문화 행사를 검색하였습니다. '자세히 보기'를 클릭하시면 자세히 보실 수 있습니다.`;

                    self.successResponse(res, Const.responsecodeSucceed, responseMesage, {
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

            }else if(lastActionInformation == "context-currentPlaceSearch")
            {
                var destLocation = parameters['DestLocation'];
                var lat = parameters['Lat'];
                var lon = parameters['Lon'];

                //C 37.555619 127.04365500000002
                //var locationLatLon = option.parameters.DestLocation.replace("C:",  "");
                var locationLatLon = destLocation;
                //var tmpResult = locationLatLon.split(' ');
                var tmpXCoord = lat
                var tmpYCoord = lon
                var param =
                {
                    type : lastActionInformation,
                    x_coord : tmpXCoord,
                    y_coord : tmpYCoord,
                    round : 10
                };

                FestivalSearchLogic.execute(param, function (result) {

                    let responseMessage = `요청하신 목적지 주변 반경 10 km 내의 문화 행사를 검색하였습니다. '자세히 보기'를 클릭하시면 자세히 보실 수 있습니다.`;

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

            }
        }




    }
    /**********************************************************
     *  Source : API.AI
     *  Desc : 명소 검색 이후 주변 행사를 찾을 지 여부에 대한 NegativeAnswer
     *  Remark : 현재 현재 위치 주변 검색하기는 디바이스로 부터 요청 메시지를 받아서 처리하도록 구성
     *
     ***********************************************************/
    else if(action == 'action-negativeAction')
    {
        self.successResponse(res, Const.responsecodeSucceed, "더 궁금하신 것이 있으면 언제든지 불러주세요.", testDump);
    }

    //machinlearning based recommend Search
    else if(action == 'action-detailRecommendPlaceSearch')
    {
        RecommendPlaceSearchLogic.executePrediction(option, function(result){

            let code = result.placeList[0].CODE;
            let cnt = result.placeList.length;
            let msg = `입력하신 정보를 통해 ${code} 를 많이 찾으십니다. ${cnt} 개의 추천 장소를 알려드릴께요. '자세히 보기'를 클릭 하시면 자세히 보실 수 있습니다.`

            self.successResponse(res,Const.responsecodeSucceed, msg, {
                placeList : result.placeList
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
    //모든 장소 정보 가져오기
    else if(action == 'action-request-place-all')
    {
        DefaultPlaceSearchLogic.execute(function(result){

            self.successResponse(res,Const.responsecodeSucceed, "전체가져오기", {
                placeList : result.placeList
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
    //조회수 증가시키기
    else if(action == 'action-request-update-place-count')
    {
        let placeId = option.stringQuery.placeid;


        DefaultPlaceSearchLogic.updateViewCount(placeId, function(result){

            self.successResponse(res,Const.responsecodeSucceed, "업데이트 조회수", {
                placeList : result.placeList
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

    else {
        //device request process
        var testDump = Utils.objCopy(Const.TestData);
        console.log(">>[Actionhandler] deviceRequest Process perforemd..");
        self.successResponse(res, Const.responsecodeSucceed, "현재 위치 주변의 장소를 검색했어요? 어때요?", testDump);
    }
}

/*var ActionHandler ={

    //Action 따라서 처리 한다.

    processAction: function(action){

        var self = this;

        if(action == 'action-recommendPlaceSearch')
        {

        }else if(action == 'action-currentPlaceSearch')
        {

            CurrentPlaceSearchLogic.execute(param, function(result){

                self.successResponse(response,Const.responsecodeSucceed,{
                    token: result.token,
                    user: result.user
                });

            },function(err,code){

                if(err){

                    self.errorResponse(
                        response,
                        Const.httpCodeSeverError
                    );

                }else{

                    self.successResponse(response,code);

                }

            });

        }else if(action == 'action-destPlaceSearch')
        {

        }else if(action == 'action-destPlaceSearchNoEntity')
        {

        }else if(action == 'action-pathPlaceSearch')
        {

        }else if(action == 'action-pathPlaceSearchNoEntity')
        {

        }

    },


}*/

module["exports"] = new ActionHandler();