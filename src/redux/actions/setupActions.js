export const addShip = ship => {
  return {
    type: ADD_SHIP,
    payload: ship
  };
};

export const ADD_SHIP = "ADD_SHIP";
