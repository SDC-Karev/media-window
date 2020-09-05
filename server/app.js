require('newrelic');
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('../database/index');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/(:gameID)', express.static(path.join(__dirname, '../public')));

app.get('/api/mediaData/:gameID', (req, res) => {
  const { gameID } = req.params;
  db.getGameByID(gameID, (err, game) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(game);
    }
  });
});

module.exports = { app, port };
