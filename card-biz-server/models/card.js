const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  userId: {
    type: String,
  },
  cardId: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
  },
  image: {
    type: String,
    required: true,
  },
});

const Card = mongoose.model("cards", cardSchema);
module.exports = Card;
