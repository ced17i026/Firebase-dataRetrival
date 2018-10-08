var express = require("express"),
firebase = require("firebase"),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
bodyParser = require("body-parser"),
app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

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