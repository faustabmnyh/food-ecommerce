const jwt = require("jsonwebtoken");

module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const messages = {};
  if (username.trim() === "") {
    messages.username = "Username must not be empty";
  }
  if (email.trim() === "") {
    messages.email = "Email must not be empty";
  } else {
    const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(emailRegex)) {
      messages.email = "Email is must be valid email address";
    }
  }
  if (password.trim() === "") {
    messages.password = "Password must not be empty";
  }
  if (password.length < 6) {
    messages.password = "Password minimum 6 characters";
  }
  if (password !== confirmPassword) {
    messages.confirmPassword = "Password must match";
  }

  return {
    messages,
    valid: Object.keys(messages).length < 1,
  };
};

module.exports.validateLoginInput = (email, password) => {
  const messages = {};
  if (email.trim() === "") {
    messages.email = "Email must not be empty";
  }
  if (password.trim() === "") {
    messages.password = "Password must not be empty";
  }
  return {
    messages,
    valid: Object.keys(messages).length < 1,
  };
};

module.exports.validateUserUpdate = (username, email) => {
  const messages = {};
  if (username.trim() === "") {
    messages.username = "Username must not be empty";
  }
  if (email.trim() === "") {
    messages.email = "Email must not be empty";
  } else {
    const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(emailRegex)) {
      messages.email = "Email is must be valid email address";
    }
  }

  return {
    messages,
    valid: Object.keys(messages).length < 1,
  };
};

module.exports.validateUserUpdatePassword = (password, confirmPassword) => {
  const messages = {};
  if (password.trim() === "") {
    messages.password = "Password must not using whitespace";
  }
  if (password.length < 6) {
    messages.password = "Password minimum 6 characters";
  }
  if (password !== confirmPassword) {
    messages.confirmPassword = "Password must match";
  }
  return {
    messages,
    valid: Object.keys(messages).length < 1,
  };
};

module.exports.isAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.slice(7, auth.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET || "secretbosasasdasd",
      (err, decode) => {
        if (err) {
          console.log("this is error", err);
          res.status(401).send({ message: "Invalid Token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};
