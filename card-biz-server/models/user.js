const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  biz: {
    type: Boolean,
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
