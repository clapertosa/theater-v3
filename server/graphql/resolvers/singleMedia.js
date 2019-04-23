const axios = require("../../axiosInstance");

module.exports = {
  movie: async ({ id }) => {
    const params = {
      append_to_response:
        "images,videos,credits,similar,recommendations,external_ids"
    };

    const res = await axios.get(`/movie/${id}`, { params });
    return res.data;
  },

  series: async ({ id }) => {
    const params = {
      append_to_response:
        "images,videos,credits,similar,recommendations,external_ids"
    };

    const res = await axios.get(`/tv/${id}`, { params });
    return res.data;
  }
};
