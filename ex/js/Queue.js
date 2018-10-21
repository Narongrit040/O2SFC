

function myMember1() {
    document.getElementById("myQueue").value = "1";
    //ons.notification.alert('1');
    booking();
}
function myMember2() {
    document.getElementById("myQueue").value = "2";
   // ons.notification.alert('2');
    booking();
}
function myMember3() {
    document.getElementById("myQueue").value = "3";
   // ons.notification.alert('3');
    booking();
}
function myMember4() {
    document.getElementById("myQueue").value = "4";
   // ons.notification.alert('4');
    booking();
}
function myMember5() {
    document.getElementById("myQueue").value = "5";
   // ons.notification.alert('5');
    booking();
}
function myMember6() {
    document.getElementById("myQueue").value = "6";
    //ons.notification.alert('6');
    booking();
}
function booking() {
    var randomCode,checkNullTimeOut;
    var numberMember = document.getElementById("myQueue").value;

    $.ajax({

        //CP1. Complete Ajax Code to GET ALL pin data 
        type: "GET",
        url: "https://reststepvx20180923124000.azurewebsites.net/Api/Queues",

    }).then(function (data) {


        console.log(data);
        // var randVal =
        fnRandomCode();
 
        function fnRandomCode() {

            var checkRandomNum;
            console.log(numberMember);
            if (numberMember <= 2) {
                randomCode = 'A'+Math.floor(101 + (Math.random() * (999 - 101)));
            } else if (numberMember <= 4) {
                randomCode = 'B'+Math.floor(101 + (Math.random() * (999 - 101)));
            } else if (numberMember <= 6) {
                randomCode = 'C'+Math.floor(101 + (Math.random() * (999 - 101)));
            }/////////if add table edit code this here!!
            for (var i = 0; i < data.length; i++) {
                if (data[i].Name == randomCode && data[i].PaymentStaus=="false") {
                    checkRandomNum = "false";
                   // alert(checkRandomNum);
                    fnRandomCode();
                } else {
                    checkRandomNum = "true";
                    //alert(checkRandomNum);
                    console.log(randomCode);
                }
            }
        }

        console.log(randomCode);
        var setDateNow = new Date().toLocaleString();


        var setCodeLog = Math.floor(100001 + (Math.random() * (999999 - 100001)));
        console.log(setDateNow);
        var formdata = {
            Id: 1,
            Name: randomCode,
            Code: setCodeLog,
            No: numberMember,
            TimeCheckIn: setDateNow,
            Status: "wait",
            WaitTime: 30,
            TimeCheckOut: null,
            PaymentStaus: "false",
            IdTable: 1
        }
        document.getElementById("showQueue").innerHTML = "<center><h1>"+randomCode +"</h1><h2>Code : "+ setCodeLog+"</h2></center>";

        $.ajax({


            url: 'https://reststepvx20180923124000.azurewebsites.net/Api/Queues',
            method: 'POST',
            data: formdata

        }).then(function (data) {

            ons.notification.alert('Success!');
            console.log('Post');

            // window.location.href = 'index.html';
        });



    });
}