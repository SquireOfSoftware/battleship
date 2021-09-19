import { combineReducers } from "redux";
import turnReducer from "./turnReducer";
import {playerBoardReducer, enemyBoardReducer} from "./boardReducer";

const rootReducer = combineReducers({ turnReducer, playerBoardReducer, enemyBoardReducer });

export default rootReducer;
