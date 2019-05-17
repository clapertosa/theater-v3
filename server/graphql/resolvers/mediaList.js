const axios = require("../../axiosInstance");

module.exports = {
  popular: async ({ page, media_type }) => {
    const res = await axios.get(
      `/discover/${media_type === "movie" ? "movie" : "tv"}`,
      {
        params: { page, sort_by: "popularity.desc" }
      }
    );

    res.data.total_pages =
      res.data.total_pages > 1000 ? 1000 : res.data.total_pages;

    return res.data;
  },
  topRated: async ({ page, media_type }) => {
    const res = await axios.get(
      `/discover/${media_type === "movie" ? "movie" : "tv"}`,
      {
        params: { page, sort_by: "vote_average.desc", "vote_count.gte": 250 }
      }
    );

    res.data.total_pages =
      res.data.total_pages > 1000 ? 1000 : res.data.total_pages;

    return res.data;
  },
  upcomingMovies: async ({ page }) => {
    const res = await axios.get("/movie/upcoming", {
      params: {
        page,
        region: "US",
        language: "en-US"
      }
    });

    res.data.total_pages =
      res.data.total_pages > 1000 ? 1000 : res.data.total_pages;

    return res.data;
  },
  nowPlayingMovies: async ({ page }) => {
    const res = await axios.get("/movie/now_playing", { params: { page } });

    res.data.total_pages =
      res.data.total_pages > 1000 ? 1000 : res.data.total_pages;

    return res.data;
  },
  onTv: async ({ page }) => {
    const res = await axios.get("/tv/on_the_air", { params: { page } });

    res.data.total_pages =
      res.data.total_pages > 1000 ? 1000 : res.data.total_pages;

    return res.data;
  },
  airingTodayOnTv: async ({ page }) => {
    const res = await axios.get("/tv/airing_today", { params: { page } });

    res.data.total_pages =
      res.data.total_pages > 1000 ? 1000 : res.data.total_pages;

    return res.data;
  }
};
