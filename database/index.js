const { Client } = require('pg');

const db = new Client({
  user: process.env.PG_USER || 'ryanzigler',
  password: process.env.PG_PASSWORD || 'supersecretpassword',
  database: process.env.PG_DATABASE || 'media-window',
  host: process.env.PG_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
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
