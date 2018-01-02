/**
 * Created by JJW on 2017-06-23.
 */
var http = require('http');
var options = {
    host: 'localhost',
    path: '/upload2',
    port: '3000',
    method: 'POST'
};
function readJSONResponse(response) {
    var responseData = '';
    response.on('data', function (chunk) {
        responseData += chunk;
    });
    response.on('end', function () {
        var dataObj = JSON.parse(responseData);
        console.log("Raw Response: " +responseData);
        console.log("Message: " + dataObj.message);
        console.log("Question: " + dataObj.question);
    });
}
function requestJSON() {
    console.log(">>>>request JSON..");
    var req = http.request(options, readJSONResponse);
    req.write('{"name":"Bilbo", "occupation":"Burglar"}');
    req.end();

}