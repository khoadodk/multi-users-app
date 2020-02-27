const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.read = async (req, res) => {
  req.profile.hashed_password = undefined;
  return res.json({ user: req.profile });
};
