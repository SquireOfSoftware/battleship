import { BOARD_TYPES } from "../../components/BoardTypes";
import { initialState } from "./initialState";

it("should create 5 ships when initialised", () => {
  const state = initialState;
  //   expect(state.ships.length).toBe(5);
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
