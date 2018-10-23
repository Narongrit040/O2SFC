document.addEventListener('prechange', function(event) {
    document.querySelector('ons-toolbar .center')
      .innerHTML = event.tabItem.getAttribute('label');
  });
  document.addEventListener('init', function(event) {
    var page = event.target;
  
    if (page.id === 'page1') {
      page.querySelector('#push-button').onclick = function() {
        document.querySelector('#myNavigator').pushPage('page2.html', {data: {title: 'Page 2'}});
      };
      page.querySelector('#push-button2').onclick = function() {
        document.querySelector('#myNavigator').pushPage('page3.html', {data: {title: 'Page 3'}});
      };
    } else if (page.id === 'page2') {
      page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }else if (page.id === 'page3') {
      page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }
  });



  function checkIdUser(uid) {
    var mainId;
    $.ajax({

        //CP1. Complete Ajax Code to GET ALL pin data 
        type: "GET",
        url: "https://reststepvx20180923124000.azurewebsites.net/Api/Staffs",

    }).then(function (data) {

        // document.getElementById("firstQueue").innerHTML = data.Name;
        for (var i = 0; i < data.length; i++) {
            if (data[i].Uid === uid) {
                mainId = data[i].Id;
            }
        }

        console.log(mainId);

        checkPosition(mainId);
        checkUid(mainId);

    });
}
function checkUid(mainId) {

    $.ajax({

        //CP1. Complete Ajax Code to GET ALL pin data 
        type: "GET",
        url: "https://reststepvx20180923124000.azurewebsites.net/Api/Staffs/" + mainId,

    }).then(function (data) {

        document.getElementById("showFname").innerHTML = data.FirstName;

    });
}

function checkPosition(mainId) {
    $.ajax({

        //CP1. Complete Ajax Code to GET ALL pin data 
        type: "GET",
        url: "https://reststepvx20180923124000.azurewebsites.net/Api/Staffs/" + mainId,

    }).then(function (data) {

        // document.getElementById("firstQueue").innerHTML = data.Name;

        if (data.Position === "Admin") {
            console.log("I'm Admin");
        } else if (data.Position === "Queue") {
            console.log("I'm Queue");
        } else if (data.Position === "Table") {
            console.log("I'm Table");
        } else if (data.Position == "Chef") {
            console.log("I'm Chef");
        } else {
            console.log("Don't have position");
        }



    });

}

function autoLogIn(email,password) {

 
  // var credential = firebase.auth.EmailAuthProvider.credential(email, password);
  firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
          } else {
              alert(errorMessage);
          }
          console.log(error);
      });


}