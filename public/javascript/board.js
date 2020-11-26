// window.onload = function() {
//     var getInput = prompt("Hey type something here: ");
//     console.log(getInput);
//     localStorage.setItem("storageName",getInput);
//  }

//과목명 검색
function register() {
    var search_key = document.getElementById("search").value;
    localStorage.setItem("storageName", search_key);
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