const bcrypt = require("bcrypt");

const User = require("../models/User");
const Link = require("../models/Link");

exports.read = async (req, res) => {
  try {
    // user the same route as public profile and private profile
    let _id;
    if (req.user) {
      _id = req.user._id;
    } else {
      _id = req.params.id;
    }

    let user = await User.findOne({ _id }).select("-hashed_password");
    if (!user) {
      return res.status(404).json({ error: "User is not found!" });
    }
    const links = await Link.find({ postedBy: user })
      .populate("categories", "name slug")
      .populate("postedBy", "name username _id createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    // console.log(links);

    return res.status(200).json({ user, links });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error! Please try again later." });
  }
};

exports.update = async (req, res) => {
  try {
    const { username, name, password, categories } = req.body;
    if (password) {
      const hashed_password = bcrypt.hashSync(password, 10);
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        { username, name, hashed_password, categories },
        { new: true }
      ).select("_id name username email role");
      res.status(200).json(updatedUser);
    } else {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        { username, name, categories },
        { new: true }
      ).select("_id name username email role");
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error! Please try again later." });
  }
};
