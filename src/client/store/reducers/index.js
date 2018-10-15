import { combineReducers } from "redux";
import cardsReducer from "./cards";

const reducers = combineReducers({
  cards: cardsReducer
});

export default reducers;
