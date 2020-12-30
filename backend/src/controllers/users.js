const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  validateRegisterInput,
  validateLoginInput,
  validateUserUpdatePassword,
  validateUserUpdate,
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

const getUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

const updateUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const username = await User.findOne({ username: req.body.username });
  const email = await User.findOne({ email: req.body.email });
  if (user) {
    const { valid, messages } = validateUserUpdate(
      req.body.username,
      req.body.email
    );
    if (!valid) {
      res.status(401).send({ message: messages });
      return;
    } else {
      if (username) {
        if (username.username === user.username) {
          user.username = req.body.username || user.username;
        } else {
          res
            .status(401)
            .send({ message: { username: "This username already exist" } });
        }
      } else {
        user.username = req.body.username || user.username;
      }
      if (email) {
        if (email.email === user.email) {
          user.email = req.body.email || user.email;
        } else {
          res
            .status(401)
            .send({ message: { email: "This email already exist" } });
        }
      } else {
        user.email = req.body.email || user.email;
      }
    }
    if (req.body.password) {
      const { valid, messages } = validateUserUpdatePassword(
        req.body.password,
        req.body.confirmPassword
      );
      if (!valid) {
        res.status(401).send({ message: messages });
        return;
      } else {
        user.password = bcrypt.hashSync(req.body.password);
      }
    }
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser),
    });
  }
});

const getAllUser = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

module.exports = {
  userRegister,
  userSignin,
  getUser,
  updateUser,
  getAllUser,
};
