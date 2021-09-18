import { ADD_SHIP } from "../actions/setupActions";
import { initialState } from "./initialState";

const setupBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SHIP:
      // here you actually want to store the grid here right?
      // rather than derive the state you want to actually store
      // the state here, so this would directly write into the board
      console.log(action.payload);
      return {};
    default:
      return state;
  }
};

export default setupBoardReducer;
