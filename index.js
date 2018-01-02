'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const ActionHandler = require('./module/ActionHandler');
const FestivalActionHandler =  require('./module/FestivalActionHandler');
const CommentActionHandler = require('./module/CommentActionHandler');
const IntentRegActionHandler = require('./module/IntentRegActionHandler');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');       //Handlebars template engine for Express
var path = require('path');
const util = require('util')
//mysql
/*var mysql = require('mysql');
var connection = mysql.createConnection({
    host    : 'localhost',
    port    : 3306,
    user    : 'seoulhere',
    password : 'seoulhere',
    database : 'DB_SEOULHERE'
});

connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }else
    {
        console.log("mysql connection success");
    }
});*/

const restService = express();

//대화 등록하기 페이지 추가 - 20170912
// view engine setup -- 20171012 - HBS 에서 Jade로 뷰엔진을 변경한다..
restService.set('views', path.join(__dirname, '/public/view'));
//app.set('view engine', 'jade');
//Handlebars template engine
/* 아래는 hbs 셋팅
var hbs = exphbs.create({
    partialsDir : __dirname + '/public/view/partials',
    defaultLayout : __dirname + '/public/view/layouts/default.hbs',
    layoutDir : __dirname + '/public/view/layouts'
});
restService.engine('.hbs', hbs.engine);
restService.set('view engine', '.hbs');*/

restService.set('view engine', 'jade');     //jade로 변경

//Enable view cache
restService.enable('view cache');
// restService.use(bodyParser.urlencoded({ extended: false }));
//restService.use(cookieParser());
restService.use(express.static(path.join(__dirname, 'public')));

restService.use(bodyParser.json());
restService.use(bodyParser.urlencoded({ extended: false }));
restService.use(cookieParser());

//DB 로딩 주석
var DatabaseManager = require('./module/db/DatabaseManager');
DatabaseManager.init();

restService.post('/hook', function (req, res) {

    console.log('hook request');

/*    var placeTest = require('./module/db/model/placeModel');

    placeTest.selectPlaceList(function (err, rows){
        console.log(">>>select Place List ...");
    });*/

    try {
        var speech = 'empty speech';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

                if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' ';
                }

                if (requestBody.result.action) {
                    speech += 'action: ' + requestBody.result.action;

                    //action 존재 시 action 처리
                    var option = {
                        actionIncomplete : requestBody.result.actionIncomplete,
                        parameters : requestBody.result.parameters,
                        context : requestBody.result.contexts
                    }

                    if(requestBody.result.action == 'action-festivalSearch')
                    {
                        FestivalActionHandler.processAction(requestBody.result.action, res, option)
                    }else {
                        ActionHandler.processAction(requestBody.result.action, res, option);
                    }
                }
            }
        }

        console.log('result: ', speech);

        /*return res.json({
            speech: speech,
            displayText: speech,
            source: 'apiai-webhook-sample'
        });*/
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

//아래는 디바이스로부터 요청 발생 처리
//현재 장소 검색 요청
restService.post('/request/place/current', processPlaceCurrent);
//목적지 장소 검색
restService.post('/request/place/dest', processPlaceDest);
//출도착지 장소 검색
restService.post('/request/place/path', processPlacePath);

//메인 화면 새로 고침 검색
restService.get('/request/place/refresh', processPlaceRefreshRequest);
restService.post('/request/place/refresh', function (req, res){
    console.log(">>>>>>postRequest...");
});

//Comment write
/*restService.post('/request/place/comment/:placeid', function (req, res) {

});
restService.get('/request/place/comment/:placeid', function (req, res){

});*/

//모든 장소 가져오기
restService.get('/request/place/all', processPlaceAll);

//장소 조회수 업데이트
restService.put('/request/place/view/:placeid', processPlaceViewCount);

//코멘트 남기기
restService.post('/request/place/comments', processCommentPost);
//코멘트 가져오기
restService.get('/request/place/comments/:placeid', processCommentGet);



//추천 장소 검색
restService.get('/request/place/recommend', processPlaceRecommend);
//추천장소 검색 by Code
restService.get('/request/place/recommend/code', processPlaceRecommend);

//문화 행사 검색
restService.get('/request/festival/recommend', processFestivalRecommend);

