/**
 * Created by JJW on 2017-07-20.
 */




var FestivalModel = function(){

};

FestivalModel.prototype.connection = null;

FestivalModel.prototype.init = function(connection){

    console.log(">>FestivalModel init .. connection value : " + connection)

    this.connection = connection;

}

/**
 *  장소를 모두 가져온다.
 * @param callback
 */
FestivalModel.prototype.selectFestivalInformation = function(x_coord, y_coord, round,  limitedNum, callback){

    var self = this;
    round = 10;
    var strQuerySql = 'SELECT   FESTIVAL_ID,    FESTIVAL_NAME,   FESTIVAL_CLASS,  FESTIVAL_TARGET, FESTIVAL_PLACE,  FESTIVAL_START_DATE, FESTIVAL_END_DATE, FESTIVAL_PAYMENT, FESTIVAL_X_COORD, FESTIVAL_Y_COORD, FESTIVAL_AREA, FESTIVAL_LINK, (6371*acos(cos(radians(' + x_coord + '))*cos(radians(FESTIVAL_X_COORD))*cos(radians(FESTIVAL_Y_COORD) - radians(' + y_coord + '))+sin(radians(' + x_coord +'))*sin(radians(FESTIVAL_X_COORD)))) AS distance FROM TB_FESTIVAL HAVING distance <= ' + round;


    var query = self.connection.query(strQuerySql, function (err, rows){

        if (err)
            console.error(err);
        else {
            console.log(rows);
            if (callback)
                callback(err, rows);
        }
    })

}

/**
 * 구에 해당하는 문화행사 정보를 가져온다.
 * @param gu
 * @param limitedNum
 * @param callback
 */
FestivalModel.prototype.selectFestivalInformationByGu = function(gu,  limitedNum, callback){

    var self = this;

    var strQuerySql = "SELECT FESTIVAL_ID, FESTIVAL_NAME, FESTIVAL_CLASS, FESTIVAL_TARGET, FESTIVAL_PLACE, FESTIVAL_START_DATE, FESTIVAL_END_DATE, FESTIVAL_PAYMENT, FESTIVAL_X_COORD, FESTIVAL_Y_COORD, FESTIVAL_AREA, FESTIVAL_LINK FROM TB_FESTIVAL WHERE FESTIVAL_AREA LIKE '%" + gu + "%'";



    var query = self.connection.query(strQuerySql, function (err, rows){

        if (err)
            console.error(err);
        else {
            console.log(rows);
            if (callback)
                callback(err, rows);
        }
    })

}


FestivalModel.prototype.selectRecommendFestivalList = function(limitNumber, callback){
    var self = this;
    var strQuerySql = 'SELECT FESTIVAL_ID, FESTIVAL_NAME, FESTIVAL_CLASS, FESTIVAL_TARGET, FESTIVAL_PLACE, FESTIVAL_START_DATE, FESTIVAL_END_DATE, FESTIVAL_PAYMENT, FESTIVAL_X_COORD, FESTIVAL_Y_COORD, FESTIVAL_AREA, FESTIVAL_LINK FROM TB_FESTIVAL ORDER By RAND() LIMIT ' + limitNumber.toString();

    /* var query = self.connection.query('select * from TB_PLACES LIMIT ' + limitNumber.toString(), function (err, rows){*/
    var query = self.connection.query(strQuerySql, function (err, rows){
        if (err)
            console.error(err);
        else {
            console.log(rows);
            if (callback)
                callback(err, rows);
        }
    })
}





module["exports"] = new FestivalModel();