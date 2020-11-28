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
//현재 선택된 학기가 뭐인지 받아오는거 실패
// var sel=document.getElementById(sel);
// var sem=sel.options[sel.selectedIndex].value;

// var semester=$("#sel option:selected").text();


//과목명 검색
function register() {
    var search_key = document.getElementById("search").value;
    localStorage.setItem("storageName", search_key);
    localStorage.setItem("semester", semester);
    
}

// var semester = document.querySelector(".semester").options[tag_choice.selectedIndex].value;
// //전달받은 학기로 option의 select를 바꿔둔다 //html에서 selected지울지 말지 고민해보기
// if (semester === "2020_2학기") {
//   document.getElementsByTagName('option')[0].selected = "selected";
// } else if (semester === "2020_1학기") {
//   document.getElementsByTagName('option')[1].selected = "selected";
// } else if (semester === "2019_2학기") {
//   document.getElementsByTagName('option')[2].selected = "selected";
// } else if (semester === "2019_1학기") {
//   document.getElementsByTagName('option')[3].selected = "selected";
// } 

// 학기 select 박스에서 학기를 변경할 경우 작동하는 함수
function change_tag(){
    // html에서 학기 이름 따오기
    var tag_choice = document.querySelector(".semester");
    var tag_selected = tag_choice.options[tag_choice.selectedIndex].value
    
    tag_selected = tag_selected.replace("-", "_");
    console.log(tag_selected);
    
    // 학기 이름 저장하고 학기 이름 변경
    localStorage.setItem("semester", tag_selected);
    semester = localStorage.getItem("semester");
  
  }

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

// var ref = db.collection("Users").doc(auth.currentUser.uid).collection("tags");
//     var arr = [];
//     ref.get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             arr.push(doc.data().tag);
//         });
//         console.log(arr);
//         $("#select_tag").empty();

//         //tag 옵션에 추가
//         for (var i = 0; i < arr.length; i++) {
//             var option = $("<option>" + arr[i] + "</option>");
//             $('#select_tag').append(option);
//         }
//     });


function loadPage() {
    let html = '';
    db.collection("Users")
        .doc(firebase.firestore().currentUser.uid)
        .collection("즐겨찾기")
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
loadPage();

