const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoModel = require('../database/index');

const app = express();

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccess: 200,
// };
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true, useUnifiedTopology: true }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../public`));

app.get('/api/mediaData/:id', (req, res) => {
  const { id } = req.params;
  mongoModel.GameModel.findOne({ id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.status(500);
    });
});

app.post('/api/mediaData/', (req, res) => {
  mongoModel.GameModel.save({ id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log('ERROR in get request: ', err);
      res.status(500).send('ERROR');
    });
});

// app.put();

// app.delete('/api/mediaData/:id', (req, res) => {
//   const { id } = req.params;
//   mongoModel.GameModel.deleteOne({ id })
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((err) => {
//       console.log('ERROR in get request: ', err);
//       res.status(500).send('ERROR');
//     });
// });

const port = 3001;

app.listen(port, () => {
  console.log(`SERVER RUNNING ON: ${port}`);
});
