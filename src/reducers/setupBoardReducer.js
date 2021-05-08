import { ADD_SHIP, ADD_OBSTACLES, SETUP_BOARD_SIZE } from '../actions/setupActions'

const initialState = {
  ships: [],
  boardSize: {
    x: 1,
    y: 1
  },
  obstacles: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_SHIP:
      console.log(action.payload);
      let ships = state.ships;
      ships.push(action.payload);
      return {
        ...state,
        ships
      }
    case SETUP_BOARD_SIZE:
      return {
        ...state,
        boardSize: action.payload
      }
    case ADD_OBSTACLES:
      return {
        ...state,
        obstacles: action.payload
      }
    default:
      return state;
  }
}