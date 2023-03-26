const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.header("Authorization");

    if (!token) return res.status(401).send("access denied no valid token");

    let payload = jwt.verify(token, process.env.SECRETKEY);

    req.payload = payload;

    next();
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = auth;
