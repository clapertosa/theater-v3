const axios = require("../../axiosInstance");

module.exports = {
  person: async ({ id }) => {
    const res = await axios.get(`person/${id}`, {
      params: { append_to_response: "combined_credits,external_ids" }
    });

    return res.data;
  }
};
