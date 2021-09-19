import * as types from "../actions/actionTypes";
import { initialState } from "./initialState";

export function playerBoardReducer(state = initialState.playerBoard, action) {
  switch (action.type) {
    case types.BUILDING_PLAYER_BOARD:
      return {
        playerBoard: action.playerBoard,
      };
    default:
      return state;
  }
}

export function enemyBoardReducer(state = initialState.enemyBoard, action) {
  switch (action.type) {
    case types.BUILDING_ENEMY_BOARD:
      return { enemyBoard: action.enemyBoard };
    default:
      return state;
  }
}
