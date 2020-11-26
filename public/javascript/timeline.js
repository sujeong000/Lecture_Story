var firebaseConfig = {
    apiKey: "AIzaSyCTexaR10Q0JKdVdUPrEhovRK5Mx_w-NO4",
    authDomain: "lecture-story-2.firebaseapp.com",
    databaseURL: "https://lecture-story-2.firebaseio.com",
    projectId: "lecture-story-2",
    storageBucket: "lecture-story-2.appspot.com",
    messagingSenderId: "70634403692",
    appId: "1:70634403692:web:5833a0adb975d77c186549"
  };
firebase.initializeApp(firebaseConfig);

const db=firebase.firestore();
db.settings({timestamsInSnapshots:true});

function doDisplay(){
    var con = document.getElementById("logout-menu");
    if(con.style.display=='none'){
        con.style.display='block';
    }
    else{
        con.style.display='none';
    }
}

function logOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.href="login.html";
    }).catch(function(error) {
        // An error happened.
    });
}

function loglog(tt){
    var tagName = tt.innerText.substring(1, tt.innerText.length);
    db.collection("tags").add({
        tagname: tagName
    });
}

var tags = document.querySelectorAll(".tag");
var tagsNum = tags.length;
for(var i=0; i< tagsNum; i++){
    tags[i].addEventListener("click", getTagPostings);
}

//학기 html에서 따옴
var semester = document.querySelector(".semester");
semester = semester.options[semester.selectedIndex].text;
semester = semester.split("-");
var semesterName = semester[0] +"_"+semester[1];
console.log(semesterName);

var docRef = db.collection("2020_1학기").doc("10012-김영주");
console.log(docRef.data().학수번호);

//강의명(교수님) html에서 따옴, html 안에꺼 컬렉션 이름처럼 임의로 바꿨음
var lectureName = document.querySelector(".subject").innerText;
lectureName = lectureName.split("-");
var entireLec = db.collection(semesterName);
lecture = entireLec.where("교과목명", "==", lectureName[0]);
lecture = lecture.where("교수명", "==", lectureName[1]);
console.log('${lecture.data().학수번호}');

//태그 버튼 누르면 db에 해당 태그 문서 생성되게
function getTagPostings(evt){
    var tagName = evt.currentTarget.innerText;
    //var docRef = db.collection(lectureName).collection("board");
    var docRef = db.collection("2020_2").doc("10011-01").collection("board");
   
    docRef.where("tag", "==", "잡담")
    .get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            console.log(doc.id);
        });
    });
}


