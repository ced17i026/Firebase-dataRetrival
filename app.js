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


//barcode_inventory starts here
var barcode_inventory_data = firestore.collection("barcode_inventory");
//creating the schema for mongoose
var dataSchema = new mongoose.Schema({},{"strict":false});
var dataTable = mongoose.model("barcodeInventory",dataSchema);
barcode_inventory_data.get().then(function(doc){
    var userData; //= doc._snapshot.docChanges[0].doc.data;
    var collections = doc._snapshot.docChanges;
    collections.forEach(function(Mdata){
        userData = Mdata.doc.data;
        if(userData)
        {
            var data = {
                barcode_number: userData.internalValue.root.value.internalValue,
                barcode_name: userData.internalValue.root.left.value.internalValue,
                barcode_price: userData.internalValue.root.right.left.value.internalValue,
                timestamp: userData.internalValue.root.right.value.internalValue
            }
            console.log(data);
            dataTable.create(data,function(data){
                console.log(data);
            })
        }
    })
})


app.listen(7000, function(req,res){
    console.log("Your Server is running...");
})