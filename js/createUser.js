var verificationPass = "";
var verificationPassDigi = "";
document.getElementById("checkInfor").disabled = true;
$('#inputPassword, #confirm_password,#inputFName,#inputLName,#inputLPosition,#inputEmail').on('keyup', function () {
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
    //-----
    if ($('#inputFName').val().length >= 1 && $('#inputLName').val().length >= 1 && $('#inputLPosition').val().length >= 1 && $('#inputEmail').val().length >= 1) {
        verificationPass = "true";
    } else {
        verificationPass = "fasle";
    }
    //-----
    if ($('#inputPassword').val().length >= 6) {
        $('#messageDigi').html('Pass').css('color', 'green');
        verificationPassDigi = "true";
    } else {
        $('#messageDigi').html('you have to enter password at least 6 characters!').css('color', 'red');
        verificationPassDigi = "fasle";
    }
    //-----
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
            ons.notification.alert('The password is too weak.');
        } else {
            ons.notification.alert(errorMessage);
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
            if (uid != null) {
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
        ons.notification.alert('เพิ่มสมาชิกสำเร็จ');
    }).catch(function (error) {
        // An error happened.
        ons.notification.alert('error');
    });
}