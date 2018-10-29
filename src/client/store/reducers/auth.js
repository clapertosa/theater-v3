import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: undefined,
  success: undefined,
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATION_INIT:
      return {
        ...state,
        isAuthenticated: false,
        error: undefined,
        success: undefined,
        loading: true
      };
    case actionTypes.AUTHENTICATION_SUCCEEDED:
      return {
        ...state,
        isAuthenticated: true,
        success: true,
        loading: false
      };
    case actionTypes.AUTHENTICATION_FAILED:
      return {
        ...state,
        isAuthenticated: false,
        success: false,
        error: action.payload,
        loading: false
      };
    case actionTypes.AUTHENTICATION_RESET:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: undefined,
        success: undefined,
        user: {}
      };
    case actionTypes.SET_CURRENT_USER: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: undefined,
        success: true,
        user: action.payload
      };
    }
    case actionTypes.FETCH_CURRENT_USER_FAILED: {
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: undefined,
        success: undefined,
        user: {}
      };
    }
    default:
      return state;
  }
};

export default reducer;
