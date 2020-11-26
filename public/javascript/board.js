// window.onload = function() {
//     var getInput = prompt("Hey type something here: ");
//     console.log(getInput);
//     localStorage.setItem("storageName",getInput);
//  }
 

function search(){
    var search_key=document.getElementById("search").value;
    console.log("213121");
    console.log(search_key);
    localStorage.setItem("storageName",search_key);
 }