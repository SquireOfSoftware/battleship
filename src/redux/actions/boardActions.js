import * as types from "./actionTypes";
import {
  generateBoardState,
  generateShipPlacements,
} from "../../components/BoardBuilder";
import { initialBoard, initialShips } from "../reducers/initialState";
import { BOARD_TYPES } from "../../components/BoardTypes";

export function loadPlayerBoard() {
  return {
    type: types.BUILDING_PLAYER_BOARD,
    playerBoard: generateBoardState(
      initialBoard,
      generateShipPlacements(initialBoard, initialShips),
      BOARD_TYPES.PLAYER
    ),
  };
}

export function loadEnemyBoard() {
  return {
    type: types.BUILDING_ENEMY_BOARD,
    enemyBoard: generateBoardState(
      initialBoard,
      generateShipPlacements(initialBoard, initialShips),
      BOARD_TYPES.ENEMY
    ),
  };
}

export function attackEnemy(coords) {
  return {
    type: types.PLAYER_ATTACK,
    coords,
  };
}