
const jwt = require('jsonwebtoken');

// Secret key for JWT signing
const JWT_SECRET_KEY = 'asdfgewlnclnlhjkl';

// Function to generate a JWT token
function generateToken(userId) {
  return jwt.sign( {userId} , JWT_SECRET_KEY, { expiresIn: '1h' });
}

// Middleware to validate JWT token
function validateToken(req, res, next) {

  const token = req.header['Authorization'] && req.header('Authorization').split(' ')[1];

     if(!token) {
      return res.status(400).json({ message: 'Authentication failed: Token missing' });
    //   return res.status(401).json({ message: 'Authentication failed: Token missing' });
    }
    try {
        return jwt.verify(token, JWT_SECRET_KEY,(err,decoded)=>{
            if(err){
                return res.status(400).json({ message: 'Authentication failed: Invalid token' });
                // return res.status(401).json({ message: 'Authentication failed: Invalid token' });
            }
            // Token is valid, proceed to the next middleware
            req.user = decoded; // we are storing the decoded token in the request object
            next();
        });
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = {generateToken, validateToken};
