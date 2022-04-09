var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    FullName : {
        type:String,
        required:true
    },
    UserName : {
        type:String,
        required:true
    },
    PhoneNumber : {
        type:Number,
        required:true,
        unique:true
    },
    Email : {
        type:String,
        required:true,
        unique:true
    },
    Password : {
        type:String,
        required:true
    },
    ConfirmPassword : {
        type:String,
        required:true
    }
})


const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect("mongodb://localhost:27017/mydatabase",{
    useNewUrlParser: true,
    useUnifiedTopology: true, 
})

var db = mongoose.connection;

db.on('error',()=>console.log("Error in connection to Database"));
db.once('open',()=>console.log("Connected to Database"));

app.post("/login",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var number = req.body.number;

    var data = {
        "Full name": name,
        "Username": name,
        "Email": email,
        "Phonenumber": number,
        "Password": password,
        "Confirm password": password
    };

    db.collection('users').insertOne(data,(err,collection)=>{
        
        if(err){
                throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('registration.html')

})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on PORT 3000");