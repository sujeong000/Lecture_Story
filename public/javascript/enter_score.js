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

//tag 불러오기
window.onload = function() {
    var ref = db.collection("2020_1학기").doc("20479-이숙영").collection("tags");
    var arr = [];
    ref.get().then((querySnapshot) => {
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

// 게시글 클릭하면 해당 게시글과 댓글 확인하는 페이지로 이동하는 함수
function readGrade(evt){
    // 해당 문서로 이동하기 위해 문서 id 저장
    localStorage.setItem("docID", evt.currentTarget.value);
    // 해당 문서로 이동
    window.location.href="statistics.html";
}

function sub(){ 
    var ref = db.collection("2020_1학기").doc("20479-이숙영");
    var selected_tag = document.getElementById("select_tag").value;
    var score = document.getElementById("score").value;
    var ui = firebaseui.auth.AuthUI(firebase.auth());
    //var currUser = ui.currentUser.uid;

    //현재 userId와 tag가 일치하는 문서가 있으면 접근x
    /*ref.collection("tags").where('tag', '==', selected_tag).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(doc.data().userId === currUser) {
                alert("이미 성적을 입력하였습니다.");
            }
        });
    });*/

    if(score === null) {
        alert("성적을 입력해주세요.");
    }
    else{
        //console.log(`${selected_tag}`);
        if(selected_tag === "태그 추가") { //태그 추가 선택 + 태그 입력 받아 성적 입력
            var add_tag = document.getElementById("add_tag").value;
            ref.collection("grades").add({
                grade: score,
                tag: add_tag,
                //userId: currUser
            });
            //태그 추가
            ref.collection("tags").add({
                tag: add_tag,
                time: firebase.firestore.Timestamp.fromDate(new Date())
            });
        }
        else { //태그를 선택해서 성적 입력
            ref.collection("grades").add({
                grade: score,
                tag: selected_tag,
                //userId: currUsER
            });
        }
        //readGrade()
    }
}