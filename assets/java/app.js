$("#update") .on("click", function(){document.location.reload(true);
})
  var config = {
    apiKey: "AIzaSyBsCbFCxm5MNwPrmEmOYv82PkCP9wToo0Y",
    authDomain: "train-schedule-85c98.firebaseapp.com",
    databaseURL: "https://train-schedule-85c98.firebaseio.com",
    projectId: "train-schedule-85c98",
    storageBucket: "train-schedule-85c98.appspot.com",
    messagingSenderId: "366955944771"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trnName = $("#train-name-input").val().trim();
    var trnDestination = $("#destination-input").val().trim();
    var trnStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var trnFrequency = $("#frequency-input").val().trim();
    console.log(trnStart);
  
    var newTrn = {
      name: trnName,
      destination: trnDestination,
      start: trnStart,
      frequency: trnFrequency
    };
  
    database.ref().push(newTrn);
  
    console.log(newTrn.name);
    console.log(newTrn.destination);
    console.log(newTrn.start);
    console.log(newTrn.frequency);
  
    alert("train successfully added");
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    var trnName = childSnapshot.val().name;
    var trnDestination = childSnapshot.val().destination;
    var trnStart = childSnapshot.val().start;
    var trnFrequency = childSnapshot.val().frequency;
  
    console.log(trnName);
    console.log(trnDestination);
    console.log(trnStart);
    console.log(trnFrequency);

    var trnStartConverted = moment(trnStart, "HH:mm");
    console.log(trnStartConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var diffTime = moment().diff(moment(trnStartConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % trnFrequency;
    console.log(tRemainder);

    var tMinutesTillTrain = trnFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    
    var trnStartPretty = moment.unix(trnStart).format("HH:mm");
  
    var newRow = $("<tr>").append(
      $("<td>").text(trnName),
      $("<td>").text(trnDestination),
      $("<td>").text(trnFrequency + "  minutes"),
      $("<td>").text (trnStartPretty),
      $("<td>").text(tMinutesTillTrain+ "  minutes"),
      $("<td>").text(moment(nextTrain).format("HH:mm"))
      
    );
    
    $("#train-table > tbody").append(newRow);
  });