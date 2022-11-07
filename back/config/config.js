const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: 'Winner1201!',
    database: 'HeartGram',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: 'Winner1201!',
    database: 'HeartGram',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: 'Winner1201!',
    database: 'HeartGram',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
