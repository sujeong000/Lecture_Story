// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBriqW5bb956O8Mi87iZJKtdNsD4uWGBp4",
    authDomain: "lecture-story.firebaseapp.com",
    databaseURL: "https://lecture-story.firebaseio.com",
    projectId: "lecture-story",
    storageBucket: "lecture-story.appspot.com",
    messagingSenderId: "109177070261",
    appId: "1:109177070261:web:8b6aa71008757f550254fc"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const form = document.querySelector('#JoinUsForm');
// let userid;/
// https://www.youtube.com/watch?v=qWy9ylc3f9U/
form.addEventListener('submit', (e) => {

    e.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var password_check = document.getElementById("password_check");

    var email_ch = email.split("@")[1];
    if (email_ch !== "ewhain.net") {
        document.test.Email.focus();
        alert("이화인 계정이어야 합니다.");
    } else if (password === "") {
        alert("비밀번호를 입력하세요");
    } else if (password.length < 6) {
        alert("비밀번호는 6자 이상이어야 합니다");
    } else if (password !== password_check.value) {
        document.test.p_check.focus();
        alert("비밀번호를 다시 확인해 주세요.");
    } else {
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            alert(cred.user.uid); /* 원하는 정보는 잘 찍히는데 밑에 코드(db에 저장하는 코드가 안먹음 먹었다안먹었다함...) */
            return db.collection("UserInfo4").doc(cred.user.uid).set({
                name: form.p_name.value
            });
        });
    }
});

//회원가입 화면에서 board.html로 간다
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        window.location.href = "board.html";
    }
});