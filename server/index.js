/* eslint-disable no-console */
/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const Game = require('../database/index');

const app = express();

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccess: 200,
// };

app.use(bodyParser.urlencoded({ extended: true, useUnifiedTopology: true }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../public`));

app.get('/api/mediaData/:id', (req, res) => {
  const { id } = req.params;
  Game.findOne({ id }, (err, game) => {
    if (err) {
      res.status(404).end('An error occured while retrieving id from DB');
    } else {
      res.status(200).json(game);
    }
  });
});

app.post('/api/mediaData/:id', (req, res) => {
  const newGame = new Game(req.body);
  newGame.save((err, game) => {
    if (err) {
      res.status(500).end('An error occurred while saving item to DB');
    } else {
      res.status(201).end('Game added to DB');
    }
  });
});

app.put('/api/mediaData/:id', (req, res) => {
  Game.findOneAndUpdate({ id: req.params.id }, { $set: req.body }, { new: true }, (err, game) => {
    if (err) {
      res.status(500).end('An error occurred while updating item in DB');
    } else {
      res.status(200).end('Game updated in DB');
    }
  });
});

app.delete('/api/mediaData/:id', (req, res) => {
  const gameID = req.params.id;
  Game.remove({ id: gameID }, (err, game) => {
    if (err) {
      res.status(500).end('An error occurred while deleting item from DB');
    } else {
      res.status(200).end('Game removed from DB');
    }
  });
});

const port = 3001;

app.listen(port, () => {
  console.log(`SERVER RUNNING ON: ${port}`);
});
