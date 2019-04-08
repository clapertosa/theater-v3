const axios = require("../../axiosInstance");

module.exports = {
  search: async ({ query }) => {
    const res = await axios.get("/search/multi", { params: { query } });
    return res.data;
  }
};
