var allQueue = [];
var checkVarRePage, checkVarRePageLoop, firstQ, lengthQ, lengthQL, cfIdTable;
var sortfirstQ = [];

function callQueue() {

    $.ajax({

        //CP1. Complete Ajax Code to GET ALL pin data localhost:59391/ //https://reststepvx20180923124000.azurewebsites.net
        type: "GET",
        url: "https://reststepvx20180923124000.azurewebsites.net/Api/Queues",

    }).then(function (data) {
        lengthQ = 0;
        var callSetdata = [];
        var callsetId = [];
        var showNameQueue = [];
        var setCount = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].TimeCheckOut === "wait") {
                lengthQ++;
            }
        }
        var ccStatus = 0;
        for (var i = 0; i < data.length; i++) {

            if (data[i].Status === "wait") {

                callSetdata[ccStatus] = data[i].TimeCheckIn + "ID" + data[i].Id;
                // setdata[i] = data[i].TimeCheckIn;
                //callsetId[i] = data[i].Id;
                showNameQueue[ccStatus] = data[i].TimeCheckIn + "Na" + data[i].Name;
                ccStatus++;
                console.log(ccStatus);
            } else {
                console.log('asfsdsdgdfsg');
            }
        }

        callSetdata.sort();
        showNameQueue.sort();
        console.log(callSetdata);



        for (var i = 0; i < callSetdata.length; i++) {

            allQueue[i] = callSetdata[i].substr(21);

        }
        selectTable(allQueue);
        var idQueueR = sortfirstQ[0];
        console.log('sssssxx');
        console.log(allQueue);
        console.log(idQueueR);
        checkQueueFirst(idQueueR);
        var sortAllQueue = [];
        for (var i = 0; i < showNameQueue.length; i++) {
            sortAllQueue[i] = showNameQueue[i].substr(21);
            // $("#showAllQueue").prepend(sortAllQueue+" ");


        }
        console.log("sortAllQueue");
console.log(sortAllQueue);
        //
        // document.getElementById("showAllQueue").innerHTML = sortAllQueue.join(" ");
        var showQueuDisplay=[];
        if(sortAllQueue === undefined){
        
        }else{
            for(var i = 0 ; i < 24 ; i++){
                if(sortAllQueue[i] == undefined){
                    
                }else if(sortAllQueue[i] == checkVarRePage){
                    showQueuDisplay += "<font color=red>"+ sortAllQueue[i] +" </font>";
                }else{
                    showQueuDisplay += "<font color=black>"+ sortAllQueue[i] +" </font>";
                }
    
            }
            if(sortAllQueue.length > 24){
                showQueuDisplay +=   ">>>>";
              
            }
            document.getElementById("showAllQueue").innerHTML = showQueuDisplay;
            
        }



    });
}
function checkQueueFirst(idQueueR) {
    firstQ = idQueueR;
    $.ajax({

        //CP1. Complete Ajax Code to GET ALL pin data 
        type: "GET",
        url: "https://reststepvx20180923124000.azurewebsites.net/Api/Queues/" + idQueueR,

    }).then(function (data) {
        console.log(data);
        document.getElementById("firstQueue").innerHTML = data.Name;
        checkVarRePage = data.Name;
    });
}


callQueue();
window.onload = function () {
    setInterval(function () {
        callQueueLoop();
        if (checkVarRePage != checkVarRePageLoop || lengthQ != lengthQL) {
            callQueue();
        } else {

        }
    }, 10000);
};

