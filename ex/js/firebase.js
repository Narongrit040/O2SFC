var uid, checkLog;
$("#checkLog").hide();
function checkLogOut() {

    var x = document.getElementById("checkPassStaff").value;

    console.log(x);

    if (x == "xxx") {
        $("#checkLog").show();
        console.log("true");

    } else {
        $("#checkLog").hide();
        console.log("false");
    }

}
function logIn() {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
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

function logOut() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        alert('Sign-out successful');
    }).catch(function (error) {
        // An error happened.
        alert('error');
    });
}
