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

function generateRandom1dPosition(boardStart, boardEnd, shipSize) {
  const sizeDiff = shipSize - boardEnd;
  const randomPosition = getRandomInt(
    boardStart,
    sizeDiff < boardStart ? boardStart : sizeDiff
  );
  return [randomPosition, randomPosition + shipSize];
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
    ship.startY > board.startY ||
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
      endY: topDiff,
    };
    splitBoards.push(newBoard);
  }

  if (leftDiff > 0 && leftDiff !== board.startX) {
    const newBoard = {
      startX: board.startX,
      endX: leftDiff - 1,
      startY: ship.startY,
      endY: ship.endY,
    };
    splitBoards.push(newBoard);
  }

  if (rightDiff > 0) {
    const newBoard = {
      startX: ship.endX + 1,
      endX: board.endX,
      startY: ship.startY,
      endY: ship.endY,
    };
    splitBoards.push(newBoard);
  }

  if (bottomDiff > 0) {
    const newBoard = {
      startX: board.startX,
      endX: board.endX,
      startY: bottomDiff,
      endY: board.endY,
    };
    splitBoards.push(newBoard);
  }

  return splitBoards;
}

// from https://stackoverflow.com/questions/4373741/how-can-i-randomly-place-several-non-colliding-rects
function placeAndSplitBoard(initialBoard, shipToPlace) {
  // assuming a board of some size x and y, we will place the ship randomly in the board meeting its conditions
  // a board starts from a, b at the top left, to x - 1, y - 1 in the bottom right
  // a board has a schema of {startX, startY, endX, endY}
  // we are also assuming the ship has a given length of a width of 1
  // once we place the ship, we will split the board up into free squares and return that as the output
  const boardWidth = initialBoard.endX - initialBoard.startX;
  const boardHeight = initialBoard.endY - initialBoard.startY;

  const canFitWidth = boardWidth > shipToPlace.size;
  const canFitHeight = boardHeight > shipToPlace.size;
  let orientation = undefined;
  if (canFitWidth && canFitHeight) {
    orientation = getRandomOrientation();
  } else if (canFitWidth && !canFitHeight) {
    orientation = SHIP_ORIENTATION.HORIZONTAL;
  } else if (!canFitWidth && canFitHeight) {
    orientation = SHIP_ORIENTATION.VERTICAL;
  }

  if (orientation === undefined) {
    return { error: "We cannot fit the ship on this board" };
  }

  let shipCoord = {};

  if (orientation === SHIP_ORIENTATION.HORIZONTAL) {
    const xCoords = generateRandom1dPosition(
      initialBoard.startX,
      initialBoard.endX,
      shipToPlace.size
    );
    const yCoord = getRandomInt(initialBoard.startY, initialBoard.endY);
  } else {
    // we can assume that it is VERTICAL
  }
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
  getRandomInt,
  generateRandom1dPosition,
  splitBoard,
};
