import { combineReducers } from "redux";
import cardsReducer from "./cards";
import mediaReducer from "./media";
import searchbarReducer from "./searchbar";

const reducers = combineReducers({
  cards: cardsReducer,
  media: mediaReducer,
  searchbar: searchbarReducer
});

export default reducers;
