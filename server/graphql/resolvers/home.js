const axios = require("../../axiosInstance");
const moment = require("../../../utils/moment");

module.exports = {
  homeMovies: async () => {
    const params = {
      "release_date.lte": moment.getCurrentDate(),
      "release_date.gte": moment.getMonthsAgo(1),
      sort_by: "popularity.desc"
    };

    const res = await axios.get("/discover/movie", { params });

    return res.data;
  },

  homeSeries: async () => {
    const params = {
      "first_air_date.lte": moment.getCurrentDate(),
      "first_air_date.gte": moment.getMonthsAgo(1),
      sort_by: "popularity.desc"
    };

    const res = await axios.get("/discover/tv", { params });

    return res.data;
  }
};
