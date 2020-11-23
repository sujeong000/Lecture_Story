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

const auth=firebase.auth();

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

var db = firebase.firestore();

const docRef = firestore.doc("tags");

function loglog(){
    window.alert("loglog");
}

var tags = document.querySelectorAll(".tag");
var tagsNum = tags.length;
for(var i=0; i< tagsNum; i++){
    tags[i].addEventListener("click", loglog);
}




