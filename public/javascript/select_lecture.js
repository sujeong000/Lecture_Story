// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTexaR10Q0JKdVdUPrEhovRK5Mx_w-NO4",
    authDomain: "lecture-story-2.firebaseapp.com",
    databaseURL: "https://lecture-story-2.firebaseio.com",
    projectId: "lecture-story-2",
    storageBucket: "lecture-story-2.appspot.com",
    messagingSenderId: "70634403692",
    appId: "1:70634403692:web:5833a0adb975d77c186549"
  };
  firebase.initializeApp(firebaseConfig);

//과목명 검색
function register(){
  var search_key=document.getElementById("search").value;
  localStorage.setItem("storageName",search_key);
}

//검색어: [  ] 표시하는 부분
const storageKey=localStorage.getItem("storageName");
document.getElementById("search_key").innerHTML=storageKey;

//필요한 기능
//1. 버튼 눌러서 등록하면, 그 과목이 즐겨찾기(board)에 추가되어야 한다. //데이터 구조를 어쩔건지
//2. 검색어에 맞게 해당되는 부분만 골라서 리스트를 출력해야한다.


