const cookie = require("cookie");
const {
  generateAccessToken,
  hasRefreshTokenExpired,
  verifyJWTToken,
  decodeJWTToken
} = require("../utils/token");
const knex = require("../config/db");

module.exports = async (req, res, next) => {
  let user;
  req.user = null;
  let token, refreshToken, decodedToken, jwtError;

  if (req.headers.cookie) {
    token = cookie.parse(req.headers.cookie)["x-access-token"];
    refreshToken = cookie.parse(req.headers.cookie)["x-refresh-token"];
  } else {
    req.user = null;
    return next();
  }

  try {
    // Token is valid
    if (token) {
      decodedToken = await verifyJWTToken(token);
      req.user = decodedToken;
      return next();
    } else {
      // There is no access-token
      req.user = null;
      return next();
    }
  } catch (e) {
    // Token not valid
    jwtError = e.message;
  }

  // If token has been compromised
  if (jwtError !== "jwt expired") {
    // Delete both cookies
    res.clearCookie("x-access-token");
    res.clearCookie("x-refresh-token");
  }

  // Decode access token to take the user ID
  decodedToken = decodeJWTToken(token);
  if (!decodedToken) {
    req.user = null;
    return next();
  } else {
    // Get user by ID and refresh_token
    if (!refreshToken) {
      // No refresh token
      return next();
    }

    user = await knex("users")
      .first()
      .where({ id: decodedToken.id, refresh_token: refreshToken });

    if (!user || hasRefreshTokenExpired(user.refresh_token_expiration)) {
      // ID or refresh token not valid
      req.user = null;
      return next();
    } else {
      // Generate a new access token
      const newToken = await generateAccessToken({
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      });

      // Set access and refresh tokens in cookies
      res.cookie("x-access-token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
      });

      req.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      };

      return next();
    }
  }
};
