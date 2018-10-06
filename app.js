var express = require("express"),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
app = express();
app.use(express.static("public"));

app.get("/", function(req,res){
    var friends = ["Shiv Shankar", "Krishna Kumar Sutar", "Aviral Rai", "Bazif Rasool"];
    res.render("home.ejs", {friends: friends});
})


app.listen(7000, function(req,res){
    console.log("Your Server is running...");
})