const express = require("express");
const router = express.Router();
const Card = require("../models/card");
const auth = require("../middlewares/auth");

router.get("/", auth, async (req, res) => {
  try {
    if (!req.payload) return res.status(400).send("pleas login");
    let cards = await Card.find();
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:cardid", auth, async (req, res) => {
  try {
    if (!req.payload) return res.status(401).send("invalid token");
    let card = await Card.findOne({ cardId: req.params.cardid });
    if (!card) return res.status(404).send("there is no such a card");
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
