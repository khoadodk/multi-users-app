const slugify = require('slugify');
const AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

const Category = require('../models/Category');
const Link = require('../models/Link');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

exports.create = async (req, res) => {
  try {
    const { name, content, image } = req.body;
    const slug = slugify(name);
    // get the image and image type
    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );
    const type = image.split(';')[0].split('/')[1];

    const checkSlug = await Category.findOne({ slug });
    if (checkSlug) {
      return res
        .status(422)
        .json({ error: `The ${name} category already exists` });
    }

    let category = await new Category({ name, content, slug });

    const params = {
      Bucket: 'multi-user-app',
      Key: `category/${uuidv4()}.${type}`,
      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${type}`
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        res.status(422).json({ error: 'Upload to s3 failed' });
      }
      console.log('AWS UPLOAD RES DATA', data);

      category.image.url = data.Location;
      category.image.key = data.Key;
      category.postedBy = req.user._id;

      // save to db
      category.save();
      res.status(200).json({ message: `Category ${name} is created` });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error! Please try again later.' });
  }
};

exports.listAll = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error! Please try again later.' });
  }
};
exports.read = async (req, res) => {
  try {
    const { slug } = req.params;
    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    const category = await Category.findOne({ slug }).populate(
      'postedBy',
      '_id name username'
    );
    if (!category) {
      res.status(422).json({ error: 'The category does not exist' });
    }
    const links = await Link.find({ categories: category })
      .populate('postedBy', '_id name usename')
      .populate('categories', 'name')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    if (!links) {
      res
        .status(422)
        .json({ error: 'Can not load your request! Please try again later' });
    }
    res.status(200).json({ category, links });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error! Please try again later.' });
  }
};
exports.update = async (req, res) => {};
exports.remove = async (req, res) => {};
