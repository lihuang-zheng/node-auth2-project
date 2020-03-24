const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../users/users-model");

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const payload = {
          sub: user.id,
          username: user.username,
          roles: ["student"]
        };

        const options = {
          expiresIn: "2 days"
        };

        const token = jwt.sign(
          payload,
          process.env.JWT_SECRET || "secret",
          options
        );

        res.json({
          message: "Keep your token ;) ",
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
