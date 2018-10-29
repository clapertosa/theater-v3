import * as actionTypes from "./actionTypes";
import axios from "../../axiosClientInstance";

export const likesInit = () => {
  return {
    type: actionTypes.LIKES_INIT
  };
};

export const getLikedMovies = () => {
  return dispatch => {
    dispatch(likesInit());
    axios
      .post("/user/dashboard/get_all_likes", { mediaType: "movie" })
      .then(response => dispatch(getLikedMoviesSucceeded(response.data)))
      .catch(error => dispatch(getLikedMoviesFailed(error.response)));
  };
};

export const getLikedMoviesSucceeded = likes => {
  return {
    type: actionTypes.GET_LIKED_MOVIES_SUCCEEDED,
    payload: likes
  };
};

export const getLikedMoviesFailed = error => {
  return {
    type: actionTypes.GET_LIKED_MOVIES_FAILED,
    payload: error
  };
};

export const getLikedSeries = () => {
  return dispatch => {
    dispatch(likesInit());
    axios
      .post("/user/dashboard/get_all_likes", { mediaType: "serie" })
      .then(response => dispatch(getLikedSeriesSucceeded(response.data)))
      .catch(error => dispatch(getLikedSeriesFailed(error.response)));
  };
};

export const getLikedSeriesSucceeded = likes => {
  return {
    type: actionTypes.GET_LIKED_SERIES_SUCCEEDED,
    payload: likes
  };
};

export const getLikedSeriesFailed = error => {
  return {
    type: actionTypes.GET_LIKED_SERIES_FAILED,
    payload: error
  };
};

export const addToLikes = data => {
  return dispatch => {
    dispatch(likesInit());
    return axios
      .post("/user/dashboard/add_to_likes", data)
      .then(response => dispatch(addToLikesSucceeded(response)))
      .catch(error => dispatch(addToLikesFailed(error.response)));
  };
};

export const removeFromLikes = data => {
  return dispatch => {
    dispatch(likesInit());
    return axios
      .delete("/user/dashboard/remove_from_likes", { data })
      .then(() => dispatch(removeFromLikesSucceeded()))
      .catch(error => dispatch(removeFromLikesFailed(error.response)));
  };
};

export const addToLikesSucceeded = data => {
  return {
    type: actionTypes.ADD_TO_LIKES_SUCCEEDED,
    payload: data
  };
};

export const addToLikesFailed = error => {
  return {
    type: actionTypes.ADD_TO_LIKES_SUCCEEDED,
    payload: error
  };
};

export const removeFromLikesSucceeded = () => {
  return {
    type: actionTypes.REMOVE_FROM_LIKES_SUCCEEDED
  };
};

export const removeFromLikesFailed = () => {
  return {
    type: actionTypes.REMOVE_FROM_LIKES_FAILED
  };
};

export const isLiked = data => {
  return dispatch => {
    return axios
      .post("/user/dashboard/is_liked", data)
      .then(response => dispatch(setIsLiked(response.data)));
  };
};

export const setIsLiked = data => {
  return {
    type: actionTypes.SET_IS_LIKED,
    payload: data
  };
};
