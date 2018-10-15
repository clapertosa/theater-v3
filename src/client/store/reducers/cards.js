import * as actionTypes from "../actions/actionTypes";

const initialState = {
  data: { results: [] },
  error: undefined,
  loading: false,
  success: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CARDS_INIT:
      return {
        ...state,
        loading: true,
        success: false,
        error: undefined
      };
    case actionTypes.GET_CARDS_DONE:
      return {
        ...state,
        loading: false,
        success: true,
        error: undefined,
        data: action.payload
      };
    case actionTypes.GET_CARDS_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
