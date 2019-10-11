const express = require('express');
const router = express.Router();

// @route   GET api/movierate
// @desc    Get all movies rates of a specific user
// @access  Private
router.get('/', (req, res) => {
  res.send('Get all movies rates of a specific user');
});

// @route   POST api/movierate
// @desc    Add movie rate
// @access  Private
router.post('/', (req, res) => {
  res.send('Add new movie rate');
});

// @route   PUT api/movierate/:id
// @desc    Update movie rate
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Update movie rate');
});

// @route   DELETE api/movierate/:id
// @desc    Remove a movie rate
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Remove movie rate');
});

module.exports = router;
