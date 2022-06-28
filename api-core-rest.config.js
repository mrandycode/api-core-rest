const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  apps: [{
    name: 'api-core-rest',
    script: './index.js',
  }]
}