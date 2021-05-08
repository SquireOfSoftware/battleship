import { ADD_SHIP } from '../actions/setupActions'
import initialState from './initialState'

const setupBoardReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_SHIP:
      console.log(action.payload);
      let ships = state.ships;
      ships.push(action.payload);
      return {
        ...state,
        ships
      }
    default:
      return state;
  }
}

export default setupBoardReducer;