import each from "jest-each";
import { fail } from "jest";
import {
  generateRandom1dPosition,
  splitBoard,
  placeAndSplitBoard,
  generateShipOrientation,
  placeShipOnBoard,
  generateBoardState,
} from "./BoardBuilder";
import { SHIP_ORIENTATION, Ships } from "./ShipTypes";
import { SQUARE_TYPES } from "./SquareTypes";

describe("random 1d generation tests", () => {
  each([
    [0, 0, 3, [0, 2]],
    [1, 1, 3, [1, 3]],
    [2, 2, 3, [2, 4]],
    [20, 20, 3, [20, 22]],
  ]).it(
    "should always find coords even if it overflows {start: %d end: %d size: %d expected: %s}",
    (start, end, size, expectedCoords) => {
      const coords = generateRandom1dPosition(start, end, size);
      expect(coords).toEqual(expectedCoords);
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
      expect(coords[0]).toBeLessThanOrEqual(end - size);
      expect(coords[1]).toBeLessThanOrEqual(end);
      expect(coords[1]).toBeGreaterThanOrEqual(start + size - 1);
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

describe("ship orientation tests", () => {
  each([
    [
      {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
      },
      {
        size: 2,
      },
      "We cannot fit the ship on this board",
    ],
    [
      {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
      },
      {
        size: 4,
      },
      "We cannot fit the ship on this board",
    ],
    [
      {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
      },
      {
        size: -1,
      },
      "We cannot fit a 0 or a negative sized ship",
    ],
  ]).it(
    "should throw an error if the ship does not fit in the board, board: %s, ship: %s",
    (initialBoard, shipToPlace, expectedError) => {
      try {
        generateShipOrientation(initialBoard, shipToPlace);
        fail("it should not reach here");
      } catch (e) {
        expect(e).toBe(expectedError);
      }
    }
  );

  describe("forced orientation tests", () => {
    each([
      [
        {
          startX: 0,
          startY: 0,
          endX: 3,
          endY: 3,
        },
        {
          size: 2,
        },
      ],
      [
        {
          startX: 0,
          startY: 0,
          endX: 3,
          endY: 3,
        },
        {
          size: 3,
        },
      ],
      [
        {
          startX: 0,
          startY: 0,
          endX: 3,
          endY: 3,
        },
        {
          size: 4,
        },
      ],
      [
        {
          startX: 0,
          startY: 0,
          endX: 0,
          endY: 3,
        },
        {
          size: 4,
        },
      ],
    ]).it(
      "should pick VERTICAL if the math random comes out as even, board: %s, ship: %s",
      (board, ship) => {
        const mathSpy = jest.spyOn(Math, "random");
        mathSpy.mockReturnValue(1);
        const result = generateShipOrientation(board, ship);

        expect(result.orientation).toBe(SHIP_ORIENTATION.VERTICAL);

        mathSpy.mockRestore();
      }
    );

    each([
      [
        {
          startX: 0,
          startY: 0,
          endX: 3,
          endY: 3,
        },
        {
          size: 2,
        },
      ],
      [
        {
          startX: 0,
          startY: 0,
          endX: 3,
          endY: 3,
        },
        {
          size: 3,
        },
      ],
      [
        {
          startX: 0,
          startY: 0,
          endX: 3,
          endY: 3,
        },
        {
          size: 4,
        },
      ],
      [
        {
          startX: 0,
          startY: 0,
          endX: 3,
          endY: 0,
        },
        {
          size: 4,
        },
      ],
    ]).it(
      "should pick HORIZONTAL if the math random comes out as even, board: %s, ship: %s",
      (board, ship) => {
        const mathSpy = jest.spyOn(Math, "random");
        mathSpy.mockReturnValue(0);
        const result = generateShipOrientation(board, ship);

        expect(result.orientation).toBe(SHIP_ORIENTATION.HORIZONTAL);

        mathSpy.mockRestore();
      }
    );
  });
});

describe("ship placement tests", () => {
  describe("return the input board in results", () => {
    each([
      [
        {
          startX: 0,
          staryY: 2,
          endX: 2,
          endY: 2,
        },
        {
          size: 2,
        },
      ],
      [
        {
          startX: 0,
          staryY: 2,
          endX: 2,
          endY: 2,
        },
        {
          size: 3,
        },
      ],
    ]).it(
      "should always return the input board, board: %s, ship: %s",
      (initialBoard, ship) => {
        const result = placeAndSplitBoard(initialBoard, ship);
        // console.log(result);
        expect(result.initialBoard).toBeDefined();
        expect(result.initialBoard).toEqual(initialBoard);
      }
    );
  });

  describe("placing a vertical ship in a vertical board", () => {
    each([
      [
        "in the middle of a board",
        {
          startX: 0,
          startY: 0,
          endX: 0,
          endY: 4,
        },
        {
          size: 3,
          orientation: SHIP_ORIENTATION.VERTICAL,
        },
        1,
        {
          startX: 0,
          startY: 1,
          endX: 0,
          endY: 3,
          size: 3,
          orientation: SHIP_ORIENTATION.VERTICAL,
        },
        [
          {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
          },
          {
            startX: 0,
            startY: 4,
            endX: 0,
            endY: 4,
          },
        ],
      ],
      [
        "at the top of the board",
        {
          startX: 0,
          startY: 0,
          endX: 0,
          endY: 4,
        },
        {
          size: 3,
          orientation: SHIP_ORIENTATION.VERTICAL,
        },
        0,
        {
          startX: 0,
          startY: 0,
          endX: 0,
          endY: 2,
          size: 3,
          orientation: SHIP_ORIENTATION.VERTICAL,
        },
        [
          {
            startX: 0,
            startY: 3,
            endX: 0,
            endY: 4,
          },
        ],
      ],
      [
        "at the bottom of the board",
        {
          startX: 0,
          startY: 0,
          endX: 0,
          endY: 4,
        },
        {
          size: 3,
          orientation: SHIP_ORIENTATION.VERTICAL,
        },
        2,
        {
          startX: 0,
          startY: 2,
          endX: 0,
          endY: 4,
          size: 3,
          orientation: SHIP_ORIENTATION.VERTICAL,
        },
        [
          {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 1,
          },
        ],
      ],
    ]).it(
      "mocked out randomiser, usecase: %s",
      (_, board, ship, mockedRandom, expectedShip, expectedSplits) => {
        // given
        const mathSpy = jest.spyOn(Math, "random");
        mathSpy.mockReturnValueOnce(mockedRandom);

        // when
        const result = placeAndSplitBoard(board, ship);

        // then
        expect(result.initialBoard).toBe(board);

        expect(result.ship).toEqual(expectedShip);

        expect(result.splitBoards).toEqual(expectedSplits);

        mathSpy.mockRestore();
      }
    );
  });

  describe("placing a horizontal ship in a horizontal board", () => {
    each([
      [
        "in the middle of a board",
        {
          startX: 0,
          startY: 0,
          endX: 4,
          endY: 0,
        },
        {
          size: 3,
          orientation: SHIP_ORIENTATION.HORIZONTAL,
        },
        1,
        {
          startX: 1,
          startY: 0,
          endX: 3,
          endY: 0,
          size: 3,
          orientation: SHIP_ORIENTATION.HORIZONTAL,
        },
        [
          {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
          },
          {
            startX: 4,
            startY: 0,
            endX: 4,
            endY: 0,
          },
        ],
      ],
      [
        "to the left of the board",
        {
          startX: 0,
          startY: 0,
          endX: 4,
          endY: 0,
        },
        {
          size: 3,
          orientation: SHIP_ORIENTATION.HORIZONTAL,
        },
        0,
        {
          startX: 0,
          startY: 0,
          endX: 2,
          endY: 0,
          size: 3,
          orientation: SHIP_ORIENTATION.HORIZONTAL,
        },
        [
          {
            startX: 3,
            startY: 0,
            endX: 4,
            endY: 0,
          },
        ],
      ],
      [
        "to the right of the board",
        {
          startX: 0,
          startY: 0,
          endX: 4,
          endY: 0,
        },
        {
          size: 3,
          orientation: SHIP_ORIENTATION.HORIZONTAL,
        },
        2,
        {
          startX: 2,
          startY: 0,
          endX: 4,
          endY: 0,
          size: 3,
          orientation: SHIP_ORIENTATION.HORIZONTAL,
        },
        [
          {
            startX: 0,
            startY: 0,
            endX: 1,
            endY: 0,
          },
        ],
      ],
    ]).it(
      "mocked out randomiser, usecase: %s",
      (_, board, ship, mockedRandom, expectedShip, expectedSplits) => {
        // given
        const mathSpy = jest.spyOn(Math, "random");
        mathSpy.mockReturnValueOnce(mockedRandom);

        // when
        const result = placeAndSplitBoard(board, ship);

        // then
        expect(result.initialBoard).toBe(board);

        expect(result.ship).toEqual(expectedShip);

        expect(result.splitBoards).toEqual(expectedSplits);

        mathSpy.mockRestore();
      }
    );
  });

  describe("placing a ship in a board", () => {
    each([
      [
        "horizontal ship in the middle of a board",
        {
          startX: 0,
          startY: 0,
          endX: 3,
          endY: 3,
        },
        {
          size: 2,
          orientation: SHIP_ORIENTATION.HORIZONTAL,
        },
        [
          1, // random 1st coord axis
          0.5, // random 2nd coord axis
        ],
        {
          startX: 1,
          startY: 1,
          endX: 2,
          endY: 1,
          size: 2,
          orientation: SHIP_ORIENTATION.HORIZONTAL,
        },
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
        "vertical ship in the middle of a board",
        {
          startX: 0,
          startY: 0,
          endX: 3,
          endY: 3,
        },
        {
          size: 2,
          orientation: SHIP_ORIENTATION.VERTICAL,
        },
        [
          1, // random 1st coord axis
          0.5, // random 2nd coord axis
        ],
        {
          startX: 1,
          startY: 1,
          endX: 1,
          endY: 2,
          size: 2,
          orientation: SHIP_ORIENTATION.VERTICAL,
        },
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
            endY: 2,
          },
          {
            startX: 2,
            startY: 1,
            endX: 3,
            endY: 2,
          },
          {
            startX: 0,
            startY: 3,
            endX: 3,
            endY: 3,
          },
        ],
      ],
    ]).it(
      "mocked out randomiser, usecase: %s",
      (_, board, ship, mockedRandoms, expectedShip, expectedSplits) => {
        // given
        const mathSpy = jest.spyOn(Math, "random");
        mathSpy
          .mockReturnValueOnce(mockedRandoms[0])
          .mockReturnValueOnce(mockedRandoms[1]);

        // when
        const result = placeAndSplitBoard(board, ship);

        // then
        expect(result.initialBoard).toBe(board);

        expect(result.ship).toEqual(expectedShip);

        expect(result.splitBoards).toEqual(expectedSplits);

        mathSpy.mockRestore();
      }
    );
  });
});

describe("placing a ship on a board", () => {
  each([
    [
      [[SQUARE_TYPES.FREE.id, SQUARE_TYPES.FREE.id]],
      {
        size: 2,
        startX: 0,
        startY: 0,
        endX: 1,
        endY: 0,
        orientation: SHIP_ORIENTATION.HORIZONTAL,
        symbol: "S",
        name: "ship",
      },
      [["S", "S"]],
    ],
    [
      [[SQUARE_TYPES.FREE.id], [SQUARE_TYPES.FREE.id]],
      {
        size: 2,
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 1,
        orientation: SHIP_ORIENTATION.VERTICAL,
        symbol: "S",
        name: "ship",
      },
      [["S"], ["S"]],
    ],
    [
      [
        [
          SQUARE_TYPES.FREE.id,
          SQUARE_TYPES.FREE.id,
          SQUARE_TYPES.FREE.id,
          SQUARE_TYPES.FREE.id,
        ],
      ],
      {
        size: 2,
        startX: 1,
        startY: 0,
        endX: 2,
        endY: 0,
        orientation: SHIP_ORIENTATION.HORIZONTAL,
        symbol: "S",
        name: "ship",
      },
      [[SQUARE_TYPES.FREE.id, "S", "S", SQUARE_TYPES.FREE.id]],
    ],
    [
      [
        [SQUARE_TYPES.FREE.id],
        [SQUARE_TYPES.FREE.id],
        [SQUARE_TYPES.FREE.id],
        [SQUARE_TYPES.FREE.id],
      ],
      {
        size: 2,
        startX: 0,
        startY: 1,
        endX: 0,
        endY: 2,
        orientation: SHIP_ORIENTATION.VERTICAL,
        symbol: "S",
        name: "ship",
      },
      [[SQUARE_TYPES.FREE.id], ["S"], ["S"], [SQUARE_TYPES.FREE.id]],
    ],
    [
      [
        [SQUARE_TYPES.FREE.id, SQUARE_TYPES.FREE.id, SQUARE_TYPES.FREE.id],
        [SQUARE_TYPES.FREE.id, SQUARE_TYPES.FREE.id, SQUARE_TYPES.FREE.id],
        [SQUARE_TYPES.FREE.id, SQUARE_TYPES.FREE.id, SQUARE_TYPES.FREE.id],
        [SQUARE_TYPES.FREE.id, SQUARE_TYPES.FREE.id, SQUARE_TYPES.FREE.id],
      ],
      {
        size: 2,
        startX: 1,
        startY: 1,
        endX: 1,
        endY: 2,
        orientation: SHIP_ORIENTATION.VERTICAL,
        symbol: "S",
        name: "ship",
      },
      [
        [SQUARE_TYPES.FREE.id, SQUARE_TYPES.FREE.id, SQUARE_TYPES.FREE.id],
        [SQUARE_TYPES.FREE.id, "S", SQUARE_TYPES.FREE.id],
        [SQUARE_TYPES.FREE.id, "S", SQUARE_TYPES.FREE.id],
        [SQUARE_TYPES.FREE.id, SQUARE_TYPES.FREE.id, SQUARE_TYPES.FREE.id],
      ],
    ],
  ]).it("horizontal placement test", (board, ship, expectedBoard) => {
    const newBoard = placeShipOnBoard(board, ship);
    // console.log(newBoard);
    expect(newBoard).toEqual(expectedBoard);
  });
});

describe("board initialisation tests", () => {
  each([
    [
      {
        startX: 0,
        startY: 0,
        endX: 4,
        endY: 4,
      },
      [
        {
          ...Ships.Carrier,
          orientation: SHIP_ORIENTATION.HORIZONTAL,
          startX: 0,
          startY: 1,
          endX: 4,
          endY: 1,
        },
      ],
      [
        ["O", "O", "O", "O", "O"],
        ["A", "A", "A", "A", "A"],
        ["O", "O", "O", "O", "O"],
        ["O", "O", "O", "O", "O"],
        ["O", "O", "O", "O", "O"],
      ],
    ],
    [
      {
        startX: 0,
        startY: 0,
        endX: 4,
        endY: 4,
      },
      [
        {
          ...Ships.Carrier,
          orientation: SHIP_ORIENTATION.HORIZONTAL,
          startX: 0,
          startY: 1,
          endX: 4,
          endY: 1,
        },
        {
          ...Ships.Destroyer,
          orientation: SHIP_ORIENTATION.VERTICAL,
          startX: 1,
          startY: 2,
          endX: 1,
          endY: 3,
        },
        {
          ...Ships.Submarine,
          orientation: SHIP_ORIENTATION.VERTICAL,
          startX: 3,
          startY: 2,
          endX: 3,
          endY: 4,
        },
      ],
      [
        ["O", "O", "O", "O", "O"],
        ["A", "A", "A", "A", "A"],
        ["O", "D", "O", "S", "O"],
        ["O", "D", "O", "S", "O"],
        ["O", "O", "O", "S", "O"],
      ],
    ],
  ]).it(
    "generates a generic 5 by 5 board",
    (initialBoard, initialShips, expectedFinalBoard) => {
      const finalBoardState = generateBoardState(initialBoard, initialShips);
      expect(finalBoardState).toBeDefined();
      expect(finalBoardState.board).toEqual(expectedFinalBoard);
      expect(finalBoardState.ships.length).toBe(initialShips.length);
    }
  );
});
