const jwt = require('jsonwebtoken');
require('dotenv').config();
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.split(' ')[1];
        console.log(token)
        console.log(process.env.JWT_Secret)
      jwt.verify(token, process.env.JWT_Secret , (err, user) => {
        if (err) {
            console.log(err);
            console.log(user)
          return res.sendStatus(403);
        }
  
        req.user = user;  // Assigns the decoded user object to req.user so that the user can be accessed in the next middleware
        next();
      });
    } else {
        console.log("Invalid Token")
      res.sendStatus(401);
    }
  }
  
  // middleware to check if user is an admin
  function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.sendStatus(403);
    }
  }
  
  module.exports = {
    authenticateJWT,
    isAdmin
  };