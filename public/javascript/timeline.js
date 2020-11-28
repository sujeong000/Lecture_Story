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

// 로그아웃 함수
function logOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.href="login.html";
    }).catch(function(error) {
        // An error happened.
    });
}

localStorage.setItem("courseNO", "20479");
localStorage.setItem("courseName", "이산수학");
localStorage.setItem("prof", "이숙영");
localStorage.setItem("semester", "2020_2학기");

// 렉쳐정보 전달 받기
const courseNO=localStorage.getItem("courseNO");
const courseName=localStorage.getItem("courseName");
const prof=localStorage.getItem("prof");
var semester=localStorage.getItem("semester");

// 렉처 이름 띄우기
document.getElementById("subject").innerHTML=courseName+"-"+prof;

// 초기 태그는 최근 태그로 설정, 최근 포스팅 가져오기
var docRef = db.collection(semester).doc(courseNO+"-"+prof).collection("board");
var tagName = "최근";
loadPostings(docRef);

// 게시글 클릭하면 해당 게시글과 댓글 확인하는 페이지로 이동하는 함수
function readPost(evt){
    // 해당 문서로 이동하기 위해 문서 id 저장
    localStorage.setItem("docID", evt.currentTarget.value);
    // 해당 문서로 이동
    window.location.href="read_post.html";
}

// 태그 버튼 누르면 db의 해당 태그의 게시글들 로딩시키는 함수
function getTagPostings(evt){
    tagName = evt.currentTarget.innerText;
    tagName = tagName.substring(1, tagName.length);
    docRef = db.collection(semester).doc(courseNO+"-"+prof).collection("board");
    loadPostings(docRef);
}

/* 타임 라인 변경 및 실시간 업데이트*/

// 포스팅들 띄울 html 공간
var postingZone = document.querySelector(".postings");

// 변화 감지해서 계속 포스팅 로드하는 함수
function loadPostings(docRef){
    console.log("포스팅 로드 시작");
    //리스너 생성
    docRef
    .orderBy("time", "desc") //시간 내림차순
    .onSnapshot((docSnapshot) => {  //스냅샷
    postingZone.innerHTML = ""; //포스팅 뜨는 세션에 HTML 부분 적기
    //db에서 읽으면서 html 코드 추가
    docSnapshot.forEach((doc) => {
      if(doc.data().tag === tagName || tagName === "최근"){
        console.log(tagName+" "+semester);
        var entry = document.createElement("li");

        var post = document.createElement("div");
        post.setAttribute("class","post");
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

      // 각 게시글 누르면 해당 게시글로 이동하는 이벤트리스너 등록
        var tags = document.querySelectorAll(".post");
        var tagsNum = tags.length;
        for(var i=0; i< tagsNum; i++){
            tags[i].addEventListener("click", readPost);
        }
      
    });
    
    });
}

/* 타임 라인 변경 및 실시간 업데이트*/

// 타임라인 띄울 html 공간
var timelineZone = document.getElementById("timelineSec");

// 변화 감지해서 계속 타임라인 로드하는 함수
function loadTimelineTags(){
    var entry = document.createElement("li");

    var timelineRef = db.collection(semester).doc(courseNO+"-"+prof).collection("tags");
    //리스너 생성
    timelineRef
    .orderBy("time", "desc") //시간 내림차순
    .onSnapshot((docSnapshot) => {  //스냅샷
    timelineZone.innerHTML = ""; //타임라인 뜨는 세션에 HTML 부분 적기
    //db에서 읽으면서 html 코드 추가
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
}

// 페이지 로드 시 타임라인 초기값 로드
loadTimelineTags();

// 학기 select 박스에서 학기를 변경할 경우 작동하는 함수
function change_tag(){

    // html에서 학기 이름 따오기
    var tag_choice = document.querySelector(".semester");
    var tag_selected = tag_choice.options[tag_choice.selectedIndex].value
    tag_selected = tag_selected.replace("-", "_");

    // 학기 이름 저장하고 학기 이름 변경
    localStorage.setItem("semester", tag_selected);
    semester = localStorage.getItem("semester");

    // 바뀐 학기의 타임라인과 포스팅 기본값(최근) 로드
    docRef = db.collection(semester).doc(courseNO+"-"+prof).collection("board");
    timelineRef = db.collection(semester).doc(courseNO+"-"+prof).collection("tags");
    tagName="최근";
    loadPostings(docRef);
    loadTimelineTags();
}
