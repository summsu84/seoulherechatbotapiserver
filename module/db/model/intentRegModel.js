/**
 * Created by JJW on 2017-10-28
 *
 * Desc : 의도 요청 페이지에서 의도 요청을 데이터 베이스에 저장하기 위한 모델.
 */




var IntentRegModel = function(){

};

IntentRegModel.prototype.connection = null;

IntentRegModel.prototype.init = function(connection){

    console.log(">>IntentRegModel init .. connection value : " + connection)

    this.connection = connection;

}

/**
 *  Intent요청 정보를 가져온다.
 * @param callback
 */
IntentRegModel.prototype.selectIntentRequest = function(callback){

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
 *  Intent를 등록한다.
 * @param callback
 */
IntentRegModel.prototype.insertIntentRequest = function(params, callback){
    let self = this;
    let category = params.category;
    let intentCode = params['intent-list'];
    let etc = params.etc;

    let strQuerySql = `INSERT INTO tb_req_intent (REQ_INTENT_MESSAGE, REQ_INTENT_CODE, REQ_INTENT_DATE, REQ_INTENT_COMPLETE) VALUES ('${category}',${intentCode}, 'null', '0')`;


    let query = self.connection.query(strQuerySql, function (err, rows){

        if (err)
            console.error(err);
        else {
            console.log(rows);
            if (callback)
                callback(err, rows);
        }
    })
}




module["exports"] = new IntentRegModel();