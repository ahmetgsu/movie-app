const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    // First parameter is the item to check, second is an err message
    check('name', 'Name is required')
      .not() //name field must not be empty
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      // 1st check if there is a user with that email
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exist' });
      }
      // Email not registered before, then create a new User
      user = new User({
        name,
        email,
        password
      });
      // Before saving to db, we need to crypte the password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      // We can save now hash version of password to db
      await user.save();
      res.send('User saved');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
