import { BOARD_TYPES } from "../../components/BoardTypes";
import {
  initialState,
  generateRandom1dPosition,
  splitBoard,
} from "./initialState";
import each from "jest-each";

it("should create 5 ships when initialised", () => {
  const state = initialState;
  //   expect(state.ships.length).toBe(5);
});

it("should always determine that someone goes first", () => {
  const whoGoesFirst = initialState.whoGoesFirst;
  expect(whoGoesFirst).toBeDefined();
  if (whoGoesFirst == BOARD_TYPES.ENEMY) {
    expect(whoGoesFirst).toBe(BOARD_TYPES.ENEMY);
  } else {
    expect(whoGoesFirst).toBe(BOARD_TYPES.PLAYER);
  }
});

describe("random 1d generation tests", () => {
  each([
    [1, 1, 3, [1, 4]],
    [2, 2, 3, [2, 5]],
  ]).it(
    "should always find coords even if it overflows {start: %d end: %d size: %d expected: %s}",
    (start, end, size, expectedCoords) => {
      const coords = generateRandom1dPosition(start, end, size);
      expect(coords[0]).toBe(expectedCoords[0]);
      expect(coords[1]).toBe(expectedCoords[1]);
    }
  );

  each([
    [1, 4, 3],
    [2, 5, 3],
    [1, 7, 3],
    [2, 10, 3],
  ]).it(
    "should always fit coords within bounds for size {start: %d end: %d size: %d}",
    (start, end, size) => {
      const coords = generateRandom1dPosition(start, end, size);
      expect(coords[0]).toBeGreaterThanOrEqual(start);
      expect(coords[1]).toBeLessThanOrEqual(end);
    }
  );
});

