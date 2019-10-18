const mongoose = require('mongoose');

const WatchlistSchema = mongoose.Schema({
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('watchlist', WatchlistSchema);
