const express = require("express");
const router = express.Router();
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const registerSchema = joi.object({
  name: joi.string().required().min(2),
  email: joi.string().required().email().min(6),
  password: joi.string().required().min(8),
  biz: joi.boolean().required(),
});

router.post("/", async (req, res) => {
  try {
    // joi check
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send("wrong body");
    // check for same email
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("a user with this email already exists");
    //enter req.body detailes to let user + model check
    user = new User(req.body);
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    //save the user with an encrypted password as a document
    await user.save();
    //give a token
    const token = jwt.sign(
      { _id: user._id, biz: user.biz },
      process.env.SECRETKEY
    );
    //send result with token
    res.status(201).send(token);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
