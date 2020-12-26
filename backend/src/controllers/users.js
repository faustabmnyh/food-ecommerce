const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../utils/check-auth");
const { generateToken } = require("../utils/token");

const userSignin = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const { valid, messages } = validateLoginInput(
    req.body.email,
    req.body.password
  );
  if (!valid) {
    res.status(401).send({ message: messages });
    return;
  }
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    } else {
      res.status(401).send({ message: { password: "Invalid password" } });
      return;
    }
  }
  res.status(401).send({ message: { email: "Invalid email" } });
});

const userRegister = expressAsyncHandler(async (req, res) => {
  const username = await User.findOne({ username: req.body.username });
  const email = await User.findOne({ email: req.body.email });
  const { valid, messages } = validateRegisterInput(
    req.body.username,
    req.body.email,
    req.body.password,
    req.body.confirmPassword
  );

  if (username) {
    res
      .status(401)
      .send({ message: { username: "This username already exist" } });
    return;
  } else if (email) {
    res.status(401).send({ message: { email: "This email already exist" } });
    return;
  }

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  if (!valid) {
    res.status(401).send({ message: messages });
    return;
  } else {
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      username: createdUser.username,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(user),
    });
  }
});

module.exports = {
  userRegister,
  userSignin,
};
