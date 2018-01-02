var mysql = require('mysql');

var DatabaseManager = {

    //Table Model
    connection : null,
    placeModel: null,
    festivalModel : null,
    commentModel : null,
    intentRegModel : null,

    //Init DatabaseManager
    init: function(){
		
		var self = this;
		
        // Connection to our chat database
        console.log("Connecting mariaDB ");

        self.connection = mysql.createConnection({
            host    : '',
            port    : 3306,
            user    : 'seoulhere',
            password : 'seoulhere',
            database : 'DB_SEOULHERE_CHAT'
        });

        self.connection.connect(function(err) {
            if (err) {
                console.error('mysql connection error');
                console.error(err);
                throw err;
            }else
            {
                console.log("mysql connection success");
                self.setupSchema();
            }
        });
    },

    setupSchema : function(){

        this.placeModel = require('./model/placeModel').init(this.connection);
        //festvial Model
        this.festivalModel = require('./model/festivalModel').init(this.connection);
        //comment Model
        this.commentModel = require('./model/commentlModel').init(this.connection);
        //intent reg request
        this.intentRegModel =require('./model/intentRegModel').init(this.connection);
    }

}

module["exports"] = DatabaseManager;