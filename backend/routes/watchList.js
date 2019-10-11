const express = require('express');
const router = express.Router();

// @route   GET api/watchlist
// @desc    Get all users watchlisted movies
// @access  Private
router.get('/', (req, res) => {
  res.send('Get all watchlisted movies of specific user');
});

// @route   POST api/watchlist
// @desc    Add new movie to watchlist
// @access  Private
router.post('/', (req, res) => {
  res.send('Add new movie to watchlist of a user');
});

// @route   DELETE api/watchlist/:id
// @desc    Remove a movie from watchlist
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Remove a movie from the watchlist of a user');
});

module.exports = router;
