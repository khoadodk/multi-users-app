const AWS = require('aws-sdk');

const Link = require('../models/Link');
const User = require('../models/User');
const Category = require('../models/Category');

exports.create = async (req, res) => {
  try {
    const { title, url, categories, type, medium } = req.body;
    const slug = url;
    const checkLink = await Link.findOne({ slug });
    if (checkLink) {
      res.status(422).json({ error: 'The link already exist' });
    }
    const { postedBy } = req.user._id;

    let newLink = await new Link({
      title,
      url,
      categories,
      type,
      medium,
      slug,
      postedBy
    }).save();

    res.status(200).json({ message: `${title} is created` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error! Please try again later.' });
  }
};
exports.listAll = async (req, res) => {
  try {
    const links = await Link.find();
    res.status(200).json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error! Please try again later.' });
  }
};
exports.read = async (req, res) => {};
exports.update = async (req, res) => {};
exports.remove = async (req, res) => {};
