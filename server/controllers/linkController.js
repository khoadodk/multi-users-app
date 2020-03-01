const AWS = require('aws-sdk');

const Link = require('../models/Link');
const User = require('../models/User');
const Category = require('../models/Category');

exports.popularInACategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    if (!category) {
      res.status(422).json({ error: 'We could not load the category!' });
    }
    const links = await Link.find({ categories: category })
      .sort({ clicks: -1 })
      .limit(3);
    if (!links) {
      res.status(422).json({ error: 'There is no link!' });
    }

    res.status(200).json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error! Please try again later.' });
  }
};

exports.clickCount = async (req, res) => {
  try {
    const { _id } = req.body;
    const updatedClick = await Link.findByIdAndUpdate(
      { _id },
      { $inc: { clicks: 1 } },
      { new: true }
    );
    res.status(200).json(updatedClick);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error! Please try again later.' });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, url, categories, type, medium } = req.body;
    const slug = url;
    let link = await Link.findOne({ slug });
    if (link) {
      res.status(422).json({ error: 'The link already exist' });
    }

    let newLink = await new Link({
      title,
      url,
      categories,
      type,
      medium,
      slug,
      postedBy: req.user._id
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
