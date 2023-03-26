const express = require("express");
const router = express.Router();
const User = require("../models/user");
const _ = require("lodash");
const auth = require("../middlewares/auth");

router.get("/", auth, async (req, res) => {
  try {
    //check is authentication process completed and send a req.payload
    if (!req.payload) return res.status(401).send("invalid token");
    //check if theres is a user with the _id from the payload in the DB
    let user = await User.findOne({ _id: req.payload._id });
    if (!user) res.status(401).send("there is no such a user");
    //send user detailes except password
    res.status(200).send(_.pick(user, ["_id", "name", "email"]));
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
