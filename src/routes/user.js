const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../helpers/auth");
require("dotenv").config();

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

router.get("/:email/:password", async (req, res) => {
  const email = req.params.email;
  const pass = req.params.password;

  try {
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Wrong credentials ! Input correct email and password",
      });
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "Password incorrect !",
      });

    const payload = {
      user: {
        id: user.id,
      },
    };
    const t = jwt.sign(payload, process.env.REACT_APP_JWT_SECRET, {
      expiresIn: process.env.REACT_APP_EXPIRES_IN,
    });

    res.status(200).json({
      message: "User logged in !",
      doc: { user: user, token: t },
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  const { name, email, phno, password } = req.body;

  let u = await User.findOne({
    phno,
  });

  if (u) {
    return res.status(400).json({
      msg: "User already exists, use a different phone number!",
    });
  }

  const user = new User({
    name: name,
    email: email,
    password: password,
    phno: phno,
    createdAt: Date.now(),
  });

  const salt = await bcrypt.genSalt(8);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const d = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(
    d,
    process.env.REACT_APP_JWT_SECRET,
    { expiresIn: process.env.REACT_APP_EXPIRES_IN },
    (err, token) => {
      if (err) throw err;

      res.status(200).json({
        token,
      });
    }
  );
});

module.exports = router;
