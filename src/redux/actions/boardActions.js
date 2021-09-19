import * as types from "./actionTypes";
import {
  generateBoardState,
  generateShipPlacements,
} from "../../components/BoardBuilder";
import { initialBoard, initialShips } from "../reducers/initialState";

export function loadPlayerBoard() {
  return {
    type: types.BUILDING_PLAYER_BOARD,
    playerBoard: generateBoardState(
      initialBoard,
      generateShipPlacements(initialBoard, initialShips)
    ),
  };
}

export function loadEnemyBoard() {
  return {
    type: types.BUILDING_ENEMY_BOARD,
    enemyBoard: generateBoardState(
      initialBoard,
      generateShipPlacements(initialBoard, initialShips)
    ),
  };
}
