import * as actionTypes from "./actionTypes";
import axios from "../../axiosClientInstance";

export const getMediaInit = () => {
  return {
    type: actionTypes.GET_MEDIA_INIT
  };
};

export const getMedia = (mediaType, mediaId) => {
  return dispatch => {
    dispatch(getMediaInit());
    return axios
      .post(`/${mediaType}s/${mediaType}/${mediaId}`)
      .then(response => dispatch(getMediaDone(response.data)))
      .catch(error => dispatch(getMediaFailed(error.response.data)));
  };
};

export const getMediaDone = data => {
  return {
    type: actionTypes.GET_MEDIA_DONE,
    payload: data
  };
};

export const getMediaFailed = error => {
  return {
    type: actionTypes.GET_MEDIA_FAILED,
    payload: error
  };
};
