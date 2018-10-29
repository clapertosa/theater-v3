import * as actionTypes from "./actionTypes";
import axios from "../../axiosClientInstance";

export const registrationInit = () => {
  return {
    type: actionTypes.REGISTRATION_INIT
  };
};

export const register = data => {
  return dispatch => {
    dispatch(registrationInit());
    return axios
      .post("/user/register", data)
      .then(response => dispatch(registrationSucceeded(response.data)))
      .catch(error => dispatch(registrationFailed(error.response.data)));
  };
};

export const registrationSucceeded = form => {
  return {
    type: actionTypes.REGISTRATION_SUCCEEDED,
    payload: form
  };
};

export const registrationFailed = error => {
  return {
    type: actionTypes.REGISTRATION_FAILED,
    payload: error
  };
};
