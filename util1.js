const jwt = require("jsonwebtoken");
require("dotenv").config();

  const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (token) {
      const onlyToken = token.slice(7, token.length);
      jwt.verify(onlyToken, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          return res.status(401).send({ msg: 'Invalid Token' });
        }
        req.user = decode;
        next();
        return
      });
    } else {
      return res.status(401).send({ msg: "Token is not supplied." });
    }
  }

  module.exports= isAuth;