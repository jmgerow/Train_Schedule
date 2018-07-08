
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAIWuuZn5ciMHp369rKXK2aN1z3mLuZtA8",
    authDomain: "train-schedule-b2b17.firebaseapp.com",
    databaseURL: "https://train-schedule-b2b17.firebaseio.com",
    projectId: "train-schedule-b2b17",
    storageBucket: "train-schedule-b2b17.appspot.com",
    messagingSenderId: "153602871748"
};
firebase.initializeApp(config);



var database = firebase.database();

// create click event from form and capture user input
$("#enterTrain").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = moment($("#first-train").val().trim(), "h:mm").format("X");
    console.log('firstTrainTime', firstTrainTime)
    var frequency = $("#frequency").val().trim();

// write user input to firebase 
    var newEntry = {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    };

    database.ref().push(newEntry);
    console.log('newEntry', newEntry.trainName)


    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");
});

// create event to update html when child is added
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());


    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;

    //time calculator:
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log('firstTimeConverted', firstTimeConverted)


    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);


    var tRemainder = diffTime % frequency;
    console.log(tRemainder);


    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("h:mm a"));




    // function to write to html in train schedule table
    var createRow = function () {

        var tBody = $("tbody");
        var tRow = $("<tr>");


        trainName = $("<td>").text(childSnapshot.val().trainName);
        destination = $("<td>").text(childSnapshot.val().destination);
        // var firstTrainTime = $("<td>").text(childSnapshot.val().firstTrainTime);
        frequency = $("<td>").text(childSnapshot.val().frequency);
        var nextArrival = $("<td>").text(moment(nextTrain).format("h:mm a"));
        var minutesAway = $("<td>").text(tMinutesTillTrain);

        tRow.append(trainName, destination, frequency, nextArrival, minutesAway);

        tBody.append(tRow);



    };

    createRow();

});