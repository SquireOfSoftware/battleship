import { BOARD_TYPES } from "../../components/BoardTypes";
import { initialState } from "./initialState";

it("should create 5 ships for both players when initialised", () => {
  // take note that there is a very rare chance that this can fail
  // if the board generation just so happens to subsect the right amount
  // of rectangles will fail to create the desired board state
  const state = initialState;
  const playerBoard = state.playerBoard;
  expect(playerBoard.ships.length).toBe(5);
  const enemyBoard = state.enemyBoard;
  expect(enemyBoard.ships.length).toBe(5);
});

it("should always determine that someone goes first", () => {
  const whoGoesFirst = initialState.whoGoesFirst;
  expect(whoGoesFirst).toBeDefined();
  if (whoGoesFirst == BOARD_TYPES.ENEMY) {
    expect(whoGoesFirst).toBe(BOARD_TYPES.ENEMY);
  } else {
    expect(whoGoesFirst).toBe(BOARD_TYPES.PLAYER);
  }
});
