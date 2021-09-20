import { initialState } from "./initialState";
import * as types from "../actions/actionTypes";

const turnReducer = (state = initialState.whoGoesFirst, action) => {
  switch (action.type) {
    case types.INITIAL_COIN_FLIP:
      return action.whoGoesFirst;
    default:
      return state;
  }
};

export default turnReducer;
