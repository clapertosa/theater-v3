import { combineReducers } from "redux";
import cardsReducer from "./cards";
import mediaReducer from "./media";
import searchbarReducer from "./searchbar";
import authReducer from "./auth";
import registrationReducer from "./registration";
import favoritesReducer from "./favorites";
import likeReducer from "./likes";

const reducers = combineReducers({
  cards: cardsReducer,
  media: mediaReducer,
  searchbar: searchbarReducer,
  auth: authReducer,
  registration: registrationReducer,
  favorites: favoritesReducer,
  likes: likeReducer
});

export default reducers;
