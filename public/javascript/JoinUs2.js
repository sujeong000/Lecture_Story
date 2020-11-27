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

form.addEventListener('submit', (e) => {
    e.preventDefault();


    db.collection("UserInfo2").add({
        name: form.p_name.value,
        year: form.p_year.value,
        month: form.p_month.value,
        day: form.p_day.value
    });

});


// //회원가입 화면에서 board.html로 간다
// firebase.auth().onAuthStateChanged(firebaseUser => {
//     if (firebaseUser) {
//         window.location.href = "board.html";
//     }
// });