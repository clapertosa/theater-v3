const knex = require("../../config/db");
const axios = require("../../axiosInstance");
const keys = require("../../config/keys");
const cookie = require("cookie");
const crypto = require("crypto");
const {
  checkUsername,
  checkEmails,
  checkPasswords
} = require("../../utils/inputValidator");
const { normalizeEmail } = require("validator");
const {
  generateActivationToken,
  generateRecoverEmailToken,
  verifyJWTToken
} = require("../../utils/token");
const mail = require("../../utils/mail.js");
const bcrypt = require("bcryptjs");

module.exports = {
  // Favorites db mutations
  addToFavorites: async (
    { media_id, media_type, title, poster_path },
    { req }
  ) => {
    if (!req.user) {
      throw new Error("You must be signed in to add a media to favorites");
    }

    if (media_type !== "movie" && media_type !== "series") {
      throw new Error("Invalid media type");
    }

    // Check if the media exists
    let media, mediaTitle;
    try {
      media =
        media_type === "movie"
          ? await axios.get(`/movie/${media_id}`)
          : await axios.get(`/tv/${media_id}`);
      media = media.data;
      mediaTitle =
        media.title ||
        media.original_title ||
        media.name ||
        media.original_name;
    } catch (e) {
      throw new Error("Media not found");
    }

    // If exists, check if media_id and title are the same
    if (parseInt(media_id) !== media.id) {
      throw new Error("The media ID must be the same as the TMDB one");
    } else if (title !== mediaTitle) {
      throw new Error("The media title must be the same as the TMDB one");
    }

    // Prevent user to add the same media two times
    const mediaAlreadyExists = await knex("favorites")
      .where({ user_id: req.user.id, media_id })
      .first();
    if (mediaAlreadyExists) {
      throw new Error("Media already saved to your favorites");
    }

    // Save media in "favorites" table
    try {
      await knex("favorites").insert({
        user_id: req.user.id,
        media_id,
        media_type,
        title,
        poster_path
      });
      return true;
    } catch (e) {
      return false;
    }
  },
  getFavoritesMovies: async (args, { req }) => {
    if (!req.user) {
      throw new Error("You must be signed in to get favorites");
    }

    const res = await knex("favorites").where({
      user_id: req.user.id,
      media_type: "movie"
    });
    return res;
  },
  getFavoritesSeries: async (args, { req }) => {
    if (!req.user) {
      throw new Error("You must be signed in to get favorites");
    }

    const res = await knex("favorites").where({
      user_id: req.user.id,
      media_type: "series"
    });
    return res;
  },
  removeFromFavorites: async ({ media_id }, { req }) => {
    if (!req.user) {
      throw new Error("You must be signed in to remove a media from favorites");
    }

    await knex("favorites")
      .where({ user_id: req.user.id, media_id })
      .del();

    return true;
  },
  isFavorite: async ({ media_id }, { req }) => {
    if (!req.user) {
      return false;
    }

    const isFavorite = await knex("favorites")
      .where({ user_id: req.user.id, media_id })
      .first();

    return isFavorite ? true : false;
  },

  //User settings mutations
  changeAvatar: async ({ file }, { req }) => {
    if (!req.user) {
      throw new Error("You must be signed in to change your avatar");
    }

    const { mimetype, createReadStream } = await file;

    const timestamp = Date.now();
    let signature = `timestamp=${timestamp}&upload_preset=theater${
      keys.CLOUDINARY_SECRET_KEY
    }`;
    signature = crypto
      .createHash("sha1")
      .update(signature)
      .digest("hex");

    const { toDataUri } = require("../../utils/streamToDataURI");
    const dataURI = await toDataUri(mimetype, createReadStream());

    let res;
    try {
      res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          keys.CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file: dataURI,
            api_key: keys.CLOUDINARY_API_KEY,
            timestamp,
            signature,
            upload_preset: "theater"
          })
        }
      );
    } catch (e) {
      throw new Error("An error occurred");
    }

    if (!res.ok) {
      throw new Error("Image not valid");
    }

    //Upload complete and avatar url path retrieved
    const { secure_url: avatarPath } = await res.json();

    // Set avatar
    await knex("users")
      .where({ id: req.user.id })
      .update({ avatar: avatarPath });

    return true;
  },
  changeUsername: async ({ username }, { req, res }) => {
    if (!req.user) {
      throw new Error("You must be signed in to change your username");
    }

    // Username checks
    checkUsername(username);

    // Check if refresh-token in DB is the same in cookies
    const refreshToken = cookie.parse(req.headers.cookie)["x-refresh-token"];
    const userDB = await knex("users")
      .where({ id: req.user.id })
      .first();

    // If cookie's refresh-token !== user.refresh_token, then user could have been compromised
    if (refreshToken !== userDB.refresh_token) {
      res.clearCookie("x-access-token");
      res.clearCookie("x-refresh-token");
      throw new Error("Session not valid, you've been disconnected");
    }

    // Check if username already exists
    const userExists = await knex("users")
      .where({ username })
      .first();

    if (userExists) {
      throw new Error("Username already in use");
    }

    // Update username
    await knex("users")
      .where({ id: req.user.id })
      .update({ username });

    return true;
  },
  changeEmail: async ({ email, confirmEmail }, { req, res }) => {
    if (!req.user) {
      throw new Error("You must be signed in to change your email");
    }

    // Email checks
    checkEmails(email, confirmEmail);

    // Check if refresh-token in DB is the same in cookies
    const refreshToken = cookie.parse(req.headers.cookie)["x-refresh-token"];
    const userDB = await knex("users")
      .where({ id: req.user.id })
      .first();

    // If cookie's refresh-token !== user.refresh_token, then user could have been compromised
    if (refreshToken !== userDB.refresh_token) {
      res.clearCookie("x-access-token");
      res.clearCookie("x-refresh-token");
      throw new Error("Session not valid, you've been disconnected");
    }

    // Check if user with this new email already exists
    const user = await knex("users")
      .where({
        email: normalizeEmail(email)
      })
      .first();

    if (user) {
      throw new Error(
        "Email already in use: if you don't remember your password, please reset it in the login page"
      );
    }
    // Send an email to the old email with a token which expires after 7 days to recover the previous one
    //Generate token
    const recoveryToken = await generateRecoverEmailToken(
      req.user.id,
      req.user.email,
      normalizeEmail(email)
    );
    await mail.send(
      normalizeEmail(req.user.email),
      "🎬 Theater - Your email has been changed",
      "If you haven't changed the email, please click on the button to recover this one and change your password as soon as possible, because your account could have been compromised.",
      "user/recover-email",
      recoveryToken,
      req
    );

    // Update email
    await knex("users")
      .where({ id: req.user.id })
      .update({ email: normalizeEmail(email), activated: false });

    // Send an activation email with the activation token
    const activationToken = await generateActivationToken(
      normalizeEmail(email)
    );
    await mail.send(
      normalizeEmail(email),
      "🎬 Theater - Activate new Email",
      'Click on the "Activate" button to confirm your new email.',
      "user/account-activation",
      activationToken,
      req
    );

    // Delete previous cookies
    res.clearCookie("x-access-token");
    res.clearCookie("x-refresh-token");

    return true;
  },
  recoverEmail: async ({ token }) => {
    let decodedToken;

    try {
      decodedToken = await verifyJWTToken(token);
    } catch (e) {
      throw new Error("Invalid or expired token");
    }

    // Set the old email
    await knex("users")
      .where({ id: decodedToken.userId, email: decodedToken.newEmail })
      .update({
        email: decodedToken.oldEmail,
        activated: true,
        refresh_token: null
      });

    return "Old email recovered";
  },
  changePassword: async (
    { oldPassword, password, confirmPassword },
    { req, res }
  ) => {
    if (!req.user) {
      throw new Error("You must be signed in to change your password");
    }

    // Check if the oldPassword match the current one
    const user = await knex("users")
      .where({ id: req.user.id })
      .first();
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      throw new Error("The old password is wrong");
    }

    // Check the new password
    checkPasswords(password, confirmPassword);

    // Check if refresh-token in DB is the same in cookies
    const refreshToken = cookie.parse(req.headers.cookie)["x-refresh-token"];
    const userDB = await knex("users")
      .where({ id: req.user.id })
      .first();

    // If cookie's refresh-token !== user.refresh_token, then user could have been compromised
    if (refreshToken !== userDB.refresh_token) {
      res.clearCookie("x-access-token");
      res.clearCookie("x-refresh-token");
      throw new Error("Session not valid, you've been disconnected");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    await knex("users")
      .where({ id: req.user.id })
      .update({ password: hashedPassword });

    return true;
  }
};
