
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
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
  });
  
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
  
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


app.listen(port,()=>{
    console.log("Server started at http://localhost:5000")
})