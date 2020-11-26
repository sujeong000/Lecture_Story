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
    tags[i].addEventListener("click", addToStore);
}

//태그 버튼 누르면 db에 해당 태그 문서 생성되게
function addToStore(evt){
    var tagName = evt.currentTarget.innerText;
    db.collection("tags").add({
        tagname: tagName.substring(1, tagName.length)
    });
}


