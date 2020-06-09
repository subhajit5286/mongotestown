const User = require('../models/User')
 
module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            return res.send({error})
        }
        res.send('user creation success')
    })
}