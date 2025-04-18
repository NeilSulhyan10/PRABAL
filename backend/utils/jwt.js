require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

exports.generateToken = (user, role) => {
  return jwt.sign({ id: user.id, role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
