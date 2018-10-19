import * as actionTypes from "./actionTypes";
import axios from "../../axiosClientInstance";

export const getMoviesInit = () => {
  return {
    type: actionTypes.GET_CARDS_INIT
  };
};

export const getLatestMovies = page => {
  return dispatch => {
    dispatch(getMoviesInit());
    return axios
      .post("/movies/get-latest", { page })
      .then(response => dispatch(getMoviesDone(response.data)))
      .catch(error => dispatch(getMoviesFailed(error.response.data)));
  };
};

export const getTopRatedMovies = page => {
  return dispatch => {
    dispatch(getMoviesInit());
    return axios
      .post("/movies/top-rated", { page })
      .then(response => dispatch(getMoviesDone(response.data)))
      .catch(error => dispatch(getMoviesFailed(error.response.data)));
  };
};

export const getMostVotedMovies = page => {
  return dispatch => {
    dispatch(getMoviesInit());
    return axios
      .post("/movies/most-voted", { page })
      .then(response => dispatch(getMoviesDone(response.data)))
      .catch(error => dispatch(getMoviesFailed(error.response.data)));
  };
};

export const getMoviesDone = data => {
  return {
    type: actionTypes.GET_MOVIES_CARDS_DONE,
    payload: data
  };
};

export const getMoviesFailed = error => {
  return {
    type: actionTypes.GET_CARDS_FAILED,
    payload: error
  };
};
