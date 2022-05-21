const jwt = require('jsonwebtoken');
const { config } = require('../../../config/config');
const secret = config.jwtGeoSecret; 

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);

module.exports = token;