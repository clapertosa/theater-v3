import * as actionTypes from "../actions/actionTypes";

const initialState = {
  data: { results: [] },
  loading: false,
  error: undefined,
  success: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCHBAR_INIT:
      return {
        ...state,
        loading: true,
        error: undefined,
        success: false
      };
    case actionTypes.SEARCHBAR_DONE:
      return {
        ...state,
        loading: false,
        error: undefined,
        success: true,
        data: action.payload
      };
    case actionTypes.SEARCHBAR_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false
      };
    case actionTypes.SEARCHBAR_RESET:
      return {
        ...state,
        loading: false,
        error: undefined,
        success: false,
        data: { results: [] }
      };
    default:
      return state;
  }
};

export default reducer;
