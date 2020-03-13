const AWS = require("aws-sdk");

const Link = require("../models/Link");
const User = require("../models/User");
const Category = require("../models/Category");
const { linkPublishedParams } = require("../helpers/email");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

exports.popular = async (req, res) => {
  try {
    const links = await Link.find()
      .populate("postedBy", "username name")
      .populate("categories", "name")
      .sort({ clicks: -1 })
      .limit(3);
    res.status(200).json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error! Please try again later." });
  }
};

exports.popularInACategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.findOne({ slug });
    if (!category) {
      res.status(422).json({ error: "We could not load the category!" });
    }
    const links = await Link.find({ categories: category })
      .sort({ clicks: -1 })
      .limit(3);
    if (!links) {
      res.status(422).json({ error: "There is no link!" });
    }

    res.status(200).json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error! Please try again later." });
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
    res.status(500).json({ error: "Server error! Please try again later." });
  }
};

exports.likeCount = async (req, res) => {
  try {
    const { _id } = req.body;
    const updatedClick = await Link.findByIdAndUpdate(
      { _id },
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.status(200).json(updatedClick);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error! Please try again later." });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, url, categories, type, medium } = req.body;
    const slug = url;
    let link = await Link.findOne({ slug });
    if (link) {
      res.status(422).json({ error: "The link already exist" });
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

    // Find user to send email when a new link gets posted
    //1. Find the user with subscribed category
    const users = await User.find({ categories: { $in: categories } });
    //2. Find data of the link's category
    const categoriesData = await Category.find({ _id: { $in: categories } });
    //3. Set the categories's data to the link
    newLink.categories = categoriesData;
    //4. Loop over the subscriber and send the email with the params
    for (let i = 0; i < users.length; i++) {
      const params = linkPublishedParams(users[i].email, newLink);
      await ses.sendEmail(params).promise();
    }

    res.status(200).json({ message: `${title} is created` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error! Please try again later." });
  }
};
exports.listAll = async (req, res) => {
  try {
    const links = await Link.find();
    res.status(200).json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error! Please try again later." });
  }
};

exports.read = async (req, res) => {
  try {
    const link = await Link.findOne({ _id: req.params.id });
    res.status(200).json(link);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error! Please try again later." });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, url, categories, type, medium } = req.body;
    const updatedLink = await Link.findOneAndUpdate(
      { _id: req.params.id },
      { title, url, categories, type, medium },
      { new: true }
    );
    if (!updatedLink) {
      res.status(422).json({ error: "Failed to update the link" });
    }
    updatedLink.save();
    res.status(200).json({ message: "Link is updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error! Please try again later." });
  }
};

exports.remove = async (req, res) => {
  try {
    await Link.findOneAndRemove({ _id: req.params.id });
    res.status(200).json({ message: "Link is deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error! Please try again later." });
  }
};

exports.list = async (req, res) => {
  try {
    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    const links = await Link.find()
      .populate("postedBy", "_id name username")
      .populate("categories", "name")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    if (!links) {
      res
        .status(422)
        .json({ error: "Can not load your request! Please try again later" });
    }
    res.status(200).json({ links });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error! Please try again later." });
  }
};
