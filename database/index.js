const { Client } = require('pg');
const {
  dbUser, dbPort, dbHost, dbPassword,
} = require('../server/config');

const db = new Client({
  user: dbUser,
  host: dbHost,
  database: 'media-window',
  password: dbPassword,
  port: dbPort,
});

db.connect((err) => {
  if (err) {
    console.log(`The following error occurred while attempting to connect to the database: ${err}`);
  } else {
    console.log('Connected to the database');
  }
});

const getGamesByID = (id) => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM games WHERE id = ${id}`, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
});

module.exports = getGamesByID;
