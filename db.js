const mongoose = require("mongoose");

var mongoURL ='mongodb+srv://syedsohaibali346:LqIoyw98zhXf3Pgq@cluster0.3vqsohc.mongodb.net/sheyroom';

mongoose.connect(mongoURL ,{useUnifiedTopology:true , useNewUrlParser:true});

var connection= mongoose.connection;

connection.on('error' , ()=>{
    console.log('Mongo DB connection error')
})

connection.on('connected' , ()=>{
    console.log('Mongo DB connection successful')
})

module.exports= mongoose