const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const User = require('../models/User');
const Rate = require('../models/Rate');

// @route   GET api/movierate
// @desc    Get all movies rates of a specific user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const ratedMovies = await Rate.find({ user: req.user.id });
    console.log(ratedMovies);
    res.json(ratedMovies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server Error' });
  }
});

// @route   POST api/movierate
// @desc    Add movie rate
// @access  Private
router.post('/', auth, async (req, res) => {
  const { movieId, movieTitle, userRate } = req.body;
  try {
    const newRate = new Rate({
      movieId,
      userRate,
      movieTitle,
      user: req.user.id
    });
    //console.log(newRate);
    const movieRate = await newRate.save();
    //console.log(movieRate);
    res.json(movieRate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ msg: 'Server Error' });
  }
});

// @route   PUT api/movierate/:id
// @desc    Update movie rate
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { userRate } = req.body;

  const updateRate = {};
  if (userRate) updateRate.userRate = userRate;
  console.log(updateRate);

  try {
    let rate = await Rate.findById(req.params.id);
    console.log(rate);
    if (!rate) return res.status(404).json({ msg: 'Movie not found' });

    // Make sure user owns the movie
    if (rate.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    rate = await Rate.findByIdAndUpdate(
      req.params.id,
      { $set: updateRate },
      { new: true }
    );
    console.log(rate);
    res.json(rate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/movierate/:id
// @desc    Remove a movie rate
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let rate = await Rate.findById(req.params.id);
    console.log(rate);
    // console.log(req);
    if (!rate) return res.status(404).json({ msg: 'Movie not rated' });

    // Make sure user owns the movie
    if (rate.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Rate.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Movie rate successfully removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
