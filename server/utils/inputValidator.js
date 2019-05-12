const { isEmpty, isLength, isEmail } = require("validator");

module.exports = {
  checkUsername: username => {
    if (isEmpty(username, { ignore_whitespace: true })) {
      throw new Error("Username is required");
    } else if (!isLength(username, { min: 4, max: 16 })) {
      throw new Error("Username must be between 4 and 16 characters");
    } else if (username !== username.toLowerCase()) {
      throw new Error("Username must be lowercase");
    }
  },
  checkEmails: (email, confirmEmail) => {
    if (isEmpty(email, { ignore_whitespace: true })) {
      throw new Error("Email is required");
    } else if (!isEmail(email)) {
      throw new Error("Email not valid");
    } else if (email !== confirmEmail) {
      throw new Error("Email and confirm email must be equal");
    }
  },
  checkEmail: email => {
    if (isEmpty(email, { ignore_whitespace: true })) {
      throw new Error("Email is required");
    } else if (!isEmail(email)) {
      throw new Error("Email not valid");
    }
  },
  checkPasswords: (password, confirmPassword) => {
    if (isEmpty(password, { ignore_whitespace: true })) {
      throw new Error("Password is required");
    } else if (!isLength(password, { min: 8, max: 16 })) {
      throw new Error("Password must be between 8 and 16 characters");
    } else if (password !== confirmPassword) {
      throw new Error("Password and confirm password must be equal");
    }
  },
  checkPassword: password => {
    if (isEmpty(password, { ignore_whitespace: true })) {
      throw new Error("Password is required");
    } else if (!isLength(password, { min: 8, max: 16 })) {
      throw new Error("Password must be between 8 and 16 characters");
    }
  }
};
