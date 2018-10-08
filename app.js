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
  firebase.initializeApp(config);
  //accessing the firebase ends here

  //all the routes start here

//code for getting the json file of firebase
request("https://www.gstatic.com/firebasejs/5.5.3/firebase.js", function(err,response, body){
    if(err)
    {
        console.log(err);
    }
    else
    {
        if(response.statusCode === 200)
        {
            console.log(body);
        }
    }
})
app.get("/", function(req,res){
    var friends = ["Shiv Shankar", "Krishna Kumar Sutar", "Aviral Rai", "Bazif Rasool"];
    res.render("home.ejs", {friends: friends});
})

app.get("/:hell", function(req,res){
    res.send("Hello Shiv");
})


app.listen(7000, function(req,res){
    console.log("Your Server is running...");
})