const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Watchlist = require('../models/Watchlist');

// @route   GET api/watchlist
// @desc    Get all users watchlisted movies
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const watchlistedMovies = await Watchlist.find({ user: req.user.id });
    res.json(watchlistedMovies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/watchlist
// @desc    Add new movie to watchlist
// @access  Private
router.post('/', auth, async (req, res) => {
  console.log(req);
  const { movieId, movieTitle } = req.body;
  try {
    const newMovie = new Watchlist({
      movieId,
      movieTitle,
      user: req.user.id
    });

    const movie = await newMovie.save();
    res.json(movie);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/watchlist/:id
// @desc    Remove a movie from watchlist
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let movie = await Watchlist.findById(req.params.id);
    console.log(movie);
    console.log(req);
    if (!movie) return res.status(404).json({ msg: 'Movie not found' });

    // Make sure user owns the movie
    if (movie.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Watchlist.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Movie successfully removed from your watchlist' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
