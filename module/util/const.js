(function(global) {
    "use strict;"

    // Class ------------------------------------------------
    var Const = {};

    Const.httpCodeSucceed = 200;
    Const.httpCodeFileNotFound = 404;
    Const.httpCodeSeverError = 500;
    Const.httpCodeAuthError = 503;
        
    Const.responsecodeSucceed = 1;
    Const.resCodeLoginNoName = 1000001;
    Const.resCodeLoginNoRoomID = 1000002;
    Const.resCodeLoginNoUserID = 1000003;
    Const.resCodeUserListNoRoomID = 1000004;
    Const.resCodeMessageListNoRoomID = 1000005;
    Const.resCodeMessageListNoLastMessageID = 1000006;
    Const.resCodeSendMessageNoFile = 1000007;
    Const.resCodeSendMessageNoRoomID = 1000008;
    Const.resCodeSendMessageNoUserID = 1000009;
    Const.resCodeSendMessageNoType = 1000010;
    Const.resCodeFileUploadNoFile = 1000011;
    
    Const.resCodeSocketUnknownError = 1000012;
    Const.resCodeSocketDeleteMessageNoUserID = 1000013;
    Const.resCodeSocketDeleteMessageNoMessageID = 1000014;
    Const.resCodeSocketSendMessageNoRoomID = 1000015;
    Const.resCodeSocketSendMessageNoUserId = 1000016;
    Const.resCodeSocketSendMessageNoType = 1000017;
    Const.resCodeSocketSendMessageNoMessage = 1000018;
    Const.resCodeSocketSendMessageNoLocation = 1000019;
    Const.resCodeSocketSendMessageFail = 1000020;

    Const.resCodeSocketTypingNoUserID = 1000021;
    Const.resCodeSocketTypingNoRoomID = 1000022;
    Const.resCodeSocketTypingNoType = 1000023;
    Const.resCodeSocketTypingFaild = 1000024;
                
    Const.resCodeSocketLoginNoUserID = 1000025;      
    Const.resCodeSocketLoginNoRoomID = 1000026;    
    
    Const.resCodeTokenError = 1000027; 

    Const.resCodeStickerListFailed = 1000028;
    
    Const.responsecodeParamError = 2001;
    Const.responsecodeTokenError = 2100;

    Const.messageTypeText = 1;
    Const.messageTypeFile = 2;
    Const.messageTypeLocation = 3;
    Const.messageTypeContact = 4;
    Const.messageTypeSticker = 5;
        
    Const.messageNewUser = 1000;
    Const.messageUserLeave = 1001;

    Const.typingOn = 1;
    Const.typingOff = 0;
    
    Const.pagingLimit = 50;

    //error
    Const.resNoCoordinate = 1000001;                //좌표 위치 없는 경우
    Const.resNoRecords = 1000002;                    // DB 레코드 없 는 경우..

    Const.notificationSendMessage = "SendMessage";
    Const.notificationNewUser = "NewUser";
    Const.notificationUserTyping = "UserTyping";
    Const.notificationMessageChanges = "MessageChanges";

    //device request type
    Const.deviceReqCurrentPlace = 100000;                       // 현재 위치 주변 요청
    Const.deviceReqCurrentPlaceRecommend = 100001;              //현재 위치 요청 시 추천 형식으로 요청
    Const.deviceReqDestPlace =     100010;
    Const.deviceReqRefreshPlace = 100020;

    //현재 위치 요청 파라미터 타입

    //메시지 응답 파라미터
    Const.responseMessageCurrentPlaceSearch = "현재 위치 주변 반경 1km 내의 명소를 검색하였습니다. 자세히 보기를 클릭하시거나, 전체 보기를 클릭 해보세요";
    Const.responseMessageDestPlaceSearchNoEntity = "요청하신 목적지 주변 반경 1km 내의 명소를 검색하였습니다. 자세히 보기를 클릭하시거나, 전체 보기를 클릭 해보세요";
    Const.responseMessageRecommendPlaceSearch = "추천 장소를 알려드리겠습니다. 클릭하시면 자세히 볼 수 있어요."
    Const.responseMessageCurrentFestivalSearch = "현재 위치 주변의 문화 행사를 검색하였습니다. '자세히 보기'를 클릭하시면 자세히 보실 수 있습니다."
    Const.responseMessageDestPlaceFestivalSearch = "요청하신 목적지 주변의 문화 행사를 검색하였습니다. '자세히 보기'를 클릭하시면 자세히 보실 수 있습니다."





    //var TestData = {};
    Const.TestData =  {
        "placeList": [
            {
                "PLACE_ID": "PLACE_0000",
                "CODE": 1,
                "PLACE_NAME": "강서도서관",
                "PLACE_DESC": null,
                "SEAT_CNT": null,
                "PHONE": "02-3219-7000",
                "OPEN_HOUR": null,
                "CLOSE_DAY": null,
                "OPEN_DAY": null,
                "HOMEPAGE": "http://gslib.sen.go.",
                "ADDR": "서울  강서구 등촌동 520-6 )",
                "ENTR_FEE": null,
                "placeImageList" : [
                    {
                        "MAIN_IMG" : "http://culture.seoul.go.kr/data/cf/title_100082.jpg"
                    }
                ],
                "placeCoordList" : {
                    "X_COORD" : 37.5478818,
                    "Y_COORD" : 126.8599269
                }
            },
            {
                "PLACE_ID": "PLACE_0001",
                "CODE": 2,
                "PLACE_NAME": "명동난타극장",
                "PLACE_DESC": null,
                "SEAT_CNT": 382,
                "PHONE": "02-739-8288",
                "OPEN_HOUR": "00:00:00",
                "CLOSE_DAY": "없음",
                "OPEN_DAY": "2003.10.06",
                "HOMEPAGE": "http://nanta.i-pmc.c",
                "ADDR": "서울  중구 명동길 26",
                "ENTR_FEE": null,
                "placeImageList" : [
                    {
                        "MAIN_IMG" : "http://culture.seoul.go.kr/data/cf/20111101134510.jpg"
                    }
                ],
                "placeCoordList" : {
                    "X_COORD" : 37.5634110,
                    "Y_COORD" : 126.9837813
                }
            },
            {
                "PLACE_ID": "PLACE_0002",
                "CODE": 2,
                "PLACE_NAME": "연강홀",
                "PLACE_DESC": "■ 기    타 : ※ 예약\r\n▶ 전화예약 : 피노스티켓(02-3462-8400)\r\n▶ 종 로 : 종로서적(02-733-2331), 영풍문고(02-399-5616), 교보문고(02",
                "SEAT_CNT": null,
                "PHONE": "02-708-5001",
                "OPEN_HOUR": "00:00:00",
                "CLOSE_DAY": "연중무휴",
                "OPEN_DAY": null,
                "HOMEPAGE": "www.yonkang.co.kr",
                "ADDR": "서울  종로구 연지동 270 )",
                "ENTR_FEE": "공연별로 다름 (회원 10~ 20% ",
                "placeImageList" : [
                    {
                        "MAIN_IMG" : "http://culture.seoul.go.kr/data/cf/title_100457.jpg"
                    }
                ],
                "placeCoordList" : {
                    "X_COORD" : 37.57170179,
                    "Y_COORD" : 127.0011948
                }
            },
            {
                "PLACE_ID": "PLACE_0003",
                "CODE": 3,
                "PLACE_NAME": "독일문화원",
                "PLACE_DESC": "■ 기    타 : 도서관 월~금요일 13:00~18:00",
                "SEAT_CNT": null,
                "PHONE": "02-2021-2800",
                "OPEN_HOUR": "09:00:00",
                "CLOSE_DAY": "토요일, 공휴일",
                "OPEN_DAY": null,
                "HOMEPAGE": "http://www.goethe.de",
                "ADDR": "서울  용산구 후암동 339-1 )",
                "ENTR_FEE": null,
                "placeImageList" : [
                    {
                        "MAIN_IMG" : "http://culture.seoul.go.kr/data/cf/title_100082.jpg"
                    }
                ],
                "placeCoordList" : {
                    "X_COORD" : 37.5507720,
                    "Y_COORD" : 126.9828149
                }
            },
            {
                "PLACE_ID": "PLACE_0004",
                "CODE": 1,
                "PLACE_NAME": "영등포평생학습관",
                "PLACE_DESC": null,
                "SEAT_CNT": null,
                "PHONE": "02-2676-8883~6",
                "OPEN_HOUR": null,
                "CLOSE_DAY": null,
                "OPEN_DAY": null,
                "HOMEPAGE": "http://ydpllc.sen.go",
                "ADDR": "서울  영등포구 당산동 121-22 ",
                "ENTR_FEE": null,
                "placeImageList" : [
                    {
                        "MAIN_IMG" : "http://culture.seoul.go.kr/data/cf/title_100082.jpg"
                    }
                ],
                "placeCoordList" : {
                    "X_COORD" : 37.5260740,
                    "Y_COORD" : 126.9073520
                }
            }
        ]
    };

    Const.TestData2 =  {
        "placeList": [
            {
                "PLACE_ID": "PLACE_0005",
                "CODE": 1,
                "PLACE_NAME": "절두산순교성지기념관",
                "PLACE_DESC": "절두산 순교 기념관 유물",
                "SEAT_CNT": null,
                "PHONE": "02-3142-4434",
                "OPEN_HOUR": null,
                "CLOSE_DAY": null,
                "OPEN_DAY": null,
                "HOMEPAGE": "http://culture.seoul.go.kr/data/cf/title_100176.jpg",
                "ADDR": "서울  마포구 합정동 96-1",
                "ENTR_FEE": null,
                "placeImageList" : [
                    {
                        "MAIN_IMG" : "http://culture.seoul.go.kr/data/cf/title_100082.jpg"
                    }
                ],
                "placeCoordList" : {
                    "X_COORD" : 37.5441363,
                    "Y_COORD" : 126.9117967
                }
            },
            {
                "PLACE_ID": "PLACE_0006",
                "CODE": 2,
                "PLACE_NAME": "한국미술박물관",
                "PLACE_DESC": null,
                "SEAT_CNT": 382,
                "PHONE": "02-766-6000",
                "OPEN_HOUR": null,
                "CLOSE_DAY": "월요일추석, 설 연휴",
                "OPEN_DAY": "2003.10.06",
                "HOMEPAGE": "http://nanta.i-pmc.c",
                "ADDR": "서울  종로구",
                "ENTR_FEE": "일반 5000원학생 3000원",
                "placeImageList" : [
                    {
                        "MAIN_IMG" : "http://culture.seoul.go.kr/data/cf/title_100466.jpg"
                    }
                ],
                "placeCoordList" : {
                    "X_COORD" : 37.5808916,
                    "Y_COORD" : 126.9890575
                }
            },
            {
                "PLACE_ID": "PLACE_0007",
                "CODE": 2,
                "PLACE_NAME": "씨너스",
                "PLACE_DESC": "씨너스",
                "SEAT_CNT": null,
                "PHONE": "02-708-5001",
                "OPEN_HOUR": "00:00:00",
                "CLOSE_DAY": "연중무휴",
                "OPEN_DAY": null,
                "HOMEPAGE": "www.yonkang.co.kr",
                "ADDR": "서울  종로구 연지동 270 )",
                "ENTR_FEE": "공연별로 다름 (회원 10~ 20% ",
                "placeImageList" : [
                    {
                        "MAIN_IMG" : "http://culture.seoul.go.kr/data/cf/title_100210.jpg"
                    }
                ],
                "placeCoordList" : {
                    "X_COORD" : 37.4982136,
                    "Y_COORD" : 127.0264083
                }
            },
            {
                "PLACE_ID": "PLACE_0008",
                "CODE": 3,
                "PLACE_NAME": "강동도서관",
                "PLACE_DESC": "강동도서관",
                "SEAT_CNT": null,
                "PHONE": "02-2021-2800",
                "OPEN_HOUR": "09:00:00",
                "CLOSE_DAY": "토요일, 공휴일",
                "OPEN_DAY": null,
                "HOMEPAGE": "http://www.goethe.de",
                "ADDR": "서울  용산구 후암동 339-1 )",
                "ENTR_FEE": null,
                "placeImageList" : [
                    {
                        "MAIN_IMG" : "http://culture.seoul.go.kr/data/cf/title_100067.gif"
                    }
                ],
                "placeCoordList" : {
                    "X_COORD" : 37.5385252,
                    "Y_COORD" : 127.1437561
                }
            },
            {
                "PLACE_ID": "PLACE_0009",
                "CODE": 1,
                "PLACE_NAME": "어반아트",
                "PLACE_DESC": "어반아트",
                "SEAT_CNT": null,
                "PHONE": "02-2676-8883~6",
                "OPEN_HOUR": null,
                "CLOSE_DAY": null,
                "OPEN_DAY": null,
                "HOMEPAGE": "http://ydpllc.sen.go",
                "ADDR": "서울  영등포구 당산동 121-22 ",
                "ENTR_FEE": null,
                "placeImageList" : [
                    {
                        "MAIN_IMG" : "http://culture.seoul.go.kr/data/cf/title_100035.jpg"
                    }
                ],
                "placeCoordList" : {
                    "X_COORD" : 37.5260740,
                    "Y_COORD" : 126.9073520
                }
            }
        ]
    };

    // Exports ----------------------------------------------
    module["exports"] = Const;
    //module["exports"] = TestData;

})((this || 0).self || global);
