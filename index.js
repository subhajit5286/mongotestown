
const bodyParser = require('body-parser');
require("dotenv").config();
const express = require('express');
const path = require('path');

const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
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
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
})

var port = process.env.PORT || 5000;
  

app.listen(port,()=>{
    console.log("Server started at http://localhost:5000")
})