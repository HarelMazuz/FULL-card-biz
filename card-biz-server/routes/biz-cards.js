const express = require("express");
const router = express.Router();
const Card = require("../models/card");
const _ = require("lodash");
const joi = require("joi");
const auth = require("../middlewares/auth");

const cardSchema = joi.object({
  name: joi.string().required().min(2),
  description: joi.string().required().min(2),
  address: joi.string().required().min(2),
  phone: joi.string().required().min(9).max(10),
  image: joi.string().required().min(2),
});

router.post("/", auth, async (req, res) => {
  try {
    //joi check
    let { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send("wrong body");
    //check token
    if (!req.payload) return res.status(401).send("invalid token");
    //check if user biz: true
    if (!req.payload.biz)
      return res.status(400).send("only bussiness account can create a card");
    //add user _id and random card id to the new card
    let card = new Card(req.body);
    let flag = true;
    let randNum = _.random(1, 10000);
    while (flag) {
      let cardId = await Card.findOne({ cardId: randNum });
      if (!cardId) {
        flag = false;
        break;
      }
      randNum = _.random(1, 10000);
    }
    card.userId = req.payload._id;
    card.cardId = randNum;
    //save card
    await card.save();
    //send card to user
    res.status(201).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:cardid", auth, async (req, res) => {
  try {
    //joi check
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send("wrong body");
    //check if biz user
    const isBiz = req.payload.biz;
    if (!isBiz) return res.status(400).send("you are not a bussiness user");
    //check if card exists and update
    let card = await Card.findOneAndUpdate(
      { userId: req.payload._id, cardId: req.params.cardid },
      req.body,
      { new: true }
    );
    if (!card) return res.status(404).send("there is no such a card");
    //save new card
    await card.save();
    //return card
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:cardid", auth, async (req, res) => {
  try {
    //check if biz
    const isBiz = req.payload.biz;
    if (!isBiz)
      return res.status(400).send("only bussiness users can delete cards");
    //check if the card belongs to user and delete
    let card = await Card.findOneAndDelete({
      userId: req.payload._id,
      cardId: req.params.cardid,
    });
    if (!card)
      return res
        .status(404)
        .send("there is no such a card exists for this user");
    //return result
    res.status(200).send("card deleted successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    //check if user biz
    const isBiz = req.payload.biz;
    if (!isBiz)
      return res
        .status(400)
        .send("only bussiness users can see their own cards");
    //take all cards belongs to this user from db
    let cards = await Card.find({ userId: req.payload._id });
    if (!cards) return res.status(404).send("this user has no cards");
    //return cards array
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
