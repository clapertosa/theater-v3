const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const keys = require("../config/keys");

module.exports = {
  generateAccessToken: payload => {
    return new Promise((resolve, reject) =>
      jwt.sign(payload, keys.JWT_SECRET, { expiresIn: "15m" }, (err, token) => {
        if (!err) return resolve(token);
        else return reject(err);
      })
    );
  },
  generateRefreshToken: () => {
    return new Promise((resolve, reject) =>
      crypto.randomBytes(64, (err, refreshToken) => {
        if (!err) return resolve(refreshToken.toString("hex"));
        else return reject(err);
      })
    );
  },
  generateActivationToken: email => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { email },
        keys.JWT_SECRET,
        { expiresIn: "24h" },
        (err, token) => {
          if (!err) {
            return resolve(token);
          } else {
            return reject(err);
          }
        }
      );
    });
  },
  verifyJWTToken: token => {
    return new Promise((resolve, reject) =>
      jwt.verify(token, keys.JWT_SECRET, (err, decoded) => {
        if (!err) {
          return resolve(decoded);
        } else {
          return reject(err);
        }
      })
    );
  },
  decodeJWTToken: token => {
    return jwt.decode(token);
  },
  refreshTokenExpiryTime: () => {
    const daysUntilExpire = 10;
    const secondsUntilExpire = daysUntilExpire * 24 * 60 * 60 * 1000;
    return new Date(Date.now() + secondsUntilExpire);
  },
  hasRefreshTokenExpired: expiresAt => {
    const timestamp = Date.now();
    if (expiresAt > timestamp) {
      return false;
    } else return true;
  }
};
