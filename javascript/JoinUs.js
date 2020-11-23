// Your web app's Firebase configuration
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

const auth = firebase.auth();

//   const db=firebase.firestore();
//   db.settings({timestamsInSnapshots:true});

  function signUp(){
  
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var password_check = document.getElementById("password_check");

    var email_ch = email.value.split("@")[1];
    if (email_ch !== "ewhain.net") {
        document.test.Email.focus();
        alert("이화인 계정이어야 합니다.");
    } else if (password.value === "") {
        alert("비밀번호를 입력하세요");
    } else if (password.value.length < 6) {
        alert("비밀번호는 6자 이상이어야 합니다");
    } else if (password.value !== password_check.value) {
        document.test.p_check.focus();
        alert("비밀번호를 다시 확인해 주세요.");
    } else {
        const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
        promise.catch(e => alert(e.message));
        
        
        // const form = document.querySelector('#JoinUsForm');
        // form.addEventListener("button",(e) =>{
        //     e.preventDefault();
        //     db.collection("UserInfo").add({
        //         name:form.p_name.value,
        //         year:form.p_year.value,
        //         month:form.p_month.value,
        //         day:form.p_day.value
        //     });
        //     form.p_name.value="";
        //     form.p_name.value="";
        //     form.p_name.value="";
        //     form.p_name.value="";
        // })
        //회원가입 하면 바로 board.html로 간다.
        window.location.href="board.html";
    }
}

