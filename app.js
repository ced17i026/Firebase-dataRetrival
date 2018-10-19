var express = require("express"),
firebase = require("firebase"),
request = require("request"),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
bodyParser = require("body-parser"),
app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
//connecting to mongoDB
mongoose.connect("mongodb://localhost/InternTestData");

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
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);


//getting the barcode_inventory data
var barcode_inventory_data = firestore.collection("barcode_inventory");
//creating the schema for mongoose
var dataSchema = new mongoose.Schema({},{"strict":false});
var dataTable = mongoose.model("barcodeInventory",dataSchema);
barcode_inventory_data.get().then(function(doc){
    var collections = doc._snapshot.docChanges;
    collections.forEach(function(Mdata)
    {
        var data = Mdata.doc.data.internalValue.root;//this is data that has to be inserted to mongo
        console.log(data);
        dataTable.create(data,function(data){
            //data is inserted
        })
        console.log("------------------------------");
    })
})

//getting the user data
var usersData = firestore.collection("users");
//creating the schema for mongoose
var usersdataSchema = new mongoose.Schema({},{"strict":false});
var usersdataTable = mongoose.model("barcodeInventory",dataSchema);
usersData.get().then(function(doc){
    var collections = doc._snapshot.docChanges;
    collections.forEach(function(Mdata)
    {
        var data = Mdata.doc.data.internalValue.root;//this is data that has to be inserted to mongo
        console.log(data);
        dataTable.create(data,function(data){
            //data is inserted
        })
        console.log("------------------------------");
    })
})


app.listen(7000, function(req,res){
    console.log("Your Server is running...");
})