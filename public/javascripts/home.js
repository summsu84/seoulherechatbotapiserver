/**
 * Created by JJW on 2017-06-23.
 */
/**
 * Created by JJW on 2017-06-22.
 */
'use strict';

// The client-side "app" which leverages the shared Handlebars "echo" template.
// This will prompt the user for a message, then echo it out by rendering the
// message using the shared template which was exposed by the server.
(function () {
    console.log(">>>home js is loaded..");

/*    var canvasResult = document.getElementById('canvasResult');
    var imgResult = document.getElementById('imgResult');
    //drawing..
    var context = canvasResult.getContext('2d');
    context.drawImage(imgResult, 0, 0);

    context.moveTo(0, 0);
    context.lineTo(200, 100);
    context.stroke();*/

    var btnSend = document.getElementById('btnSend');
    var btnFile = document.getElementById('btnFile');
    var filePath = "";

    btnSend.addEventListener('click', function(e){
        console.log("btnFace clicked..");
        loadBackgrund();
    });

    btnFile.addEventListener('change', function(e){
        //var filePath = this.value;
        filePath = this.value;
        console.log(">>>>>>filePath : " + filePath);
    });

    var testForm = document.getElementById('formData');
    testForm.onsubmit = function(event) {
        //clearInfo();
        event.preventDefault();
        clearInfo();

        var request = new XMLHttpRequest();
        // POST to httpbin which returns the POST data as JSON
        request.open('POST', '/upload', /* async = */ false);

        var formData = new FormData(document.getElementById('formData'));
        request.send(formData);
        console.log(request.response);
        var dabaObj = JSON.parse(request.response);
        //process

       // imgResult.src = dabaObj.originImgUrl;
        //canvas size setting
        var canvasResult = document.getElementById('canvasResult');
        var imgResult = document.getElementById('imgResult');
        //imgResult.src = dabaObj.originImgUrl;
        //drawing..
//        var context = canvasResult.getContext('2d');
//        context.drawImage(imgResult, 0, 0);
        var img = new Image();
        img.onload = function() {


            redraw(img, dabaObj);
            /*context.drawImage(img, 0, 0);
            //result Array
            var faceObj = dabaObj.face;
            for(var i in faceObj.result)
            {
                var faceResultList = faceObj.result[i];
                var faceObjectResultList = faceResultList.result;
                for(var j in faceObjectResultList)
                {
                    var faceInfo = faceObjectResultList[j];
                    var headBound = faceInfo.bounds.head;
                    //head부분 좌표 찾기
                    context.moveTo(0, 0);
                    var wonjum = {};
                    for (var k = 0; k < headBound.length; k++) {
                        var head = headBound[k];
                        if(k == 0)
                        {
                            wonjum = head;
                            context.moveTo(head.x, head.y);
                        }else {
                            context.lineTo(head.x, head.y);
                        }
                    }
                    //마지막 점에 연결
                    context.lineTo(wonjum.x, wonjum.y);
                    context.stroke();
                }
            }

            canvasResult.width = window.innerWidth;
            canvasResult.height = window.innerHeight;
            redraw();*/
        };
        img.src = dabaObj.originImgUrl;

        //탭에 정보 넣기
        //Face 정보
        var faceTable = document.getElementById('tblFace');
        //result Array
        var faceObj = dabaObj.face;
        var faceIdx = 0;
        for(var i in faceObj.result)
        {
            var faceResultList = faceObj.result[i];
            var row = faceTable.insertRow(faceIdx);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = faceResultList.name;
            faceIdx++;
            for(var j in faceResultList.detectList)
            {
                var faceDetect = faceResultList.detectList[j];
                var row = faceTable.insertRow(faceIdx);
                var cell1 = row.insertCell(0);
                cell1.innerHTML = faceDetect;
                faceIdx++;
            }

        }
        //Label 정보
        //Face 정보
        var labelTable = document.getElementById('tblLabel');
        var labelIdx = 0;
        //result Array
        var labelObj = dabaObj.label;
        var row = labelTable.insertRow(labelIdx);
        var cell1 = row.insertCell(0);
        cell1.innerHTML = faceResultList.name;
        labelIdx++;
        for(var i in labelObj.result)
        {
            var label = labelObj.result[i];
            var row = labelTable.insertRow(labelIdx);
            var cell1 = row.insertCell(0);
            cell1.innerHTML = label;
            labelIdx++;
        }
    };


    var btnFace = document.getElementById('btnFace');
    var btnLabel = document.getElementById('btnLabel');

    btnFace.addEventListener('click', function(e){
        console.log("btnFace clicked..");
        openResult(event, 'divFace');
    });
    btnLabel.addEventListener('click', function(e){
        openResult(event, 'divLabel');
    });



    function openResult(evt, id) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(id).style.display = "block";
        //evt.currentTarget.className += " active";
        //document.getElementById(id).className = document.getElementById(id).className + " active";
        //var divFace = document.getElementById('divFace');
        //divFace.className = divFace.className + " active";
        console.log(id + " ClassName : " + document.getElementById(id).className);

    }



    function loadBackgrund() {

        //사진 정보를 가져오자..
        var filePath = document.getElemet


        Api.sendImagePath(filePath, function(result){

            //버튼 체크
            document.getElementById('Landmarks').checked = true;

        });
    }


    function redraw(img, dabaObj) {
        var canvasResult = document.getElementById('canvasResult');
        var imgResult = document.getElementById('imgResult');
        var context = canvasResult.getContext('2d');
        context.strokeStyle = 'green';


        //canvasResult resize
        canvasResult.width = img.width;
        canvasResult.height = img.height;


        context.drawImage(img, 0, 0);
        //result Array
        var faceObj = dabaObj.face;
        for (var i in faceObj.result) {
            var faceResultList = faceObj.result[i];
            var faceObjectResultList = faceResultList.result;
            for (var j in faceObjectResultList) {
                var faceInfo = faceObjectResultList[j];
                var headBound = faceInfo.bounds.head;
                //head부분 좌표 찾기
                context.moveTo(0, 0);
                var wonjum = {};
                for (var k = 0; k < headBound.length; k++) {
                    var head = headBound[k];
                    if (k == 0) {
                        wonjum = head;
                        context.moveTo(head.x, head.y);
                    } else {
                        context.lineTo(head.x, head.y);
                    }
                }
                //마지막 점에 연결
                context.lineTo(wonjum.x, wonjum.y);
                context.stroke();
            }
        }

        /*canvasResult.width = window.innerWidth;
        canvasResult.height = window.innerHeight;*/
    }

    function clearInfo()
    {
        //table row 삭제
        var faceTable = document.getElementById('tblFace');
        var rowCount = faceTable.rows.length;
        for (var x=rowCount-1; x>0; x--) {
            faceTable.deleteRow(x);
        }
        var labelTable = document.getElementById('tblLabel');
        rowCount = labelTable.rows.length;
        for (var x=labelTable-1; x>0; x--) {
            labelTable.deleteRow(x);
        }
    }

}());