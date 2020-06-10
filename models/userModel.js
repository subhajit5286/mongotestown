const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
 
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
      type: String, required: true, unique: true, index: true, dropDups: true,
    },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  });
  
  //const userModel = mongoose.model('User', userSchema);
  
 
module.exports = mongoose.model('User', UserSchema);