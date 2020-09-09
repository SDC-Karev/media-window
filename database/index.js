const { Client } = require('pg');

const db = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: 5432,
});

db.connect();

const getGameByID = (gameID, callback) => {
  db.query('SELECT * FROM games WHERE id = $1', [gameID])
    .then((results) => {
      callback(null, results.rows);
    })
    .catch((error) => {
      callback(error, null);
    });
};

module.exports.getGameByID = getGameByID;
