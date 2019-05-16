const knex = require("../../config/db");
const bcrypt = require("bcryptjs");
const uuid = require("uuid/v4");
const mail = require("../../utils/mail.js");
const {
  generateAccessToken,
  generateRefreshToken,
  generateActivationToken,
  refreshTokenExpiryTime,
  verifyJWTToken,
  decodeJWTToken
} = require("../../utils/token");
const {
  checkUsername,
  checkEmails,
  checkPasswords
} = require("../../utils/inputValidator");
const { normalizeEmail } = require("validator");

module.exports = {
  signUp: async (
    { input: { username, email, confirmEmail, password, confirmPassword } },
    { req }
  ) => {
    // Check if user email or username is already in use
    const user = await knex("users")
      .first()
      .where({ email })
      .orWhere({ username });

    if (user && user.username === username) {
      throw new Error("Username already in use");
    } else if (user && user.email === email) {
      throw new Error("Email already in use");
    }

    // Input checks
    checkUsername(username);
    checkEmails(email, confirmEmail);
    checkPasswords(password, confirmPassword);

    // Hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await knex.transaction(async trx => {
      try {
        await knex("users")
          .insert({
            email: normalizeEmail(email),
            username,
            password: hashedPassword
          })
          .transacting(trx);
        return trx.commit("User added to DB");
      } catch (e) {
        return trx.rollback(e);
      }
    });

    // Send the account activation email
    const activationToken = await generateActivationToken(
      normalizeEmail(email)
    );
    await mail.send(
      normalizeEmail(email),
      "🎬 Theater - Account Activation",
      'Welcome to Theater! Click on the "Activate" button to activate your account.',
      "user/account-activation",
      activationToken,
      req
    );

    return "User successfully registered";
  },
  activateAccount: async ({ token }, { req }) => {
    let decodedToken;
    try {
      decodedToken = await verifyJWTToken(token);
    } catch (e) {
      if (e.message === "jwt expired") {
        decodedToken = decodeJWTToken(token);
        const activationToken = await generateActivationToken(
          decodedToken.email
        );
        await mail.send(
          decodedToken.email,
          "🎬 Theater - Account Activation",
          "Your previous token has expired (expires in 24h). Click on the Activate button to activate your account",
          "user/account-activation",
          activationToken,
          req
        );
        throw new Error(
          `Your previous token has expired, but a new email has been sent to ${
            decodedToken.email
          }`
        );
      } else {
        throw new Error("Token not valid");
      }
    }

    // Check if the user account has been already activated
    const user = await knex("users")
      .where({ email: decodedToken.email })
      .first()
      .select("activated");

    if (!user) {
      throw new Error("User not found");
    } else if (!user.activated) {
      // Activate user account
      await knex("users")
        .where({ email: decodedToken.email })
        .update({ activated: true });
      return "Account activated";
    } else {
      throw new Error("Account already activated");
    }
  },
  signIn: async ({ email, password }, { req, res }) => {
    // Check if user exists
    const user = await knex("users")
      .first()
      .where({ email });
    if (!user) {
      throw new Error("Email or password wrong");
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email or password wrong");
    }

    // If user is not activated, throw an error
    if (!user.activated) {
      throw new Error(
        "Account not activate yet, check your inbox to activate it."
      );
    }

    // Create JWT
    const accessToken = await generateAccessToken({
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar
    });

    // Create Refresh Token
    const refreshToken = await generateRefreshToken();
    const refreshTokenExpiration = refreshTokenExpiryTime();

    // Save Refresh Token to DB
    await knex("users")
      .where({ id: user.id })
      .update({
        refresh_token: refreshToken,
        refresh_token_expiration: refreshTokenExpiration
      });

    res.cookie("x-access-token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    });

    res.cookie("x-refresh-token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    });

    return "Successfully logged in";
  },
  signOut: async (args, { req, res }) => {
    if (req.user) {
      res.clearCookie("x-access-token");
      res.clearCookie("x-refresh-token");
      return true;
    }
    return false;
  },
  currentUser: async (args, { req }) => {
    if (!req.user) {
      return;
    }

    const user = await knex("users")
      .where({ id: req.user.id })
      .select("id", "username", "email", "avatar")
      .first();

    return user;
  },
  newPassword: async ({ email }, { req }) => {
    const user = await knex("users")
      .where({ email: normalizeEmail(email) })
      .first();

    if (!user) return false;

    const token = uuid();
    const timestamp = new Date();
    await knex("users")
      .where({ email: normalizeEmail(email) })
      .update({
        reset_password_token: token,
        reset_password_token_expiration: timestamp
      });
    await mail.send(
      email,
      "🎬 Theater - Password Reset",
      "Please, click on the button to start the password reset procedure",
      "user/password-reset",
      token,
      req
    );

    return true;
  },
  resetPassword: async ({ token, password, confirmPassword }, { req }) => {
    const user = await knex("users")
      .where({ reset_password_token: token })
      .first();

    if (!user) throw new Error("Token not valid");

    // Password checks
    checkPasswords(password, confirmPassword);

    // Get the reset password token expiration time
    const date = new Date(user.reset_password_token_expiration);
    // Set date to +24h
    date.setHours(date.getHours() + 24);

    // Check if token has expired
    if (date < new Date()) {
      // Token is valid, but has expired. Let's update the DB and send a new email
      const newToken = uuid();
      await knex("users")
        .where({ reset_password_token: token })
        .update({
          reset_password_token: newToken,
          reset_password_token_expiration: new Date()
        });
      await mail.send(
        user.email,
        "🎬 Theater - New Reset Password",
        "Your previous token has expired (it expires after 24h). Click on the button to start the reset password procedure again.",
        "user/reset-password",
        newToken,
        req
      );
      return false;
    }

    // Token is still valid, encrypt and set the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    await knex("users")
      .where({ reset_password_token: token })
      .update({
        password: hashedPassword,
        reset_password_token: null,
        reset_password_token_expiration: null
      });
    return true;
  }
};
