const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 8000;
const cors = require("cors");
app.use(cors());

app.use(express.json());

//logger
function logger(req, res, next) {
  console.log(
    `Server Request: \x1b[33m ${req.method}\x1b[0m, URL: \x1b[36m${req.url}\x1b[0m`
  );
  next();
}
app.use(logger);

//routes
const register = require("./routes/register");
const login = require("./routes/login");
const profile = require("./routes/profile");
const cards = require("./routes/cards");
const bizCards = require("./routes/biz-cards");

//middlewares for routes
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/profile", profile);
app.use("/api/cards", cards);
app.use("/api/biz-cards", bizCards);

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("mongoDB Running"))
  .catch((err) => console.log(err));

app.listen(port, console.log(`server run on port:${port}`));
