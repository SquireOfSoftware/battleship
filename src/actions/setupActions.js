export const addShip = ship => dispatch => {
  dispatch({
    type: ADD_SHIP,
    payload: ship
  });
};

export const ADD_SHIP = "ADD_SHIP";

export const setupBoardSize = boardSize => dispatch => {
  dispatch({
    type: SETUP_BOARD_SIZE,
    payload: boardSize
  });
}

export const SETUP_BOARD_SIZE = "SETUP_BOARD_SIZE"

export const addObstacles = obstacles => dispatch => {
  dispatch({
    type: ADD_OBSTACLES,
    payload: obstacles
  });
}

export const ADD_OBSTACLES = "ADD_OBSTACLES"