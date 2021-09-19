import { BOARD_TYPES } from "../../components/BoardTypes";
import { generateBoard } from "../../components/BoardBuilder";

const INITIAL_BOARD_SIZE = {
  width: 25,
  height: 10,
};

const initialState = {};

const initialBoard = {
  startX: 0,
  startY: 0,
  endX: INITIAL_BOARD_SIZE.width,
  endY: INITIAL_BOARD_SIZE.height,
};
initialState.enemyBoard = generateBoard(initialBoard);
initialState.playerBoard = generateBoard(initialBoard);
initialState.whoGoesFirst =
  Math.floor(Math.random() * 2) == 0 ? BOARD_TYPES.ENEMY : BOARD_TYPES.PLAYER;

export { initialState, INITIAL_BOARD_SIZE };
