const jwt = require('jsonwebtoken')
const db = require('../models');

// Protect routes
module.exports = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }
  
  if (!token) {
    return next(res.status(401).json('Not authorize to access this route'))
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await db.User.findByPk(decoded);
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Not authorized, token failed'
    })
  }
}
