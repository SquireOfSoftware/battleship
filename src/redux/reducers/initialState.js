import { BOARD_TYPES } from "../../components/BoardTypes";

const INITIAL_BOARD_SIZE = {
  width: 25,
  height: 10,
};

const initialBoard = {
  startX: 0,
  startY: 0,
  endX: INITIAL_BOARD_SIZE.width,
  endY: INITIAL_BOARD_SIZE.height,
};

const initialState = {
  enemyBoard: [],
  playerBoard: [],
  whoGoesFirst: BOARD_TYPES.PLAYER,
  initialBoard,
};

// initialState.enemyBoard = generateBoard(initialBoard, BOARD_TYPES.ENEMY);
// initialState.playerBoard = generateBoard(initialBoard, BOARD_TYPES.PLAYER);
// initialState.whoGoesFirst =
//   Math.floor(Math.random() * 2) == 0 ? BOARD_TYPES.ENEMY : BOARD_TYPES.PLAYER;

export { initialState, INITIAL_BOARD_SIZE, initialBoard };
