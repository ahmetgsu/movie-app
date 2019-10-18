const mongoose = require('mongoose');

const RateSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  movieId: {
    type: String
  },
  movieTitle: {
    type: String
  },
  userRate: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('rate', RateSchema);
