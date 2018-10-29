export {
  getLatestMovies,
  getTopRatedMovies,
  getMostVotedMovies
} from "./movies";

export {
  getOnTheAirSeries,
  getTopRatedSeries,
  getMostPopularSeries
} from "./series";

export { getMedia } from "./media";

export { search, searchReset } from "./searchbar";

export {
  authenticate,
  authenticationReset,
  fetchCurrentUser,
  logout
} from "./auth";

export { register } from "./registration";

export {
  addToFavorites,
  removeFromFavorites,
  isFavorited,
  getFavoritedMovies,
  getFavoritedSeries
} from "./favorites";
export {
  addToLikes,
  removeFromLikes,
  isLiked,
  getLikedMovies,
  getLikedSeries
} from "./likes";
