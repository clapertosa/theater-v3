const axios = require("../../axiosInstance");

module.exports = {
  discoverMovies: async ({
    input: {
      page = 1,
      release_year = (new Date().getFullYear() - 1).toString(),
      sort_by = "popularity.desc",
      with_genres,
      with_cast
    }
  }) => {
    const params = {
      page,
      primary_release_year: release_year,
      sort_by,
      with_genres,
      with_cast
    };

    const res = await axios.get("/discover/movie", { params });

    res.data.total_pages =
      res.data.total_pages > 1000 ? 1000 : res.data.total_pages;

    return res.data;
  },
  discoverSeries: async ({
    input: {
      page = 1,
      release_year = (new Date().getFullYear() - 1).toString(),
      sort_by = "popularity.desc",
      with_genres,
      without_genres
    }
  }) => {
    const params = {
      page,
      first_air_date_year: release_year,
      sort_by,
      with_genres,
      without_genres
    };

    const res = await axios.get("/discover/tv", { params });

    res.data.total_pages =
      res.data.total_pages > 1000 ? 1000 : res.data.total_pages;

    return res.data;
  }
};
