import { combineReducers } from "redux";
import turnDeterminer from "./turnReducer";
import {
  playerBoardReducer as playerBoardState,
  enemyBoardReducer as enemyBoardState,
  attackReducer as seenEnemyBoard,
} from "./boardReducer";

const rootReducer = combineReducers({
  turnDeterminer,
  playerBoardState,
  enemyBoardState,
  seenEnemyBoard,
});

export default rootReducer;