function callQueueLoop() {
    $.ajax({

        //CP1. Complete Ajax Code to GET ALL pin data 
        type: "GET",
        url: "https://reststepvx20180923124000.azurewebsites.net/Api/Queues",

    }).then(function (data) {
        lengthQL = data.length;
        var callSetdata = [];
        var callsetId = [];
        var showNameQueueLoop = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].Status === "wait") {

                callSetdata[i] = data[i].TimeCheckIn + "ID" + data[i].Id;
            }
        }
        callSetdata.sort();
        showNameQueueLoop.sort();
        console.log(callSetdata);
        //var idQueueR = sortfirstQ[0];
        // var idQueueRloop = callSetdata[0].substr(21);
        var idQueueRloop = sortfirstQ[0];

        // console.log(idQueueR);
        checkQueueFirstLoop(idQueueRloop);





    });
}
function checkQueueFirstLoop(idQueueR) {

    $.ajax({

        //CP1. Complete Ajax Code to GET ALL pin data 
        type: "GET",
        url: "https://reststepvx20180923124000.azurewebsites.net/Api/Queues/" + idQueueR,

    }).then(function (data) {
        // console.log(data);

        checkVarRePageLoop = data.Name;
    });
}



function removeQueue() {

    $.ajax({

        //CP1. Complete Ajax Code to GET ALL pin data 
        type: "delete",
        url: "https://reststepvx20180923124000.azurewebsites.net/Api/Queues/" + firstQ,

    }).then(function (data) {
        console.log(data);
    });
}

//โต๊ะไหนว่างคนที่จองจะได้ก่อน

