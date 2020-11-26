// window.onload = function() {
//     var getInput = prompt("Hey type something here: ");
//     console.log(getInput);
//     localStorage.setItem("storageName",getInput);
//  }
 
//과목명 검색
function register(){
    var search_key=document.getElementById("search").value;
    localStorage.setItem("storageName",search_key);
 }