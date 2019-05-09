const knex = require("../../config/db");
const axios = require("../../axiosInstance");

module.exports = {
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
  getFavorites: async (args, { req }) => {
    if (!req.user) {
      throw new Error("You must be signed in to get favorites");
    }

    const res = await knex("favorites").where({ user_id: req.user.id });
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
  }
};
