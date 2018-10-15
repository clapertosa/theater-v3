import * as actionTypes from "./actionTypes";
import axios from "../../axiosClientInstance";

export const getSeriesInit = () => {
  return {
    type: actionTypes.GET_CARDS_INIT
  };
};

export const getOnTheAirSeries = page => {
  return dispatch => {
    getSeriesInit();
    return axios
      .post("/series/on-the-air", { page })
      .then(response => dispatch(getSeriesDone(response.data)))
      .catch(error => dispatch(getSeriesFailed(error.response.data)));
  };
};

export const getTopRatedSeries = page => {
  return dispatch => {
    getSeriesInit();
    return axios
      .post("/series/top-rated", { page })
      .then(response => dispatch(getSeriesDone(response.data)))
      .catch(error => dispatch(getSeriesFailed(error.response.data)));
  };
};

export const getMostPopularSeries = page => {
  return dispatch => {
    getSeriesInit();
    return axios
      .post("/series/most-popular", { page })
      .then(response => dispatch(getSeriesDone(response.data)))
      .catch(error => dispatch(getSeriesFailed(error.response.data)));
  };
};

export const getSeriesDone = data => {
  return {
    type: actionTypes.GET_CARDS_DONE,
    payload: data
  };
};

export const getSeriesFailed = error => {
  return {
    type: actionTypes.GET_CARDS_FAILED,
    payload: error
  };
};
