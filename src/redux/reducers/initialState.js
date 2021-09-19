import { SQUARE_TYPES } from "../../components/SquareTypes";
import { BOARD_TYPES } from "../../components/BoardTypes";
import { Ships } from "../../components/ShipTypes";

const INITIAL_BOARD_SIZE = {
  width: 25,
  height: 10,
};

const SHIP_ORIENTATION = {
  VERTICAL: "VERTICAL",
  HORIZONTAL: "HORIZONTAL",
};

const initialState = {};

// from MDN
function getRandomInt(min, max) {
  return Math.floor(getRandomArbitrary(min, max));
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomOrientation() {
  return Math.floor(Math.random() * 2) == 0
    ? SHIP_ORIENTATION.HORIZONTAL
    : SHIP_ORIENTATION.VERTICAL;
}

// this does not support negatives
function generateRandom1dPosition(boardStart, boardEnd, shipSize) {
  const sizeDiff = Math.abs(shipSize - (boardEnd - boardStart));
  let maxValue = sizeDiff;
  if ((boardStart === 0 && boardEnd === 0) || (boardEnd - boardStart) <= 0) {
    maxValue = boardStart;
  }

  const randomPosition = getRandomInt(
    boardStart,
    maxValue < boardStart ? boardStart : maxValue
  );
  return [randomPosition, randomPosition + shipSize - 1];
}

function splitBoard(board, ship) {
  // assuming a board of {startX, startY, endX, endY}
  // we want to split the board according to the given ship to return 0 - 4 boards

  // check that the ship is within the board bounds
  if (
    ship.startX > board.endX ||
    ship.startX < board.startX ||
    ship.endX < board.startX ||
    ship.endX > board.endX ||
    ship.startY > board.endY ||
    ship.startY < board.startY ||
    ship.endY < board.startY ||
    ship.endY > board.endY
  ) {
    return [];
  }

  // after the validity check above, we always assume that the ship can fit inside
  const topDiff = ship.startY;
  const bottomDiff = board.endY - ship.endY;
  const leftDiff = ship.startX;
  const rightDiff = board.endX - ship.endX;

  const splitBoards = [];

  if (topDiff > 0 && topDiff !== board.startY) {
    const newBoard = {
      startX: board.startX,
      endX: board.endX,
      startY: board.startY,
      endY: topDiff - 1,
      // type: "top"
    };
    splitBoards.push(newBoard);
  }

  if (leftDiff > 0 && leftDiff !== board.startX) {
    const newBoard = {
      startX: board.startX,
      endX: leftDiff - 1,
      startY: ship.startY,
      endY: ship.endY,
      // type: "left"
    };
    splitBoards.push(newBoard);
  }

  if (rightDiff > 0) {
    const newBoard = {
      startX: ship.endX + 1,
      endX: board.endX,
      startY: ship.startY,
      endY: ship.endY,
      // type: "right"
    };
    splitBoards.push(newBoard);
  }

  if (bottomDiff > 0) {
    const newBoard = {
      startX: board.startX,
      endX: board.endX,
      startY: ship.endY + 1,
      endY: board.endY,
      // type: "bottom"
    };
    splitBoards.push(newBoard);
  }

  return splitBoards;
}

function generateShipOrientation(initialBoard, shipToPlace) {
  if (shipToPlace.size < 0) {
    throw "We cannot fit a 0 or a negative sized ship";
  }

  const boardWidth = initialBoard.endX - initialBoard.startX + 1;
  const boardHeight = initialBoard.endY - initialBoard.startY + 1;

  const canFitWidth = boardWidth >= shipToPlace.size;
  const canFitHeight = boardHeight >= shipToPlace.size;
  let orientation = undefined;
  if (canFitWidth && canFitHeight) {
    orientation = getRandomOrientation();
  } else if (canFitWidth && !canFitHeight) {
    orientation = SHIP_ORIENTATION.HORIZONTAL;
  } else if (!canFitWidth && canFitHeight) {
    orientation = SHIP_ORIENTATION.VERTICAL;
  }

  if (orientation === undefined) {
    throw "We cannot fit the ship on this board";
  }
  return {
    size: shipToPlace.size,
    orientation,
  };
}

// from https://stackoverflow.com/questions/4373741/how-can-i-randomly-place-several-non-colliding-rects
function placeAndSplitBoard(initialBoard, shipToPlace) {
  // assuming a board of some size x and y, we will place the ship randomly in the board meeting its conditions
  // a board starts from a, b at the top left, to x, y in the bottom right
  // a board has a schema of {startX, startY, endX, endY}
  // a shipToPlace has a schema of {size, orientation}
  // we are also assuming the ship has a given length of a width of 1
  // once we place the ship, we will split the board up into free squares and return that as the output
  // take note that we will ignore board merges for now

  let shipCoords = {};
  let splitBoards = [];

  if (shipToPlace.orientation === SHIP_ORIENTATION.HORIZONTAL) {
    const startCoords = generateRandom1dPosition(
      initialBoard.startX,
      initialBoard.endX,
      shipToPlace.size
    );
    const yCoord = getRandomInt(initialBoard.startY, initialBoard.endY);

    shipCoords = {
      startX: startCoords[0],
      startY: yCoord,
      endX: startCoords[1],
      endY: yCoord,
    };
  } else {
    // we can assume that it is VERTICAL
    const startCoords = generateRandom1dPosition(
      initialBoard.startY,
      initialBoard.endY,
      shipToPlace.size
    );
    const xCoord = getRandomInt(initialBoard.startX, initialBoard.endX);

    shipCoords = {
      startX: xCoord,
      startY: startCoords[0],
      endX: xCoord,
      endY: startCoords[1],
    };
  }

  // we kind of assume that it can fit our ship
  splitBoards = splitBoard(initialBoard, shipCoords);

  return {
    initialBoard: initialBoard,
    ship: { ...shipToPlace, ...shipCoords },
    splitBoards,
  };
}

function generateShipPlacements() {
  const shipsToBeCreated = [
    Ships.Carrier,
    Ships.Battleship,
    Ships.Cruiser,
    Ships.Submarine,
    Ships.Destroyer,
  ];
  const createdShips = [];
  // we should be iterating from largest ship to smallest
  // main reason is that its easier to fit a small ship if the big ships
  // have already been sorted out, we do risk space failure
  shipsToBeCreated.forEach((ship) => {
    // now we place the ships as best we can
  });
}

function generateBoard() {
  const board = [];
  const ships = generateShipPlacements();

  for (let x = 0; x < INITIAL_BOARD_SIZE.width; x++) {
    let row = [];
    for (let y = 0; y < INITIAL_BOARD_SIZE.height; y++) {
      row.push(SQUARE_TYPES.FREE);
    }
    board.push(row);
  }

  return board;
}

initialState.enemyBoard = generateBoard();
initialState.playerBoard = generateBoard();
initialState.whoGoesFirst =
  Math.floor(Math.random() * 2) == 0 ? BOARD_TYPES.ENEMY : BOARD_TYPES.PLAYER;

export {
  initialState,
  INITIAL_BOARD_SIZE,
  SHIP_ORIENTATION,
  getRandomInt,
  generateRandom1dPosition,
  splitBoard,
  placeAndSplitBoard,
  generateShipOrientation,
};