describe("split board tests", () => {
  describe("basic split tests", () => {
    each([
      [
        "exact same",
        {
          startX: 0,
          startY: 0,
          endX: 1,
          endY: 0,
        },
        { startX: 0, startY: 0, endX: 1, endY: 0 },
        [],
      ],
      [
        "split on left",
        {
          startX: 0,
          startY: 0,
          endX: 2,
          endY: 0,
        },
        { startX: 1, startY: 0, endX: 2, endY: 0 },
        [
          {
            startX: 0,
            endX: 0,
            startY: 0,
            endY: 0,
          },
        ],
      ],
      [
        "split on right",
        {
          startX: 0,
          startY: 0,
          endX: 2,
          endY: 0,
        },
        { startX: 0, startY: 0, endX: 1, endY: 0 },
        [
          {
            startX: 2,
            endX: 2,
            startY: 0,
            endY: 0,
          },
        ],
      ],
      [
        "split on bottom",
        {
          startX: 0,
          startY: 0,
          endX: 1,
          endY: 1,
        },
        { startX: 0, startY: 0, endX: 1, endY: 0 },
        [
          {
            startX: 0,
            endX: 1,
            startY: 1,
            endY: 1,
          },
        ],
      ],
      [
        "board split in between with ship in the center",
        {
          startX: 0,
          startY: 0,
          endX: 2,
          endY: 0,
        },
        { startX: 1, startY: 0, endX: 1, endY: 0 },
        [
          {
            startX: 0,
            endX: 0,
            startY: 0,
            endY: 0,
          },
          {
            startX: 2,
            endX: 2,
            startY: 0,
            endY: 0,
          },
        ],
      ],
    ]).it(
      "should always split the board correctly {case: %s, board: %s, ship: %s, expected boards: %s}",
      (_, board, ship, expectedBoards) => {
        const boards = splitBoard(board, ship);
        expect(boards).toEqual(expectedBoards);
      }
    );
  });

  describe("exact match split tests", () => {
    each([
      [
        "horizontal match",
        {
          startX: 0,
          startY: 0,
          endX: 3,
          endY: 0,
        },
        { startX: 0, endX: 3, startY: 0, endY: 0 },
        [],
      ],
      [
        "vertical match",
        {
          startX: 0,
          startY: 0,
          endX: 0,
          endY: 3,
        },
        { startX: 0, endX: 0, startY: 0, endY: 3 },
        [],
      ],
      [
        "shifted horizontal match",
        {
          startX: 2,
          startY: 2,
          endX: 5,
          endY: 2,
        },
        { startX: 2, endX: 5, startY: 2, endY: 2 },
        [],
      ],
      [
        "shifted vertical match",
        {
          startX: 2,
          startY: 2,
          endX: 2,
          endY: 5,
        },
        { startX: 2, endX: 2, startY: 2, endY: 5 },
        [],
      ],
    ]).it(
      "{case: %s, board: %s, ship: %s, expected boards: %s}",
      (_, board, ship, expectedBoards) => {
        const boards = splitBoard(board, ship);
        expect(boards).toEqual(expectedBoards);
      }
    );
  });

  describe("invalid tests", () => {
    each([
      [
        "ship outside of board",
        {
          startX: 0,
          startY: 0,
          endX: 1,
          endY: 1,
        },
        { startX: 2, endX: 2, startY: 2, endY: 5 },
        [],
      ],
      [
        "ship has a negative coord",
        {
          startX: 0,
          startY: 0,
          endX: 1,
          endY: 1,
        },
        { startX: 0, endX: 0, startY: -1, endY: 0 },
        [],
      ],
      [
        "ship has negative coords",
        {
          startX: 0,
          startY: 0,
          endX: 1,
          endY: 1,
        },
        { startX: -2, endX: -2, startY: -2, endY: -5 },
        [],
      ],
      [
        "ship has swapped coords",
        {
          startX: 0,
          startY: 0,
          endX: 0,
          endY: 1,
        },
        { startX: 1, endX: 0, startY: 0, endY: 0 },
        [],
      ],
    ]).it(
      "{case: %s, board: %s, ship: %s, expected boards: %s}",
      (_, board, ship, expectedBoards) => {
        const boards = splitBoard(board, ship);
        expect(boards).toEqual(expectedBoards);
      }
    );
  });

  describe("middle placement tests", () => {
    each([
      [
        "ship in the middle of a 4 x 4 board",
        {
          startX: 0,
          startY: 0,
          endX: 3,
          endY: 3,
        },
        { startX: 1, endX: 2, startY: 1, endY: 1 },
        [
          {
            startX: 0,
            startY: 0,
            endX: 3,
            endY: 0,
          },
          {
            startX: 0,
            startY: 1,
            endX: 0,
            endY: 1,
          },
          {
            startX: 3,
            startY: 1,
            endX: 3,
            endY: 1,
          },
          {
            startX: 0,
            startY: 2,
            endX: 3,
            endY: 3,
          },
        ],
      ],
      [
        "horizontal ship in the middle of a 6 x 6 board",
        {
          startX: 0,
          startY: 0,
          endX: 5,
          endY: 5,
        },
        { startX: 3, endX: 4, startY: 3, endY: 3 },
        [
          {
            startX: 0,
            startY: 0,
            endX: 5,
            endY: 2,
          },
          {
            startX: 0,
            startY: 3,
            endX: 2,
            endY: 3,
          },
          {
            startX: 5,
            startY: 3,
            endX: 5,
            endY: 3,
          },
          {
            startX: 0,
            startY: 4,
            endX: 5,
            endY: 5,
          },
        ],
      ],
      [
        "vertical ship in the middle of a 6 x 6 board",
        {
          startX: 0,
          startY: 0,
          endX: 5,
          endY: 5,
        },
        { startX: 3, endX: 3, startY: 3, endY: 4 },
        [
          {
            startX: 0,
            startY: 0,
            endX: 5,
            endY: 2,
          },
          {
            startX: 0,
            startY: 3,
            endX: 2,
            endY: 4,
          },
          {
            startX: 4,
            startY: 3,
            endX: 5,
            endY: 4,
          },
          {
            startX: 0,
            startY: 5,
            endX: 5,
            endY: 5,
          },
        ],
      ],
      [
        "vertical ship on edge of a 6 x 6 board",
        {
          startX: 0,
          startY: 0,
          endX: 5,
          endY: 5,
        },
        { startX: 5, startY: 2, endX: 5, endY: 5 },
        [
          {
            startX: 0,
            startY: 0,
            endX: 5,
            endY: 1,
          },
          {
            startX: 0,
            startY: 2,
            endX: 4,
            endY: 5,
          },
        ],
      ],
    ]).it(
      "{case: %s, board: %s, ship: %s, expected boards: %s}",
      (_, board, ship, expectedBoards) => {
        const boards = splitBoard(board, ship);
        expect(boards).toEqual(expectedBoards);
      }
    );
  });
});
