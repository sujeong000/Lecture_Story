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
var ref = db.collection("2020_1학기").doc("20479-이숙영").collection("grades");

// 렉쳐정보 전달 받기
const courseNO=localStorage.getItem("courseNO");
const courseName=localStorage.getItem("courseName");
const prof=localStorage.getItem("prof");
var semester=localStorage.getItem("semester");

// 렉처 이름 띄우기
document.getElementById("subject").innerHTML=courseName+"-"+prof;

// 학기 select box의 디폴트 값을 현재 학기로 설정
var semester_value = semester.substring(0, 6);
var select_tag = document.getElementById(semester_value);
select_tag.setAttribute("selected", "selected");

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
  loadTimelineTags();
}

//tag 중간고사인 것만
ref.where('tag', '==', '중간고사').get().then((querySnapshot) => {
  var arr = new Array;
  querySnapshot.forEach((doc) => {
    arr.push(doc.data().grade);
  });

  google.charts.load('current', {'packages': ['corechart']});
  google.charts.setOnLoadCallback(function() {drawChart(arr)});
});

function drawChart(arr) {
  var array = $.map(arr, function(value, index) {
      return [value];
  });

  var data = new google.visualization.DataTable();
  data.addColumn('string', "Student")
  data.addColumn('number', 'Grade');  

  var output = [];
  for(var i = 0; i<array.length; i++) {
      var item = array[i];
      output.push([String(i),parseInt(item)]);
  }
  data.addRows(output);
    
  // Set chart options
  var options = {
    title: '사람(명), 점수',
    width: 1500,
    height: 700,
    colors: ['#AAAAAA'],
    legend: { position: 'none' },
    bar: { gap: '50%' },
    histogram: {
        bucketSize: 1,
        maxNumBuckets: 300,
        hideBucketItems: true,
        
    },
  };				
  // Instantiate and draw the chart.
  var chart = new google.visualization.Histogram(document.getElementById('chart_div'));
  chart.draw(data, options); 
};

// 타임라인 띄울 html 공간
var timelineZone = document.getElementById("timelineSec");

// 변화 감지해서 계속 타임라인 로드하는 함수
function loadTimelineTags(){
    var entry = document.createElement("li");

    var timelineRef = db.collection(semester).doc(courseNO+"-"+prof).collection("gradeTags");
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
        // // 각 태그 누르면 해당 차트 뜨도록 태그 버튼에다가 이벤트리스너 등록
        // var tags = document.querySelectorAll(".tag");
        // var tagsNum = tags.length;
        // for(var i=0; i< tagsNum; i++){
        //     tags[i].addEventListener("click", 차트 그리는 함수);
        // }
    
    });
}

loadTimelineTags();