//의도 등록 페이지
restService.get('/request/reg/intent', function(req, res){
    res.render('index', { title: 'ChatBot Training Page',
        subtitle: '훈련 시킬 단어를 입력해주세요',
        message: 'Hello there!',
        intentList :
        [
            {
                name : '목적지 주변 검색',
                value : 0
            },
            {
                name : '현재위치 주변 검색',
                value : 1
            },
            {
                name : '경로 주변 검색',
                value : 2,
            },
            {
                name : '행사 검색',
                value : 3
            }]
    });

})
//의도 등록 페이지  //errorType: err.message
restService.post('/request/reg/intent/add', function(req, res){
    console.log(">>intent add is called..");
    if (req.body) {
        var requestBody = req.body;
        IntentRegActionHandler.processAction('action-insertIntentRequest', requestBody, res)
    }else {

        return res.status(400).json({
            status: {
                code: 400

            }
        });
    }
})

//문화 행사 검색 URI
restService.post('/request/festival', function (req, res) {
    console.log(">>>>>>Festival Request..");
    if (req.body) {
        var requestBody = req.body;
        var option = {};
        var action = "action-festivalSearchFromDevice";
        console.log(">>requestBody.. " + requestBody);
        if (requestBody.requestData) {
            if(requestBody.requestData.hasOwnProperty('place'))
            {
                option.place = requestBody.requestData.place;           //요청 Place 정보
                option.round = requestBody.requestData.round;           //요청 반경 정보

            }
            //action 존재 시 action 처리
            FestivalActionHandler.processAction(action, res, option);
        } else {
            console.log(">>requestType doesnt exist");
        }

    }else {
        //값 없음
    }

});

function processPlaceCurrent(req, res)
{
    processPostRequest("action-request-place-current", req, res);
}

function processPlaceDest(req, res)
{
    processPostRequest("action-request-place-dest", req, res);
}

function processPlacePath(req, res)
{
    processPostRequest("action-request-place-path", req, res);
}


function processPostRequest(action, req, res)
{
    console.log('device request');
    try {
        var speech = 'empty speech';
        var option = {};
        var requestType = '';

        if (req.body) {
            var requestBody = req.body;
            console.log(">>requestBody.. " + requestBody);
            if (requestBody.requestData) {
                if (requestBody.requestData.place) {
                    option.place = requestBody.requestData.place;           //요청 Place 정보
                    option.round = requestBody.requestData.round;           //요청 반경 정보
                    console.log(">>place.. " + option.place);
                }else
                {
                    console.log(">>place doesnt exsit");
                }

                if (requestBody.requestData.requestType) {
                    //speech += 'action: ' + requestBody.result.action;
                    requestType = requestBody.requestData.requestType;
                    console.log(">>requestType.. " + requestType);

                    //action 존재 시 action 처리
                    ActionHandler.processAction(action, res, option);
                }else
                {
                    console.log(">>requestType doesnt exist");
                }

            }
        }
        console.log('result: ', speech);

    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
}

/**get request**/
function processPlaceRefreshRequest(req, res)
{
    //console.log(">>>>>>getRequest..." + req.cookie['']);
    processGetRequest("action-refresh-place", req, res);
}

function processPlaceRecommend(req, res)
{
    if(req.params)
        processGetRequest("action-request-detail-place-recommend", req, res);
    else
        processGetRequest("action-request-place-recommend", req, res);
}

function processFestivalRecommend(req, res)
{
    processFestivalGetRequest('action-request-festival-recommend', req, res);
}

function processPlaceAll(req, res)
{
    processGetRequest("action-request-place-all", req, res);
}

function processPlaceViewCount(req, res)
{
    processGetRequest("action-request-update-place-count", req, res);
}



function processFestivalGetRequest(action, req, res)
{
    console.log('device request');
    try {

        if (req.body) {
            var requestBody = req.body;
        }
        FestivalActionHandler.processAction(action, res);

    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
}


//Comment 처리
function processCommentGet(req, res)
{
    processCommentRequest("action-selectComments", req, res);
}

function processCommentPost(req, res)
{
    processCommentRequest("action-writeComment", req, res);
}

function processCommentRequest(action, req, res)
{
    console.log('device request');
    try {
        //test
        let params = {};
        if(action == 'action-selectComments')
        {
            params = req.params.placeid;
        }else {
            if (req.body) {
                params = req.body;

            }
        }
        CommentActionHandler.processAction(action, params, res);
        //console.log('result: ', speech);
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
}


function processGetRequest(action, req, res)
{
    console.log('device request');
    try {
        //test
        var params = {
            requestBody : null,
            stringQuery : null
        };
        if (req.body) {
            params.requestBody = req.body;
        }
        if (req.params)
        {
            params.stringQuery = req.params;
        }
        ActionHandler.processAction(action, res, params);
        //console.log('result: ', speech);
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
}

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});