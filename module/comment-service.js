/**
 * Created by JJW on 2017-07-14.
 */


var Utils = require('./util/Utils');
var Const = require('./util/const');
var CommentModel = require("./db/model/commentlModel");

//현재 위치 주변의 장소를 검색 하는 로직
var CommentLogic = {
    selectCoomments : function(param,onSuccess,onError){

        CommentModel.selectComments(param, function (err, rows) {

            if (err) {
                if (onError)
                    onError(err, null);
            } else {
                if (onSuccess)
                    onSuccess({
                        commentList: rows,
                        placeId: param
                    })
            }

        });

    },

    writeComment : function(param,onSuccess,onError){

        let comment = param.comment;
        CommentModel.writeComment(comment, function (err, rows) {

            if (err) {
                if (onError)
                    onError(err, null);
            } else {
                if (onSuccess)
                    onSuccess({
                        commentList: rows,
                        placeId: comment.placeId
                    })
            }

        });

    }
}

module["exports"] = CommentLogic;