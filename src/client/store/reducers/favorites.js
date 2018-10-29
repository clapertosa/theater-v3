import * as actionTypes from "../actions/actionTypes";
const initialState = {
  favorites: { movies: [], series: [] },
  success: undefined,
  error: undefined,
  loading: false,
  isFavorited: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FAVORITES_INIT:
      return {
        ...state,
        success: undefined,
        error: undefined,
        loading: true
      };
    case actionTypes.GET_FAVORITED_MOVIES_SUCCEEDED:
      return {
        ...state,
        favorites: { ...state.favorites, movies: action.payload },
        success: true,
        error: undefined,
        loading: false
      };
    case actionTypes.GET_FAVORITED_MOVIES_FAILED:
      return {
        ...state,
        favorites: { ...state.favorites, movies: [] },
        success: false,
        error: action.payload,
        loading: false
      };
    case actionTypes.GET_FAVORITED_SERIES_SUCCEEDED:
      return {
        ...state,
        favorites: { ...state.favorites, series: action.payload },
        success: true,
        error: undefined,
        loading: false
      };
    case actionTypes.GET_FAVORITED_SERIES_FAILED:
      return {
        ...state,
        favorites: { ...state.favorites, series: [] },
        success: false,
        error: action.payload,
        loading: false
      };
    case actionTypes.ADD_TO_FAVORITES_SUCCEEDED:
      return {
        ...state,
        isFavorited: true,
        success: true,
        error: undefined
      };
    case actionTypes.ADD_TO_FAVORITES_FAILED:
      return {
        ...state,
        success: false,
        error: action.payload
      };
    case actionTypes.REMOVE_FROM_FAVORITES_SUCCEEDED:
      return {
        ...state,
        isFavorited: false,
        success: true,
        error: undefined
      };
    case actionTypes.REMOVE_FROM_FAVORITES_FAILED:
      return {
        ...state,
        success: false,
        error: action.payload
      };
    case actionTypes.SET_IS_FAVORITED:
      return {
        ...state,
        isFavorited: action.payload,
        success: true,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
