/**
 * Created by JJW on 2017-07-20.
 */




var PlaceModel = function(){

};

PlaceModel.prototype.connection = null;

PlaceModel.prototype.init = function(connection){

    console.log(">>PlaceModel init .. connection value : " + connection)

    this.connection = connection;

}

/**
 *  장소를 모두 가져온다.
 * @param callback
 */
PlaceModel.prototype.selectPlaceList = function(callback){

    var self = this;

    var query = self.connection.query('select * from TB_PLACES', function (err, rows){

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
 *  추천 장소를 가져온다.
 * @param callback
 */
PlaceModel.prototype.selectRecommendPlaceList = function(limitNumber, callback){
    var self = this;
    var sql = 'select * from tb_places, tb_place_coord, tb_place_image ' +
        'where tb_places.PLACE_ID = tb_places.PLACE_ID and tb_places.PLACE_ID = tb_place_image.PLACE_ID ' +
        'order by rand() limit ' + limitNumber.toString();

   /* var query = self.connection.query('select * from TB_PLACES LIMIT ' + limitNumber.toString(), function (err, rows){*/
    var query = self.connection.query(sql, function (err, rows){
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
 *  목적지 주변 장소를 가져온다.
 * @param callback
 */
PlaceModel.prototype.selectDestinationPlaceList = function(x_coord, y_coord, round,  limitedNum, callback){
    var self = this;

    var strQuerySql = 'SELECT \
                A.PLACE_ID,\
                A.CODE,\
                A.PLACE_NAME,\
                A.PLACE_DESC,\
                A.SEAT_CNT,\
                A.PHONE,\
                A.OPEN_HOUR,\
                A.CLOSE_DAY,\
                A.OPEN_DAY,\
                A.HOMEPAGE,\
                A.ADDR,\
                A.ENTR_FEE,\
                B.X_COORD,\
                B.Y_COORD,\
                C.MAIN_IMG,\
               (6371*acos(cos(radians(' + x_coord + '))*cos(radians(B.X_COORD))*cos(radians(B.Y_COORD) - radians(' + y_coord + '))+sin(radians(' + x_coord +'))*sin(radians(B.X_COORD)))) AS distance \
                FROM tb_places AS A, tb_place_coord AS B, tb_place_image AS C \
                WHERE A.PLACE_ID = B.PLACE_ID AND A.PLACE_ID = C.PLACE_ID \
                HAVING distance <= ' + round;


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
 *  출도착지 경로에 있는 장소를 가져온다.
 * @param callback
 */
PlaceModel.prototype.selectCurrentPlaceList = function(x_coord, y_coord, round,  limitedNum, callback){
    var self = this;

    var strQuerySql = 'SELECT \
                A.PLACE_ID,\
                A.CODE,\
                A.PLACE_NAME,\
                A.PLACE_DESC,\
                A.SEAT_CNT,\
                A.PHONE,\
                A.OPEN_HOUR,\
                A.CLOSE_DAY,\
                A.OPEN_DAY,\
                A.HOMEPAGE,\
                A.ADDR,\
                A.ENTR_FEE,\
                B.X_COORD,\
                B.Y_COORD,\
                C.MAIN_IMG,\
               (6371*acos(cos(radians(' + x_coord + '))*cos(radians(B.X_COORD))*cos(radians(B.Y_COORD) - radians(' + y_coord + '))+sin(radians(' + x_coord +'))*sin(radians(B.X_COORD)))) AS distance \
                FROM tb_places AS A, tb_place_coord AS B, tb_place_image AS C \
                WHERE A.PLACE_ID = B.PLACE_ID AND A.PLACE_ID = C.PLACE_ID \
                HAVING distance <= ' + round;

    var query = self.connection.query(strQuerySql, function (err, rows){

        if (err)
            console.error(err);
        else {
            console.log(rows);
            if (callback)
                callback(err, rows);
        }
    })
};


/**********************************************************
 *  Desc : 현재 위치에서 랜덤으로 추천 장소를 보여준다.
 * @param callback
 ***********************************************************/
PlaceModel.prototype.selectCurrentRecommendPlaceList = function(x_coord, y_coord, round,  limitedNum, callback){
    var self = this;

    var strQuerySql = 'SELECT \
                A.PLACE_ID,\
                A.CODE,\
                A.PLACE_NAME,\
                A.PLACE_DESC,\
                A.SEAT_CNT,\
                A.PHONE,\
                A.OPEN_HOUR,\
                A.CLOSE_DAY,\
                A.OPEN_DAY,\
                A.HOMEPAGE,\
                A.ADDR,\
                A.ENTR_FEE,\
                B.X_COORD,\
                B.Y_COORD,\
                C.MAIN_IMG,\
               (6371*acos(cos(radians(' + x_coord + '))*cos(radians(B.X_COORD))*cos(radians(B.Y_COORD) - radians(' + y_coord + '))+sin(radians(' + x_coord +'))*sin(radians(B.X_COORD)))) AS distance \
                FROM tb_places AS A, tb_place_coord AS B, tb_place_image AS C \
                WHERE A.PLACE_ID = B.PLACE_ID AND A.PLACE_ID = C.PLACE_ID \
                HAVING distance <= ' + round;

    var query = self.connection.query(strQuerySql, function (err, rows){

        if (err)
            console.error(err);
        else {
            console.log(rows);
            if (callback)
                callback(err, rows);
        }
    })
};



module["exports"] = new PlaceModel();