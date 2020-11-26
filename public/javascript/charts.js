const firebaseConfig = {
  apiKey: "AIzaSyCTexaR10Q0JKdVdUPrEhovRK5Mx_w-NO4",
  authDomain: "lecture-story-2.firebaseapp.com",
  databaseURL: "https://lecture-story-2.firebaseio.com",
  projectId: "lecture-story-2",
  storageBucket: "lecture-story-2.appspot.com",
  messagingSenderId: "70634403692",
  appId: "1:70634403692:web:5833a0adb975d77c186549"
};
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
//google.charts.load('current', {packages: ['corechart']});
var ref = db.collection("2020_1학기").doc("10011-안기주,이혜림").collection("grades");

ref.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.data().tag}`);
  });

  /*google.charts.load('current', {
      'packages': ['corechart']
  });
  google.charts.setOnLoadCallback(drawChart(grades));
  */
});

/*
function drawChart(grades) {
  var array = $.map(grades, function(value, index) {
      return [value];
  });
  console.log(array);

  var data = new google.visualization.DataTable();
  data.addColumn('string', "Student")
  data.addColumn('number', 'Grade');  

  var output = [];
  for(var i = 0; i<array.length; i++) {
      var item = array[i];
      output.push([String(i),parseInt(item)]);
  }
  console.log(output);
  data.addRows(output);

    
  // Set chart options
  var options = {
    title: '사람(명), 점수',
    width: 1700,
    height: 700,
    colors: ['#AAAAAA'],
    legend: { position: 'none' },
    bar: { gap: '50%' },
    histogram: {
        bucketSize: 5,
        maxNumBuckets: 300,
        hideBucketItems: true,
        
    },
  };				
  // Instantiate and draw the chart.
  var chart = new google.visualization.Histogram(document.getElementById('chart_div'));
  chart.draw(data, options); 
};
google.charts.setOnLoadCallback(drawChart);
*/