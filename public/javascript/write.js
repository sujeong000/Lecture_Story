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

//tag 불러오기
window.onload = function() {
    var ref = db.collection("2020_1학기").doc("20479-이숙영").collection("tags");
    var arr = [];
    ref.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        arr.push(doc.data().tag);
        });
        console.log(arr);
        $("#select_tag").empty();

        //tag 옵션에 추가
        for(var i = 0; i<arr.length; i++) {
            var option = $("<option>"+arr[i]+"</option>");
            $('#select_tag').append(option);
        }
    });
}

//태그 추가할 때