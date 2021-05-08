export const addShip = ship => dispatch => {
  dispatch({
    type: ADD_SHIP,
    payload: ship
  });
};

export const ADD_SHIP = "ADD_SHIP";
