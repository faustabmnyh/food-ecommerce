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
        isSeller: user.isSeller,
        photo_profile: user.photo_profile,
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
      isSeller: user.isSeller,
      photo_profile: user.photo_profile,
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

const updateUserProfile = expressAsyncHandler(async (req, res) => {
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
          user.username = req.body.username;
        } else {
          res
            .status(401)
            .send({ message: { username: "This username already exist" } });
          return;
        }
      } else {
        user.username = req.body.username;
      }
      if (email) {
        if (email.email === user.email) {
          user.email = req.body.email;
        } else {
          res
            .status(401)
            .send({ message: { email: "This email already exist" } });
          return;
        }
      } else {
        user.email = req.body.email;
      }
    }
    if (user.isSeller) {
      user.seller.name = req.body.sellerName;
      user.seller.logo = req.body.sellerLogo;
      user.seller.description = req.body.description;
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
    user.photo_profile = req.body.image;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isSeller: user.isSeller,
      photo_profile: user.photo_profile,
      token: generateToken(updatedUser),
    });
  }
});

const getAllUser = expressAsyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const pageSize = 10;
  const count = await User.countDocuments({});
  const users = await User.find({})
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  res.send({ users, page, pages: Math.ceil(count / pageSize) });
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400).send({ message: "Can Not Delete Admin User" });
      return;
    }
    const deletedUser = await user.remove();
    res.send({ message: "User Deleted", user: deletedUser });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

const updateUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
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
          user.username = req.body.username;
        } else {
          res
            .status(401)
            .send({ message: { username: "This username already exist" } });
          return;
        }
      } else {
        user.username = req.body.username;
      }
      if (email) {
        if (email.email === user.email) {
          user.email = req.body.email;
        } else {
          res
            .status(401)
            .send({ message: { email: "This email already exist" } });
          return;
        }
      } else {
        user.email = req.body.email;
      }
    }
    user.isSeller = req.body.isSeller;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();
    res.send({ message: "User Updated", user: updatedUser });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

module.exports = {
  userRegister,
  userSignin,
  getUser,
  updateUserProfile,
  updateUser,
  getAllUser,
  deleteUser,
};
