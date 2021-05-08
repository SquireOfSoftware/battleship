import { ADD_SHIP, ROTATE_SHIP } from './types'

export const addShip = ship => dispatch => {
  dispatch({
    type: ADD_SHIP,
    payload: ship
  });
};