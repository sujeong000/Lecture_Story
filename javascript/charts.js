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

var database = firebase.database();
google.charts.load('current', {packages: ['corechart']});

firebase.database().ref('/lecture/ComputerArchitecture/statistics').once('value').then(function(snapshot) {
  var grades = snapshot.val();

  google.charts.load('current', {
      'packages': ['corechart']
  });
  google.charts.setOnLoadCallback(drawChart(grades));

});

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
