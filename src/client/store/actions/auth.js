import * as actionTypes from "./actionTypes";
import axios from "../../axiosClientInstance";
axios.defaults.withCredentials = true;

export const authenticationInit = () => {
  return {
    type: actionTypes.AUTHENTICATION_INIT
  };
};

export const authenticate = (email, password) => {
  return dispatch => {
    dispatch(authenticationInit());
    return axios
      .post("/user/login", { email, password })
      .then(response => dispatch(authenticateSucceeded()))
      .catch(error => dispatch(authenticateFailed(error.response)));
  };
};

export const logout = () => {
  return dispatch => {
    dispatch(authenticationReset());
    return axios.post("/user/logout").then(response => response.data);
  };
};

export const authenticateSucceeded = () => {
  return {
    type: actionTypes.AUTHENTICATION_SUCCEEDED
  };
};

export const authenticateFailed = error => {
  return {
    type: actionTypes.AUTHENTICATION_FAILED,
    payload: error
  };
};

export const authenticationReset = () => {
  return {
    type: actionTypes.AUTHENTICATION_RESET
  };
};

export const fetchCurrentUser = () => {
  return dispatch => {
    dispatch(authenticationInit());
    return axios
      .post("/user/current_user")
      .then(response => dispatch(setCurrentUser(response.data)))
      .catch(error => dispatch(fetchCurrentUserFailed(error.response)));
  };
};

export const setCurrentUser = user => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: user
  };
};

export const fetchCurrentUserFailed = error => {
  return {
    type: actionTypes.FETCH_CURRENT_USER_FAILED,
    payload: error
  };
};
