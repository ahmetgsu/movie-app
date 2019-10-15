const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', (req, res) => {
  res.send('Get logged in user');
  // in order to get the id from token, we need to write some middleware
});

// @route   POST api/auth
// @desc    Suth user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } // these codes below async (req,res) is the part of express-validator
    // take email and password from req.body
    const { email, password } = req.body;

    try {
      // check if the user exist with related email
      let user = await User.findOne({ email });
      // 1) user does not exist
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      // 2) user exist (email checked above), check the password
      // .compare() takes 2 arg: plein text password and hash password stored in the db
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      // password matches with hash password stored in db
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
