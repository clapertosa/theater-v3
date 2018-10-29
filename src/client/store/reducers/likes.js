import * as actionTypes from "../actions/actionTypes";
const initialState = {
  likes: { movies: [], series: [] },
  success: undefined,
  error: undefined,
  loading: false,
  isLiked: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LIKES_INIT:
      return {
        ...state,
        success: undefined,
        error: undefined,
        loading: true
      };
    case actionTypes.GET_LIKED_MOVIES_SUCCEEDED:
      return {
        ...state,
        likes: { ...state.likes, movies: action.payload },
        success: true,
        error: undefined,
        loading: false
      };
    case actionTypes.GET_LIKED_MOVIES_FAILED:
      return {
        ...state,
        likes: { ...state.likes, movies: [] },
        success: false,
        error: action.payload,
        loading: false
      };
    case actionTypes.GET_LIKED_SERIES_SUCCEEDED:
      return {
        ...state,
        likes: { ...state.likes, series: action.payload },
        success: true,
        error: undefined,
        loading: false
      };
    case actionTypes.GET_LIKED_SERIES_FAILED:
      return {
        ...state,
        likes: { ...state.likes, series: [] },
        success: false,
        error: action.payload,
        loading: false
      };
    case actionTypes.ADD_TO_LIKES_SUCCEEDED:
      return {
        ...state,
        isLiked: true,
        success: true,
        error: undefined,
        loading: false
      };
    case actionTypes.ADD_TO_LIKES_FAILED:
      return {
        ...state,
        success: false,
        error: action.payload,
        loading: false
      };
    case actionTypes.REMOVE_FROM_LIKES_SUCCEEDED:
      return {
        ...state,
        isLiked: false,
        success: true,
        error: undefined,
        loading: false
      };
    case actionTypes.REMOVE_FROM_LIKES_FAILED:
      return { ...state, success: false, error: action.payload };
    case actionTypes.SET_IS_LIKED:
      return {
        ...state,
        isLiked: action.payload,
        success: true,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
