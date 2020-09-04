/* eslint-disable no-console */
/* eslint-disable no-undef */
const express = require('express');

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

const port = 3001;

app.listen(port, () => {
  console.log(`SERVER RUNNING ON: ${port}`);
});
