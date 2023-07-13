const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { User } = require("../models/index")

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const APP_SECRET = process.env.APP_SECRET

const hashPassword = async (password) => {
  // Accepts a password from the request body
  let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  // Creates a hashed password and encrypts it 12 times
  return hashedPassword
}

const comparePassword = async (storedPassword, password) => {
  // Accepts the password provided in the login request and the currently stored password
  // Compares the two passwords for a match
  let passwordMatch = await bcrypt.compare(password, storedPassword)
  // Returns true if the passwords match
  // Returns false if the passwords are not a match
  return passwordMatch
}

const createToken = (payload) => {
  // Accepts a payload with which to create the token
  let token = jwt.sign(payload, APP_SECRET)
  // Generates the token and encrypts it, returns the token when the process finishes
  return token
}

const stripToken = (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1]
    // Gets the token from the request headers {authorization: Bearer Some-Token}
    // Splits the value of the authorization header
    if (token) {
      res.locals.token = token
      // If the token exists we add it to the request lifecycle state
      return next()
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'Strip Token Error!' })
  }
}

const verifyToken = (req, res, next) => {
  const { token } = res.locals
  // Gets the token stored in the request lifecycle state
  try {
    let payload = jwt.verify(token, APP_SECRET)
    // Verifies the token is legit
    if (payload) {
      res.locals.payload = payload // Passes the decoded payload to the next function
      // Calls the next function if the token is valid
      return next()
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'Verify Token Error!' })
  }
}
const checkAuth = async (req, res, next) => {
  // Check for the token being sent in a header or as a query parameter
  let token = req.get("Authorization") || req.query.token;
  if (token) {
    console.log("token: ", token);
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace("Bearer ", "");
    console.log("token2: ", token);

    const decodedData = jwt.verify(token, process.env.APP_SECRET);

    req.user = await User.findById(decodedData.id);
    next();
  } else {
    // No token was sent
    req.user = null;
    return next();
  }
};


module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  stripToken,
  verifyToken,
  checkAuth
}
