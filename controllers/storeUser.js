const User = require('../models/User')
const express = require('express');
const router = express.Router();

// module.exports = (req, res) => {
//     User.create(req.body, (error, user) => {
//         if (error) {
//             return res.send({error})
//         }
//         res.send('user creation success')
//     })
// }
router.post('/register', async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser)
      })
    } else {
      res.status(401).send({ msg: 'Invalid User Data.' });
    }
  
  })
  export default router;