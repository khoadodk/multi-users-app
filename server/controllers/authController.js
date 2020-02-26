const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortId = require('shortid');
const AWS = require('aws-sdk');

const { registerEmailParams } = require('../helpers/email');
const User = require('../models/User');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(422)
        .json({ error: `User with ${email} already exists` });
    } else {
      const token = jwt.sign(
        { name, email, password },
        process.env.JWT_ACCOUNT_ACTIVATION,
        {
          expiresIn: '45m'
        }
      );
      //   set up email and send out using AWS SES
      const params = registerEmailParams(email, token);
      const sendEmailOnRegister = await ses.sendEmail(params).promise();
      if (sendEmailOnRegister) {
        res.status(200).json({
          message: `An email has been sent to ${email}. Follow the instructions to complete your registration!`
        });
      } else {
        res.status(422).json({
          message: `We could not verify your email. Please try again!`
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Email address is not verified' });
  }
};

exports.login = async (req, res) => {};
