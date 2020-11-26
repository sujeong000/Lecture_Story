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


  //현재 선택된 학기가 뭐인지 받아오는거 실패
 // var sel=document.getElementById(sel);
 // var sem=sel.options[sel.selectedIndex].value;
  
// var semester=$("#sel option:selected").text();

 var semester="2020_1학기";
//과목명 검색
function register(){
    var search_key=document.getElementById("search").value;
    localStorage.setItem("storageName",search_key);
    localStorage.setItem("Semester",semester);
 }


var index;
$(document).ready(function(){
    $("section").click(function(){
        // console.log($(".content").index($(this)));
        index = $(".content").index($(this));
    })
})


function move1() {
    var info = docum/ent.getElementsByTagName("span")[index].innerHTML;
    console.log(index + " " + info);
    // location.href="../html/timeline.html";
}

function move(evt){
    var text = evt.getElementsByTagName("span")[0].innerHTML;
    console.log(text);
    var textlist = text.split(' ');

    console.log("11101");
    localStorage.setItem("courseName", "11101");

    console.log(textlist[0].split("(")[0]);
    localStorage.setItem("courseName", textlist[0].split("(")[0]);

    console.log(textlist[2]);
    localStorage.setItem("prof", textlist[2]);

    console.log("2020-2학기");
    localStorage.setItem("semester" , "2020-2학기");
}
