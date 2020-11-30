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

 // 렉쳐정보 전달 받기
 const courseNO=localStorage.getItem("courseNO");
 const courseName=localStorage.getItem("courseName");
 const prof=localStorage.getItem("prof");
 var semester=localStorage.getItem("semester");
 var doc_id = localStorage.getItem("docID");

 console.log(courseNO,courseName,prof,semester,doc_id);
// 렉처 이름 띄우기
document.getElementById("subject").innerHTML=courseName+"-"+prof;
  
// 학기 select box의 디폴트 값을 현재 학기로 설정
var semester_value = semester.substring(0, 6);
var select_tag = document.getElementById(semester_value);
select_tag.setAttribute("selected", "selected");

// 로그아웃 함수
function logOut() {
  firebase.auth().signOut().then(function () {
      // Sign-out successful.
      window.location.href = "login.html";
  }).catch(function (error) {
      // An error happened.
  });
}

// var postingZone = document.querySelector(".content");
// postingZone.innerHTML="";
// var commentZone;

  //localStorage.setItem("cont", "sksksksk");

  const content_box = document.getElementById("content");
  //content_box.focus();
  var doc_Ref = db.collection(semester).doc(courseNO+"-"+prof).collection("board").doc(doc_id);
  //console.log(doc_Ref);

  doc_Ref.get().then((doc)=>{
    var origin_text=doc.data().content;
    content_box.innerHTML = origin_text;
    });


    function sub(){ 
      var n_content = document.getElementById("content").value;
      
      if(content === "") {
          alert("내용을 입력해주세요.");
      }
      else{
          doc_Ref.update({
              time: firebase.firestore.Timestamp.fromDate(new Date()),
              content: n_content
          }).then(function(){
            window.location.href = "read_post.html";
          });
      };
  }
