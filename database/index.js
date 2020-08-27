const mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/media-window', { useNewUrlParser: true });

const gameSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  videoArr: Array,
  photoArr: Array,
});

const GameModel = mongoose.model('GameModel', gameSchema);

const save = (data) => {
  GameModel.create(data, (err, result) => {
    if (err) console.log(err);
    console.log(result);
  });
};

module.exports.save = save;
module.exports.GameModel = GameModel;
