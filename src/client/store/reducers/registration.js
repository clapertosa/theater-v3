import * as actionTypes from "../actions/actionTypes";

const initialState = {
  form: {},
  loading: false,
  error: undefined,
  success: undefined
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTRATION_INIT:
      return {
        ...state,
        form: {},
        loading: true,
        error: undefined,
        success: undefined
      };
    case actionTypes.REGISTRATION_SUCCEEDED:
      return {
        ...state,
        form: action.payload,
        error: undefined,
        success: true,
        loading: false
      };
    case actionTypes.REGISTRATION_FAILED:
      return {
        ...state,
        error: action.payload,
        success: false,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
