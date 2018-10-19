var express = require("express"),
firebase = require("firebase"),
mongoose = require("mongoose"),
bodyParser = require("body-parser"),
app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
//connecting to mongoDB
mongoose.connect("mongodb://localhost/InternTestData");

//-------------------------accessing the firebase--------------------------------
var config = {
    apiKey: "AIzaSyCPFJQqBKcXUlQz19bvW4auQQgmT3FQU4s",
    authDomain: "munshik3-46360.firebaseapp.com",
    databaseURL: "https://munshik3-46360.firebaseio.com",
    projectId: "munshik3-46360",
    storageBucket: "munshik3-46360.appspot.com",
    messagingSenderId: "684242987795"
};
var initialization = firebase.initializeApp(config);
//------------------------accessing the firebase ends here-----------------------

//-------------------------accessing the firestore-------------------------------
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);
//-----------------------firestore stuff ends here-------------------------------


//--------------------getting the barcode_inventory data-------------------------
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
//--------------------------------------------------------------------------------

//getting the user data
var usersData = firestore.collection("users");
//creating the schema for mongoose
var usersdataSchema = new mongoose.Schema({},{"strict":false});
var usersdataTable = mongoose.model("usersData",usersdataSchema);
usersData.get().then(function(doc){
    var collections = doc._snapshot.docChanges;
    collections.forEach(function(Mdata)
    {
        var data = Mdata.doc.data.internalValue.root;//this is data that has to be inserted to mongo
        console.log(data);
        usersdataTable.create(data,function(data){
            //data is inserted
        })
        console.log("------------------------------");
    })
})
//---------------------------------------------------------------------------------

//----------------------------getting the costumers data---------------------------
var customersList = firestore.collection("customers");
//creating the schema for mongoose
var customersListSchema = new mongoose.Schema({},{"strict":false});
var customersListTable = mongoose.model("customersList",customersListSchema);
customersList.get().then(function(doc){
    var collections = doc._snapshot.docChanges;
    collections.forEach(function(Mdata)
    {
        var data = Mdata.doc.data.internalValue.root;//this is data that has to be inserted to mongo
        console.log(data);
        customersListTable.create(data,function(data){
            //data is inserted
        })
        console.log("------------------------------");
    })
}) 

//--------------------------------------------------------------------------



//--------------------------REST API begins here----------------------------
//for getting the product info with barcodeName as key
app.get("/barcode_inventory/:barcodeNumber", function(req,res){
    dataTable.find({"value.internalValue":" "+req.params.barcodeNumber},function(err,data){
        console.log("HI!");
        if(!err){
            res.send(data);
        }
        else
        {
            res.send("Err");
        }
    })
})
app.listen(7000, function(req,res){
    console.log("Your Server is running...");
})