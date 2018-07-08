

// Initialize Firebase


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

// var trainName = "";
// var destination = "";
// var firstTrainTime = '';
// var frequency = 0;
// var nextArrival = 0;
// var minutesAway = 0;

$("#enterTrain").on("click", function (event) {
    event.preventDefault();
// to do - fix time formatting
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = moment($("#first-train").val().trim(), "DD/MM/YY").format("X");
    var frequency = $("#frequency").val().trim();

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


database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    // var trainName = childSnapshot.val().trainName;
    // var destination = childSnapshot.val().destination;
    // var firstTrainTime = childSnapshot.val().firstTrainTime;
    // var frequency = childSnapshot.val().frequency;

    var createRow = function () {

        var tBody = $("tbody");
        var tRow = $("<tr>");


        var trainName = $("<td>").text(childSnapshot.val().trainName);
        var destination = $("<td>").text(childSnapshot.val().destination);
        // var firstTrainTime = $("<td>").text(childSnapshot.val().firstTrainTime);
        var frequency = $("<td>").text(childSnapshot.val().frequency);
        var nextArrival = $("<td>").text(0);
        var minutesAway = $("<td>").text(0);

        tRow.append(trainName, destination, frequency, nextArrival, minutesAway);

        tBody.append(tRow);



    };

    createRow();

});