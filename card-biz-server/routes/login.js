const express = require("express");
const router = express.Router();
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const loginSchema = joi.object({
  email: joi.string().required().email().min(6),
  password: joi.string().required().min(8),
});

router.post("/", async (req, res) => {
  try {
    //joi check
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send("wrong body");
    //user email exists
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("wrong email or password");
    //compare user password input to DB encrypted password
    let checkPass = await bcrypt.compare(req.body.password, user.password);
    if (!checkPass) return res.status(400).send("wrong email or password");
    //get a token
    const token = jwt.sign(
      { _id: user._id, biz: user.biz },
      process.env.SECRETKEY
    );
    //send res + token
    res.status(200).send(token);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
