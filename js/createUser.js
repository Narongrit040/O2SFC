var verificationPass = "";
var verificationPassDigi = "";
document.getElementById("checkInfor").disabled = true;
$('#inputPassword, #confirm_password').on('keyup', function () {
    if ($('#inputPassword').val() == $('#confirm_password').val()) {
        $('#message').html('Matching').css('color', 'green');
        verificationPass = "true";
    } else {
        $('#message').html('Not Matching').css('color', 'red');
        verificationPass = "fasle";
    }
    if ($('#confirm_password').val().length < 1) {
        $('#message').html('*').css('color', 'red');
    }



    if ($('#inputPassword').val().length >= 6) {
        $('#messageDigi').html('Pass').css('color', 'green');
        verificationPassDigi = "true";
    } else {
        $('#messageDigi').html('you have to enter at least 6 digit!').css('color', 'red');
        verificationPassDigi = "fasle";
    }

    if (verificationPass === "true" && verificationPassDigi === "true") {
        document.getElementById("checkInfor").disabled = false;
    } else {

        document.getElementById("checkInfor").disabled = true;
    }
});

function registerStaff() {
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);

    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var uid = user.uid;

            //  window.location.href = "page2.html";
            console.log("xxxxxxx");
            console.log(uid);
            if(uid != null){
                logOut();
            }
            // ...
        } else {
            // User is signed out.
            uid = null;
            console.log("no");
            console.log(uid);

            // ...
        }
    });
 
}

function logOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        // alert('Sign-out successful');
        alert('เพิ่มสมาชิกสำเร็จ');
    }).catch(function (error) {
        // An error happened.
        alert('error');
    });
}