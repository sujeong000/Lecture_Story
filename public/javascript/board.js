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
const container = document.querySelector(".container");
const tag = document.querySelector(".semester");

if (localStorage.getItem("semester") === ""){
    var semester = localStorage.setItem("semester", "2020_2학기");
}
//과목명 검색
function register() {
    var search_key = document.getElementById("search").value;
    localStorage.setItem("storageName", search_key);
    localStorage.setItem("semester", semester);
}

// 학기 select 박스에서 학기를 변경할 경우 작동하는 함수
function change_tag(select_obj){

    // 선택된 학기 정보를 받아 html에서 학기 이름 따오기
    var tag_choice = document.querySelector(".semester");
    var tag_selected = tag_choice.options[tag_choice.selectedIndex].innerHTML.replace("-", "_");
    
    // 학기 이름 저장하고 학기 이름 변경
    localStorage.setItem("semester", tag_selected);
    semester = localStorage.getItem("semester");
    loadPage();
  }

// 특정 과목의 게시판을 선택했을 때 선택한 과목의 정보를 localStorage에 저장 후 페이지 이동
function move(evt) {

    var text = evt.getElementsByTagName("span")[0].innerHTML;
    var textlist = text.split(' ');
   
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
    ref.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var courseNO = doc.data().학수번호; console.log(courseNO);
            localStorage.setItem("courseNO", courseNO);
            var semester = doc.data().학기; console.log(semester);
            localStorage.setItem("semester", semester);
        });
    });
    window.location.href = "timeline.html";
}

// db에서 특정 학기의 수업을 가져와 원하는 형식으로 보여주기.
function loadPage() {
    let html = '';
    db.collection("Users")
        .doc(auth.currentUser.uid)
        .collection("즐겨찾기")
        .where("학기", "==", localStorage.getItem("semester"))
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (subject) {

                const section = `
                <section onClick="move(this)" class="content">
                    <div class="title">
                        <h3 class="name"><span class="t">${subject.data().교과목명}(${subject.data().분반}) - ${subject.data().교수명} 교수님&nbsp&nbsp</span></h3>
                        <div class="line"></div>
                    </div>
                    <div class="text">
                        <p>A poet is a person who creates poetry. Poets may describe themselves as such or be described as such by others. A poet may simply be a writer of poetry, or may perform their art to an audience.</p>
                        <div class="line"></div>
                        <p>A poet is a person who creates poetry. Poets may describe themselves as such or be described as such by others. A poet may simply be a writer of poetry, or may perform their art to an audience.</p>
                        <div class="line"></div>
                        <p>A poet is a person who creates poetry. Poets may describe themselves as such or be described as such by others. A poet may simply be a writer of poetry, or may perform their art to an audience.</p>
                    </div>
                </section>`;
                html += section;
            });
            container.innerHTML = html;
        });
}

// 로그인이나 회원가입 후 User의 정보가 있을 때 모든 기능이 동작함.
firebase.auth().onAuthStateChanged(function(user) {
    if (user){
        loadPage();
    }
});