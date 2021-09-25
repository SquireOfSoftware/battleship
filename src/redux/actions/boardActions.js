import * as types from "./actionTypes";
import {
  generatePlayerBoardState,
  generateEnemyBoardState,
} from "../../components/BoardBuilder";
import { initialBoard, initialShips } from "../reducers/initialState";

export function loadPlayerBoard() {
  const playerBoard = generatePlayerBoardState(initialBoard, initialShips);

  return {
    type: types.BUILDING_PLAYER_BOARD,
    playerBoard,
  };
}

export function loadEnemyBoard() {
  const enemyBoard = generateEnemyBoardState(initialBoard, initialShips);

  return {
    type: types.BUILDING_ENEMY_BOARD,
    enemyBoard,
  };
}

export function attackEnemy(coords) {
  return {
    type: types.PLAYER_ATTACK,
    coords,
  };
}

export function restartBoards() {
  console.log("Restarting the game board");
  return {
    type: types.RESTART_BOARDS,
    enemyBoard: generateEnemyBoardState(initialBoard, initialShips),
    playerBoard: generatePlayerBoardState(initialBoard, initialShips),
  };
}
