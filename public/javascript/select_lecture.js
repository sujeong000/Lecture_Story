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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//과목명 검색
function register(){
  var search_key=document.getElementById("search").value;
  localStorage.setItem("storageName",search_key);
}

//검색어: [  ] 표시하는 부분
var storageKey=localStorage.getItem("storageName");
document.getElementById("search_key").innerHTML=storageKey;

//필요한 기능
//1. 버튼 눌러서 등록하면, 그 과목이 즐겨찾기(board)에 추가되어야 한다. //데이터 구조를 어쩔건지
//2. 검색어에 맞게 해당되는 부분만 골라서 리스트를 출력해야한다.

//#1 과목 검색 한거 select_lecture화면에 강의 띄워주는것 -이진경/하고있는데 잘 안되고 있어...
//#2 과목 즐겨찾기 등록하면 게시판에 추가해주기 - 위의 일이 끝나면 할 수 있음.

//board에서 학기 전달 받음
var semester=localStorage.getItem("Semester");

//데이터베이스
var db = firebase.firestore();
var ref = db.collection(semester);
//통계만 검색해서 통계학이 나오도록 하는 방법은 없나...ㅠ
ref.where("교과목명","==",storageKey).get().then(
  function(querySnapshot){
    var arr = new Array;
    querySnapshot.forEach((doc) => {
      arr.push(doc.id);
      createLine(doc);
  });
}).catch(function(error){
  console.log(error);
});

function createLine(doc){
  var str=doc.data().교과목명+" ("+doc.data().분반+") - "+doc.data().교수명+" 교수님<br>";
  line="<input type='radio'/> "+ "<span>"+str+"</span>";
  $("ul").append(line); //jquery문법, html에 링크 추가함
};

//즐겨찾기 추가한거 정보 보내기
function sendInfo(){

  var num=doc.data().학수번호;
  var name=doc.data().교과목명;
  var pf=doc.data().교수명;
  
  localStorage.setItem("courseNO",num);
  localStorage.setItem("courseName",name);
  localStorage.setItem("prof",pf);
  localStorage.setItem("semester",semester);
}