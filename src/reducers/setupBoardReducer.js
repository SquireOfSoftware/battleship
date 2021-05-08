import { ADD_SHIP, ROTATE_SHIP } from '../actions/types'

const initialState = {
  ships: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_SHIP:
      console.log(action.payload);
      let ships = state.ships;
      ships.push(action.payload);
      return {
        ...state,
        ships: ships
      }
    default:
      return state;
  }
}