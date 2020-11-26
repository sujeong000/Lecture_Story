// window.onload = function() {
//     var getInput = prompt("Hey type something here: ");
//     console.log(getInput);
//     localStorage.setItem("storageName",getInput);
//  }
 
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