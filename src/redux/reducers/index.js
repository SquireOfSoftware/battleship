import { combineReducers } from "redux";
import turnDeterminer from "./turnReducer";
import {playerBoardReducer as playerBoardState, enemyBoardReducer as enemyBoardState} from "./boardReducer";

const rootReducer = combineReducers({
  turnDeterminer,
  playerBoardState,
  enemyBoardState,
});

export default rootReducer;
