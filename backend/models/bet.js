const mongoose = require('mongoose');

const betSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true}
});

module.exports = mongoose.model('Bet', betSchema)
