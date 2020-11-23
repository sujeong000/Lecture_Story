//사용자 상태 인식 함수
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      window.alert("로그인 됐습니다");
    } else {
      // No user is signed in.
    }
  });

//로그인 버튼 눌렀을 때 함수
function login(){
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    //로그인 하는 함수
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}