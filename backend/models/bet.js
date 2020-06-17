const mongoose = require('mongoose');

const betSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  dateEnd: { type: Date, required: false },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model('Bet', betSchema)
