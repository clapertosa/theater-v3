import * as actionTypes from "../actions/actionTypes";

const initialState = {
  data: {},
  error: undefined,
  loading: false,
  success: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MEDIA_INIT:
      return {
        ...state,
        error: undefined,
        loading: true,
        success: false
      };
    case actionTypes.GET_MEDIA_DONE:
      return {
        ...state,
        error: undefined,
        loading: false,
        success: true,
        data: action.payload
      };
    case actionTypes.GET_MEDIA_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
        success: false
      };
    default:
      return state;
  }
};

export default reducer;
