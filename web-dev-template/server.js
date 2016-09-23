var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/meanblogs');

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//code for handling CRUD operations from client
app.get("/api/post",findallposts);
app.delete("/api/post/:id",deletespecifiedarrayinobj);
app.post("/api/post",createposts);

// setting database schema
var schema = mongoose.Schema({
    title:String,
    body:String
});
// creating database object
var dbobj = mongoose.model("dbobj",schema);

var posts = [];
function findallposts(req,res){
    //console.log(req);
    //res.send(posts);
    dbobj.find()
         .then(function(docs){
             posts = docs;
             res.send(posts);
         })
}
function deletespecifiedarrayinobj(req,res){
    var id = req.params.id;
    console.log("id"+id);
    //posts.splice(index,1);
    dbobj.remove({_id : id})
         .then(function (stat) {
             console.log("stat"+stat);
             findallposts(req,res);
         })
}
function createposts(req,res) {
    var obj = req.body;
    console.log("new object to be created" + obj);
    dbobj.create(obj)
         .then(function(doc){
             posts.push(doc);
             res.send(posts);
         });
}

// code to work on open shift.
require ("./test/app.js")(app);
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);
