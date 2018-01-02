/**
 * Created by JJW on 2017-07-20.
 */




var CommentModel = function(){

};

CommentModel.prototype.connection = null;

CommentModel.prototype.init = function(connection){

    console.log(">>CommentModel init .. connection value : " + connection)

    this.connection = connection;

}

/**
 *  Comment를 모두 가져온다..
 * @param callback
 */
CommentModel.prototype.selectComments = function(placeId, callback){

    var self = this;

    var strQuerySql = `SELECT COMMENT_MESSAGE, COMMENT_DATE, COMMENT_USER, FK_PLACE_ID FROM tb_place_comment WHERE FK_PLACE_ID = '${placeId}'`;

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
 *  Comment를 작성한다.
 * @param callback
 */
CommentModel.prototype.writeComment = function(param, callback){

    var self = this;

    var strQuerySql = `INSERT INTO tb_place_comment (COMMENT_MESSAGE, COMMENT_DATE, COMMENT_USER, FK_PLACE_ID) VALUES ('${param.message}',${param.date}, '${param.author}', '${param.placeId}')`;

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





module["exports"] = new CommentModel();