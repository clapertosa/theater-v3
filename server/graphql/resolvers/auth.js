const knex = require("../../config/db");
const bcrypt = require("bcryptjs");
const mail = require("../../utils/mail.js");
const {
  generateAccessToken,
  generateRefreshToken,
  generateActivationToken,
  refreshTokenExpiryTime,
  verifyJWTToken,
  decodeJWTToken
} = require("../../utils/token");
const { userExists } = require("../../utils/database");
const { isEmpty, isEmail, isLength, normalizeEmail } = require("validator");

module.exports = {
  signUp: async (
    { input: { username, email, confirmEmail, password, confirmPassword } },
    { req }
  ) => {
    // Check if user email or username is already in use
    await userExists(username, email);

    // Check Username
    if (isEmpty(username, { ignore_whitespace: true })) {
      throw new Error("Username is required");
    } else if (!isLength(username, { min: 4, max: 16 })) {
      throw new Error("Username must be between 4 and 16 characters");
    } else if (username !== username.toLowerCase()) {
      throw new Error("Username must be lowercase");
    }

    // Check Email
    if (isEmpty(email, { ignore_whitespace: true })) {
      throw new Error("Email is required");
    } else if (!isEmail(email)) {
      throw new Error("Email not valid");
    } else if (email !== confirmEmail) {
      throw new Error("Email and confirm email must be equal");
    }

    // Check Password
    if (isEmpty(password, { ignore_whitespace: true })) {
      throw new Error("Password is required");
    } else if (!isLength(password, { min: 8, max: 16 })) {
      throw new Error("Password must be between 8 and 16 characters");
    } else if (password !== confirmPassword) {
      throw new Error("Password and confirm password must be equal");
    }

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
  currentUser: async (args, { req, res }) => {
    return req.user;
  }
};
