import * as types from "./actionTypes";
import { BOARD_TYPES } from "../../components/BoardTypes";
import { generateBoard } from "../../components/BoardBuilder";
import { initialBoard } from "../reducers/initialState";

export function loadPlayerBoard() {
  return {
    type: types.BUILDING_PLAYER_BOARD,
    playerBoard: generateBoard(initialBoard, BOARD_TYPES.PLAYER),
  };
}

export function loadEnemyBoard() {
  return {
    type: types.BUILDING_ENEMY_BOARD,
    enemyBoard: generateBoard(initialBoard, BOARD_TYPES.ENEMY),
  };
}
