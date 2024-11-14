const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

const signToken = (payload) => {
  console.log(secret, '<-- secret')
  return jwt.sign(payload, secret)
}

const verifyToken = (token) => {
  return jwt.verify(token, secret)
}

module.exports = { signToken, verifyToken }