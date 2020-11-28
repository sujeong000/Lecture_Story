var firebaseConfig = {
    apiKey: "AIzaSyBriqW5bb956O8Mi87iZJKtdNsD4uWGBp4",
    authDomain: "lecture-story.firebaseapp.com",
    databaseURL: "https://lecture-story.firebaseio.com",
    projectId: "lecture-story",
    storageBucket: "lecture-story.appspot.com",
    messagingSenderId: "109177070261",
    appId: "1:109177070261:web:8b6aa71008757f550254fc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
var ui = firebaseui.auth.AuthUI(firebase.auth());
//현재 선택된 학기가 뭐인지 받아오는거 실패
// var sel=document.getElementById(sel);
// var sem=sel.options[sel.selectedIndex].value;

// var semester=$("#sel option:selected").text();


var semester = "2020_1학기";
//과목명 검색
function register() {
    var search_key = document.getElementById("search").value;
    localStorage.setItem("storageName", search_key);
    localStorage.setItem("Semester", semester);
}

var index;
$(document).ready(function () {
    $("section").click(function () {
        // console.log($(".content").index($(this)));
        index = $(".content").index($(this));
    })
})



function move(evt) {

    var text = evt.getElementsByTagName("span")[0].innerHTML;
    var textlist = text.split(' ');
    // 
    var courseName = textlist[0].split("(")[0]; console.log(courseName);
    localStorage.setItem("courseName", courseName);
    var prof = textlist[2]; console.log(prof);
    localStorage.setItem("prof", textlist[2]);
    var ref = db.collection("Users")
    .doc(firebase.auth().currentUser.uid)
    .collection("즐겨찾기")
    .where("학기", "==", "2020-2학기")
    .where("교과목명", "==", courseName)
    .where("교수명", "==", prof);
    ref.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var courseNO = doc.data().학수번호; console.log(courseNO);
            localStorage.setItem("courseNO", courseNO);
            var semester = doc.data().학기; console.log(semester);
            localStorage.setItem("semester", semester);
        });
    });
    window.location.href = "timeline.html";
}



window.onload = function () {
    console.log(auth.currentUser.uid);
    var ref = db.collection(UserrInfo).doc(auth.currentUser.uid).collection("tags");
    var arr = [];
    ref.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            arr.push(doc.data().tag);
        });
        console.log(arr);
        $("#select_tag").empty();

        //tag 옵션에 추가
        for (var i = 0; i < arr.length; i++) {
            var option = $("<option>" + arr[i] + "</option>");
            $('#select_tag').append(option);
        }
    });
}