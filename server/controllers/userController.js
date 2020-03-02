const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Link = require('../models/Link');

exports.read = async (req, res) => {
  req.profile.hashed_password = undefined;
  let user = await User.findOne({ _id: req.user._id }).select(
    '-hashed_password'
  );
  if (!user) {
    return res.status(404).json({ error: 'User is not found!' });
  }
  const links = await Link.find({ postedBy: user })
    .populate('categories', 'name slug')
    .populate('postedBy', 'name')
    .sort({ createdAt: -1 });

  return res.status(200).json({ user, links });
};
