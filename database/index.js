const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/media-window', { useNewUrlParser: true, useUnifiedTopology: true });

const gameSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  videoArr: Array,
  photoArr: Array,
});

const Game = mongoose.model('GameModel', gameSchema);

// const multiSave = (data) => {
//   GameModel.create(data, (err, result) => {
//     if (err) console.log(err);
//     console.log(result);
//   });
// };

module.exports = Game;
