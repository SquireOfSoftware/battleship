import React from "react";
import Skeleton from "react-loading-skeleton";
import Square from "./Square";

import PropTypes from "prop-types";
import { SQUARE_TYPES } from "../SquareTypes";

function buildBoard(
  boardStyle,
  gameBoard,
  dimensions,
  squareValueCallback,
  generateSquareCallback
) {
  const boardWidth = dimensions.width;
  const boardHeight = dimensions.height + 1;

  boardStyle["gridTemplateColumns"] = "repeat(" + boardWidth + ", 25px)";
  boardStyle["gridTemplateRows"] = "repeat(" + boardHeight + ", 25px)";

  for (let y = 0; y < boardHeight; y++) {
    gameBoard[y] = [];
    for (let x = 0; x < boardWidth; x++) {
      let coords = {
        x,
        y,
      };

      const squareValue = squareValueCallback(coords);

      gameBoard[y][x] = generateSquareCallback(coords, squareValue);
    }
  }
}

function PlayerBoard({ boardState, boardTitle }) {
  const board = [];
  let boardStyle = {};

  if (boardState.board !== undefined) {
    buildBoard(
      boardStyle,
      board,
      boardState.dimensions,
      (coords) => boardState.board[coords.y][coords.x],
      (coords, squareValue) => {
        const id = JSON.stringify(coords.x + "-" + coords.y);
        return (
          <Square
            key={id}
            id={id}
            coords={coords}
            value={squareValue}
            processClick={() =>
              console.log(`hello im ${JSON.stringify(coords)}`)
            }
          />
        );
      }
    );
  }

  return (
    <>
      {board.length === 0 ? (
        <Skeleton height="100" width="100" />
      ) : (
        <>
          <div>{boardTitle}</div>
          <div className="gameboard" style={boardStyle}>
            {board}
          </div>
        </>
      )}
    </>
  );
}

PlayerBoard.propTypes = {
  boardState: PropTypes.shape({
    dimensions: PropTypes.object,
    board: PropTypes.array,
    boardType: PropTypes.string,
  }),
  boardTitle: PropTypes.string.isRequired,
};

function ViewableBoard({ boardState, boardTitle, ...props }) {
  const board = [];
  let boardStyle = {};

  if (boardState.board !== undefined) {
    buildBoard(
      boardStyle,
      board,
      boardState.dimensions,
      (_) => {
        return SQUARE_TYPES.UNKNOWN.id;
      },
      (coords, squareValue) => {
        const id = JSON.stringify(coords.x + "-" + coords.y);
        return (
          <Square
            key={id}
            id={id}
            coords={coords}
            value={squareValue}
            processClick={(clickEvent) => {
              props.onClick(clickEvent);
            }}
          />
        );
      }
    );
  }

  return (
    <>
      {board.length === 0 ? (
        <Skeleton height="100" width="100" />
      ) : (
        <>
          <div>{boardTitle}</div>
          <div className="gameboard" style={boardStyle}>
            {board}
          </div>
        </>
      )}
    </>
  );
}

ViewableBoard.propTypes = {
  boardState: PropTypes.shape({
    dimensions: PropTypes.object,
    board: PropTypes.array,
    boardType: PropTypes.string,
  }),
  boardTitle: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export { PlayerBoard, ViewableBoard };