function selectTable(allQueue) {
    var checkNumberQ = [];

    $.ajax({

        //CP1. Complete Ajax Code to GET ALL pin data 
        type: "GET",
        url: "https://reststepvx20180923124000.azurewebsites.net/Api/Queues",

    }).then(function (dataQ) {
        // console.log('xxx');
        // console.log(dataQ);

        for (var i = 0; i < allQueue.length; i++) {
            for (var j = 0; j < dataQ.length; j++) {
                if (dataQ[j].Id == allQueue[i]) {
                    checkNumberQ[i] = dataQ[j].No;
                }
            }
        }
        // console.log('xxzzzzzzzzzzzzx');
        // console.log(allQueue+'No : '+checkNumberQ);

    });
    $.ajax({

        //CP1. Complete Ajax Code to GET ALL pin data 
        type: "GET",
        url: "https://reststepvx20180923124000.azurewebsites.net/Api/Tables",

    }).then(function (dataT) {

        // for (var i = 0; i < checkNumberQ.length; i++) {
        //     for (var j = 0; j < dataT.length; j++) {
        //         if (checkNumberQ[i] <= 2 && dataT[j].Status == 'false' && dataT[j].NumOfMembers <= 2) {
        //             sortfirstQ[i] = allQueue[i];
        //         }else if(checkNumberQ[i] >= 3 && checkNumberQ[i] <= 4 && dataT[j].Status== 'false' && dataT[j].NumOfMembers >= 3 && dataT[j].NumOfMembers <= 4) {
        //             sortfirstQ[i] = allQueue[i];
        //         }else if(checkNumberQ[i] >= 4 && checkNumberQ[i] <= 6 && dataT[j].Status== 'false'&& dataT[j].NumOfMembers >= 4 && dataT[j].NumOfMembers <= 6) {
        //             sortfirstQ[i] = allQueue[i];
        //         }
        //     }
        // }

        // console.log('xxx');
        // console.log(allQueue);
        var serSelectLoop = 0;
      
        // //console.log(dataT);
        // var varSetTable = 0;
        // for (var j = 0; j < dataT.length; j++) {
        //     if (dataT[j].Status == 'false') {

        //         sortDataTableNo[varSetTable] = dataT[j].NumOfMembers;
        //     varSetTable++;
        // }else{

        // }
        // }
        // sortDataTableNo.sort();
        // console.log(sortDataTableNo);
        // console.log(sortDataTableNo.length); //str.substring(0,1);
  var sortDataTableNo= [];
        var sortDataTableId= [];
        var countSortTable=0;
        for (var i = 0; i < dataT.length; i++) {
if(dataT[i].Status === 'false'){
    sortDataTableNo[countSortTable] = dataT[i].NumOfMembers+"ID"+dataT[i].Id;
    countSortTable++;
}

        }
        sortDataTableNo.sort();
console.log(sortDataTableNo);

for (var i = 0; i < checkNumberQ.length; i++) {
    for (var j = 0; j < sortDataTableNo.length; j++) {
        if(sortDataTableNo[j].substring(0,1) >= checkNumberQ[i]){
            sortfirstQ[serSelectLoop] = allQueue[i];
            cfIdTable = sortDataTableNo[j].substring(3);
            console.log('select table');
            console.log(sortDataTableNo[j].substring(0,1));
            console.log(sortDataTableNo[j].substring(0,1) + 'xx' + checkNumberQ[i] + 'xx' + sortfirstQ[serSelectLoop] + 'xx' + allQueue[i] + 'xx' +cfIdTable);
            serSelectLoop++;
            return false;
        }else{
            cfIdTable = "โต๊ะเต็ม";
        }
    }
}


        // for (var i = 0; i < checkNumberQ.length; i++) {
        //     for (var j = 0; j < dataT.length; j++) {
        //         if (checkNumberQ[i] <= 2 && dataT[j].NumOfMembers <= 2 && dataT[j].Status === 'false') {
        //             sortfirstQ[serSelectLoop] = allQueue[i];
        //             serSelectLoop++;
        //             cfIdTable = dataT[j].Id;
        //             console.log('select table');
        //             console.log(dataT[j].NumOfMembers);
        //             console.log(dataT[j].NumOfMembers + 'xx' + dataT[j].Status + 'xx' + checkNumberQ[i] + 'xx' + sortfirstQ[serSelectLoop] + 'xx' + allQueue[i] + 'xx' + dataT[j].Id);
        //             return false;
        //         }
        //          else {
        //             cfIdTable = "No";
        //         }
        //     }
        // }
     
        // for (var i = 0; i < checkNumberQ.length; i++) {
        //     for (var j = 0; j < dataT.length; j++) {
        //         if (dataT[j].Status === 'false' ) {
        //             if (checkNumberQ[i] <= dataT[j].NumOfMembers) {
        //                 sortfirstQ[serSelectLoop] = allQueue[i];
        //                 serSelectLoop++;
        //                 cfIdTable = dataT[j].Id;
        //                 console.log('select table');
        //                 console.log(dataT[j].NumOfMembers);
        //                 console.log(dataT[j].NumOfMembers + 'xx' + dataT[j].Status + 'xx' + checkNumberQ[i] + 'xx' + sortfirstQ[serSelectLoop] + 'xx' + allQueue[i] + 'xx' + dataT[j].Id);
        //                 return false;
        //             }
        //         }else{
        //             cfIdTable = "โต๊ะเต็ม";
        //         }


        //     }
        // }
        if(cfIdTable == undefined){

        }else{
            document.getElementById("cfIdTable").innerHTML = cfIdTable;
        }
               


    });


}

function skipQueue() {
    var setDateNow = new Date().toLocaleString();

    $.ajax({

        //CP1. Complete Ajax Code to GET ALL pin data 
        type: "get",
        url: "https://reststepvx20180923124000.azurewebsites.net/Api/Queues/" + firstQ,


    }).then(function (dataQ) {
        var formdata = {

            Id: firstQ,
            Name: dataQ.Name,
            Code: dataQ.Code,
            No: dataQ.No,
            TimeCheckIn: setDateNow,
            Status: dataQ.Status,
            WaitTime: dataQ.WaitTime,
            TimeCheckOut: dataQ.TimeCheckOut,
            PaymentStaus: dataQ.PaymentStaus,
            IdTable: dataQ.IdTable

        }

        $.ajax({

            //CP1. Complete Ajax Code to GET ALL pin data 
            type: "put",
            url: "https://reststepvx20180923124000.azurewebsites.net/Api/Queues/" + firstQ,
            data: formdata

        }).then(function (data) {
            console.log(data);
        });


    });


}