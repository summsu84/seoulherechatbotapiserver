/**
 * Created by JJW on 2017-06-22.
 */
'use strict';

// The client-side "app" which leverages the shared Handlebars "echo" template.
// This will prompt the user for a message, then echo it out by rendering the
// message using the shared template which was exposed by the server.
(function () {
    console.log(">>>result js is loaded..");
/*
    var button = document.getElementById('say');

    button.addEventListener('click', function (e) {
        var message = prompt('Say Something:', 'Yo yo'),
            echo    = document.createElement('div');

        echo.innerHTML = Handlebars.templates.echo({message: message});
        document.body.appendChild(echo);
    }, false);
*/
    loadBackgrund();
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
/*        var canvas = document.getElementById("myCanvas");
        var img    = canvas.toDataURL("/images/testPicture.jpg");
        window.location = img;*/
        //document.getElementById("myCanvas").style.background = "url('/images/testPicture.jpg')"
/*        var img = document.getElementById('dynamic_img');
        var width = img.clientWidth;
        var height = img.clientHeight;

        var canvas = document.getElementById('myCanvas');
        canvas.style.width = width;
        canvas.style.height = height;*/
        Api.sendRequest( '', null );
    }






}());