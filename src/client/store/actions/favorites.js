import * as actionTypes from "./actionTypes";
import axios from "../../axiosClientInstance";

export const favoritesInit = () => {
  return {
    type: actionTypes.FAVORITES_INIT
  };
};

export const getFavoritedMovies = () => {
  return dispatch => {
    dispatch(favoritesInit());
    axios
      .post("/user/dashboard/get_all_favorites", { mediaType: "movie" })
      .then(response => dispatch(getFavoritedMoviesSucceeded(response.data)))
      .catch(error => dispatch(getFavoritedMoviesFailed(error.response)));
  };
};

export const getFavoritedMoviesSucceeded = favorites => {
  return {
    type: actionTypes.GET_FAVORITED_MOVIES_SUCCEEDED,
    payload: favorites
  };
};

export const getFavoritedMoviesFailed = error => {
  return {
    type: actionTypes.GET_FAVORITED_MOVIES_FAILED,
    payload: error
  };
};

export const getFavoritedSeries = () => {
  return dispatch => {
    dispatch(favoritesInit());
    axios
      .post("/user/dashboard/get_all_favorites", { mediaType: "serie" })
      .then(response => dispatch(getFavoritedSeriesSucceeded(response.data)))
      .catch(error => dispatch(getFavoritedSeriesFailed(error.response)));
  };
};

export const getFavoritedSeriesSucceeded = favorites => {
  return {
    type: actionTypes.GET_FAVORITED_SERIES_SUCCEEDED,
    payload: favorites
  };
};

export const getFavoritedSeriesFailed = error => {
  return {
    type: actionTypes.GET_FAVORITED_SERIES_FAILED,
    payload: error
  };
};

export const addToFavorites = data => {
  return dispatch => {
    dispatch(favoritesInit());
    return axios
      .post("/user/dashboard/add_to_favorites", data)
      .then(response => dispatch(addToFavoritesSucceeded(response)))
      .catch(error => dispatch(addToFavoritesFailed(error.response)));
  };
};

export const removeFromFavorites = data => {
  return dispatch => {
    dispatch(favoritesInit());
    return axios
      .delete("/user/dashboard/remove_from_favorites", { data })
      .then(() => dispatch(removeFromFavoritesSucceeded()))
      .catch(error => dispatch(removeFromFavoritesFailed(error.response)));
  };
};

export const addToFavoritesSucceeded = data => {
  return {
    type: actionTypes.ADD_TO_FAVORITES_SUCCEEDED,
    payload: data
  };
};

export const addToFavoritesFailed = error => {
  return {
    type: actionTypes.ADD_TO_FAVORITES_SUCCEEDED,
    payload: error
  };
};

export const removeFromFavoritesSucceeded = () => {
  return {
    type: actionTypes.REMOVE_FROM_FAVORITES_SUCCEEDED
  };
};

export const removeFromFavoritesFailed = () => {
  return {
    type: actionTypes.REMOVE_FROM_FAVORITES_FAILED
  };
};

export const isFavorited = data => {
  return dispatch => {
    return axios
      .post("/user/dashboard/is_favorited", data)
      .then(response => dispatch(setIsFavorited(response.data)));
  };
};

export const setIsFavorited = data => {
  return {
    type: actionTypes.SET_IS_FAVORITED,
    payload: data
  };
};
