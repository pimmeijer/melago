var img1;
var img2;
var imgprev1;
var imgprev2;
var prevquestion;
var annotationID;
var asymmetryScore;
var borderScore;
var colorScore;
var timesAnnotated;
var imageID = "5af202395c1d2a2d00007bf4";
var jsondata;
//= {"annotationID": annotationID , "asymmetryScore": asymmetryScore, "borderScore": borderScore ,"colorScore": colorScore , "timesAnnotated": timesAnnotated};
var settings;
var clickcount = 0;
var question;
var questionduration = 1;

$(document).ready(function(){
    checkCookie();
    //alert(getCookie("user"));
    changeQuestion(0);
    changeImage();

    $("#compare1").click(function(){
        asymmetryScore = 678;
        jsondata = {"asymmetryScore": asymmetryScore, "timesAnnotated": timesAnnotated};
        settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://medical-b854.restdb.io/rest/annotations/"+ img1,
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "5addc30825a622ae4d528508",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        });

        changeImage();
        changeQuestion(1);
    });
    $("#compare2").click(function(){
        asymmetryScore = 678;

        jsondata = {"annotationID": annotationID , "asymmetryScore": asymmetryScore, "timesAnnotated": timesAnnotated};
        settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://medical-b854.restdb.io/rest/annotations/"+ imageID,
            "method": "PUT",
            "headers": {
                "content-type": "application/json",
                "x-apikey": "5addc30825a622ae4d528508",
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        }



        $.ajax(settings).done(function (response) {
            console.log(response);
        });

        changeImage();
        changeQuestion(1);
    });

    $("#notsure").click(function(){

        changeImage();
        changeQuestion(1);
    });
});

function changeImage() {
    var img1=Math.floor(Math.random()*111);
    var img2=Math.floor(Math.random()*111);
    while (img1 == img2)
    {
        img2=Math.floor(Math.random()*111);
    }

    while (imgprev1 == img1)
    {
        img1=Math.floor(Math.random()*111);
    }

    while (imgprev2 == img2)
    {
        img2=Math.floor(Math.random()*111);
    }

    img1 = ('00' + img1).slice(-3);
    img2 = ('00' + img2).slice(-3);
    $("#compare1").attr("style", "background-image:url(img/lesions/ISIC_0000" + img1 + ".jpg)");
    $("#compare2").attr("style", "background-image:url(img/lesions/ISIC_0000" + img2 + ".jpg)");

    imgprev1 = img1;
    imgprev2 = img2;
}

function changeQuestion(init) {
    clickcount++;

    if (questionduration == clickcount) {
        if (init == 1) {
            $("#question").css("color", "#CC0000");
        }
        while (question == prevquestion) {
            question = Math.floor(Math.random() * 3);
        }
        prevquestion = question;

        switch (question) {
            case 0:
                $("#question").html("<b>Which picture is more asymmetric?</b>")
                break;
            case 1:
                $("#question").html("<b>Which picture has a more irregular border?</b>")
                break;
            case 2:
                $("#question").html("<b>Which picture has a higher variation in color?</b>")
                break;
        }

        $("#question").delay(500).animate({color: '#343a40'}, 1500);

        questionduration = 30 - (Math.floor(Math.random() * 20) + 1);
        clickcount = 0;
    }
}

Number.prototype.pad = function(n) {
    return new Array(n).join('0').slice((n || 2) * -1) + this;
};

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = Math.floor(Math.random() * 99);
        if (user != "" && user != null) {
            setCookie("username", user, 30);
        }
    }
}