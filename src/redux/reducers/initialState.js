import { BOARD_TYPES } from "../../components/BoardTypes";
import { Ships } from "../../components/ShipTypes";

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

const initialShips = [
  Ships.Carrier,
  Ships.Battleship,
  Ships.Cruiser,
  Ships.Submarine,
  Ships.Destroyer,
];

export { initialState, INITIAL_BOARD_SIZE, initialBoard, initialShips };
