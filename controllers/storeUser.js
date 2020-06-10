const User = require('../models/User')
const express = require('express');
const router = express.Router();
const getToken = require('../util');
const isAuth = require('../util1');
const jwt = require("jsonwebtoken");
require("dotenv").config();
// module.exports = (req, res) => {
//     User.create(req.body, (error, user) => {
//         if (error) {
//             return res.send({error})
//         }
//         res.send('user creation success')
//     })
// }
router.post('/register', async (req, res) => {
   User.create(req.body, (error, user) => {
           if (error) {
               return res.send({error})
           }
           res.send({
                    
                     _id: user.id,
                     name: user.name,
                     email: user.email,
                     isAdmin: user.isAdmin,
                     token: getToken(user)
                 })
       })
      })  
      router.post('/signin', async (req, res) => {

        const signinUser = await User.findOne({
          email: req.body.email,
          password: req.body.password
        });
        if (signinUser) {
          res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
          });
      
        } else {
          res.status(401).send({ msg: 'Invalid Email or Password.' });
        }
      
      });
    
      router.put('/:id',  async (req, res) => {
        const token = req.headers.authorization;
        const userId = req.params.id;
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
          if (err) {
            return res.status(401).send({ msg: 'Invalid Token' });
          }
          req.user = decode;
          res.send(req.user)
        });
      });
        
// router.post('/register', async (req, res) => {
//     const user = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password
//     });
//     const newUser = await user.save();
//     if (newUser) {
//       res.send({
//         _id: newUser.id,
//         name: newUser.name,
//         email: newUser.email,
//         isAdmin: newUser.isAdmin,
//         //token: getToken(newUser)
//       })
//     } else {
//       res.status(401).send({ msg: 'Invalid User Data.' });
//     }
  
//   })
  module.exports= router;