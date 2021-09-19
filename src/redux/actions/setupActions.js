import * as types from "../actions/actionTypes";
import { BOARD_TYPES } from "../../components/BoardTypes";

function decideWhoGoesFirst() {
  return {
    type: types.INITIAL_COIN_FLIP,
    whoGoesFirst:
      Math.floor(Math.random() * 2) == 0
        ? BOARD_TYPES.ENEMY
        : BOARD_TYPES.PLAYER,
  };
}

export default decideWhoGoesFirst;
