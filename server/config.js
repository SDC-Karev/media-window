const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  dbPort: process.env.DB_PORT,
  dbHost: process.env.DB_HOST,
  dbPassword: process.env.PG_PASSWORD,
  dbUser: process.env.DB_USER,
}