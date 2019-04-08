const axios = require("axios");
const keys = require("./config/keys.js");

module.exports = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: keys.TMDB_API_KEY }
});
