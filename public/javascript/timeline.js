var firebaseConfig = {
  apiKey: "AIzaSyBriqW5bb956O8Mi87iZJKtdNsD4uWGBp4",
  authDomain: "lecture-story.firebaseapp.com",
  databaseURL: "https://lecture-story.firebaseio.com",
  projectId: "lecture-story",
  storageBucket: "lecture-story.appspot.com",
  messagingSenderId: "109177070261",
  appId: "1:109177070261:web:8b6aa71008757f550254fc"
};
firebase.initializeApp(firebaseConfig);

const db=firebase.firestore();
//db.settings({timestamsInSnapshots:true});

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

// // 렉쳐정보 전달 받기
// const courseNO=localStorage.getItem("courseNO");
// const courseName=localStorage.getItem("courseName");
// const prof=localStorage.getItem("prof");
// var semester=localStorage.getItem("semester");

const courseName="이산수학";
const courseNO = "20479";
const prof="이숙영";
var semester="2020_1학기";

// 렉처 이름 띄우기
document.getElementById("subject").innerHTML=courseName+"-"+prof;

function loglog(tt){
    var tagName = tt.innerText.substring(1, tt.innerText.length);
    db.collection("tags").add({
        tagname: tagName
    });
}
var docRef = db.collection(semester).doc(courseNO+"-"+prof).collection("board");
var tagName = "최근";
loadPostings(docRef);

//태그 버튼 누르면 db에 해당 태그 문서 로딩되게
function getTagPostings(evt){
    tagName = evt.currentTarget.innerText;
    tagName = tagName.substring(1, tagName.length);

    loadPostings(docRef);
}

// 포스팅들 띄울 html 공간
var postingZone = document.querySelector(".postings");

// 변화 감지해서 계속 포스팅 로드하는 함수
function loadPostings(docRef){

    //리스너 생성
    docRef
    .orderBy("time", "desc") //시간 내림차순
    .onSnapshot((docSnapshot) => {  //스냅샷
    postingZone.innerHTML = ""; //포스팅 뜨는 세션에 HTML 부분 적기
    //데베에서 읽으면서 html 코드 추가
    docSnapshot.forEach((doc) => {
      if(doc.data().tag === tagName || tagName === "최근"){
        var entry = document.createElement("li");

        var post = document.createElement("div");
        post.setAttribute("class","post");
        // post.setAttribute("onclick", "readPost()");
        post.setAttribute("value", doc.id);
  
        var content = document.createElement("span");
        content.setAttribute("class","contents");
        content.innerText = doc.data().content;
  
        var date_com_like = document.createElement("div");
  
        var date = document.createElement("p");
        date.innerText= doc.data().time.toDate().toDateString();
  
        var like_com = document.createElement("span");
        like_com.setAttribute("class","like-comment");
  
        var like = document.createElement("img");
        like.setAttribute("src", "../imgs/like.png");
        var likeNode = document.createTextNode(doc.data().like+" ");
  
        var comment = document.createElement("img");
        comment.setAttribute("src", "../imgs/comment.png");
        var commentNode = document.createTextNode(doc.data().commentNum+" ");
        
        like_com.append(like);
        like_com.append(likeNode);
        like_com.append(comment);
        like_com.append(commentNode);
        date.append(like_com);
        date_com_like.append(date);
        post.append(content);
        post.append(date_com_like);
        entry.append(post);

        postingZone.appendChild(entry);
      }

      // 각 태그 누르면 해당 태그 포스팅 뜨는 이벤트 리스너 등록
        var tags = document.querySelectorAll(".post");
        var tagsNum = tags.length;
        for(var i=0; i< tagsNum; i++){
            tags[i].addEventListener("click", readPost);
        }
      
    });
    
    });
}

function readPost(evt){
    localStorage.setItem("docID", evt.currentTarget.value);
    // 해당 문서로 넘어가기
    window.location.href="read_post.html";
}




// 포스팅들 띄울 html 공간
var timelineZone = document.getElementById("timelineSec");

// 변화 감지해서 계속 타임라인 로드하는 함수
var entry = document.createElement("li");

var timelineRef = db.collection(semester).doc(courseNO+"-"+prof).collection("tags");
//리스너 생성
timelineRef
.orderBy("time", "desc") //시간 내림차순
.onSnapshot((docSnapshot) => {  //스냅샷
timelineZone.innerHTML = ""; //포스팅 뜨는 세션에 HTML 부분 적기
//데베에서 읽으면서 html 코드 추가
docSnapshot.forEach((doc) => {
    var entry = document.createElement("li");

    var point = document.createElement("div");
    point.setAttribute("class", "point");

    var button = document.createElement("button");
    button.setAttribute("class", "tag");
    var tagNode = document.createTextNode("#"+doc.data().tag);
    button.append(tagNode);

    entry.append(point);
    entry.append(button);

    timelineZone.appendChild(entry);
    
});
// 각 태그 누르면 해당 태그 포스팅 뜨는 이벤트 리스너 등록
var tags = document.querySelectorAll(".tag");
var tagsNum = tags.length;
for(var i=0; i< tagsNum; i++){
    tags[i].addEventListener("click", getTagPostings);
}

});