
const bodyParser = require('body-parser');
require("dotenv").config();
const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const storeUserController = require('./controllers/userRoute');
const app =new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL,
{ useNewUrlParser: true,useUnifiedTopology: true },(error)=>{
if(!error){
    console.log('success')
}
else{
    console.log({error})
}
})
app.get('/',(req,res)=>{
    res.send('Hello');
})
//app.post('/usersregister', storeUserController);
app.use('/api/users', storeUserController);
var port = process.env.PORT || 5000;
  

app.listen(port,()=>{
    console.log("Server started at http://localhost:5000")
})