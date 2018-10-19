import * as actionTypes from "./actionTypes";
import axios from "../../axiosClientInstance";

export const searchInit = () => {
  return {
    type: actionTypes.SEARCHBAR_INIT
  };
};

export const search = query => {
  return dispatch => {
    return axios
      .post("/search", { query })
      .then(response => dispatch(searchDone(response.data)))
      .catch(error => dispatch(searchFailed(error)));
  };
};

export const searchDone = data => {
  return {
    type: actionTypes.SEARCHBAR_DONE,
    payload: data
  };
};

export const searchFailed = error => {
  return {
    type: actionTypes.SEARCHBAR_FAILED,
    payload: error
  };
};

export const searchReset = () => {
  return {
    type: actionTypes.SEARCHBAR_RESET
  };
};
