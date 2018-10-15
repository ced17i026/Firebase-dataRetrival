var express = require("express"),
firebase = require("firebase"),
request = require("request"),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
bodyParser = require("body-parser"),
app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//accessing the firebase 
var config = {
    apiKey: "AIzaSyCPFJQqBKcXUlQz19bvW4auQQgmT3FQU4s",
    authDomain: "munshik3-46360.firebaseapp.com",
    databaseURL: "https://munshik3-46360.firebaseio.com",
    projectId: "munshik3-46360",
    storageBucket: "munshik3-46360.appspot.com",
    messagingSenderId: "684242987795"
};
var initialization = firebase.initializeApp(config);
//accessing the firebase ends here
//accessing the firestore
const firestore = firebase.firestore();
var data = firestore.collection("barcode_inventory");

data.get().then(function(doc){
    var userData = doc._snapshot.docChanges[0].doc.data;
    console.log(userData);
})


app.listen(7000, function(req,res){
    console.log("Your Server is running...");
})