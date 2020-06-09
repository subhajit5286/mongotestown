
const bodyParser = require('body-parser');

const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const storeUserController = require('./controllers/storeUser');
const app =new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb+srv://subhajit:sb1234@cluster0-jeuzh.mongodb.net/test?retryWrites=true&w=majority',
{ useNewUrlParser: true,useUnifiedTopology: true },(error)=>{
if(!error){
    console.log('success')
}
else{
    console.log({error})
}
})
app.post('/usersregister', storeUserController);

  

app.listen(5000,()=>{
    console.log("Server started at http://localhost:5000")
})