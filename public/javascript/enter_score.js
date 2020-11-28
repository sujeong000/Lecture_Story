const firebaseConfig = {
    apiKey: "AIzaSyBriqW5bb956O8Mi87iZJKtdNsD4uWGBp4",
    authDomain: "lecture-story.firebaseapp.com",
    databaseURL: "https://lecture-story.firebaseio.com",
    projectId: "lecture-story",
    storageBucket: "lecture-story.appspot.com",
    messagingSenderId: "109177070261",
    appId: "1:109177070261:web:8b6aa71008757f550254fc"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var ui = firebase.auth();
var ref = db.collection("2020_1학기").doc("20479-이숙영");

// 렉처 이름 띄우기
//document.getElementById("subject").innerHTML=courseName+"-"+prof;

// 로그아웃 함수
function logOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.href="login.html";
    }).catch(function(error) {
        // An error happened.
    });
}

//tag 불러오기
window.onload = function() {
    var arr = [];
    ref.collection("gradeTags").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        arr.push(doc.data().tag);
        });
        //console.log(arr);

        //tag 옵션에 추가
        for(var i = 0; i<arr.length; i++) {
            var option = $("<option>"+arr[i]+"</option>");
            $('#select_tag').append(option);
        }
    });
}

function check_user(){ 
    var selected_tag = document.getElementById("select_tag").value;

    //현재 userId와 tag가 일치하는 문서가 있으면 접근x
    ref.collection("grades").where('tag', '==', selected_tag).get().then((querySnapshot) => {
        var flag = false;
        querySnapshot.forEach((doc) => {
            if(doc.data().userId === ui.currentUser.uid) {
                flag = true;
            }
        });
        if(flag === true) {
            alert("이미 성적을 입력하였습니다.");
        }
        else {
            submit_grade();
        }
    });
}

function submit_grade() {
    var selected_tag = document.getElementById("select_tag").value;
    var score = document.getElementById("score").value;

    if(score === null) {
        alert("성적을 입력해주세요.");
    }
    else{
        if(selected_tag === "태그 추가") { //태그 추가 선택 + 태그 입력 받아 성적 입력
            var add_tag = document.getElementById("add_tag").value;
            ref.collection("grades").add({
                grade: score,
                tag: add_tag,
                userId: ui.currentUser.uid
            });
            //태그 추가
            ref.collection("gradeTags").add({
                tag: add_tag,
                time: firebase.firestore.Timestamp.fromDate(new Date())
            }).then(function(){
                window.location.href="statistics.html";
            });
        }
        else { //태그를 선택해서 성적 입력
            ref.collection("grades").add({
                grade: score,
                tag: selected_tag,
                userId: ui.currentUser.uid
            }).then(function(){
                window.location.href="statistics.html";
            })
        }
    }
}