const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "hello world";

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          message: "I do not love that token, stranger"
        });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Emmm, you need a token" });
  }
};
