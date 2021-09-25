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
  clickCallback
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
      const id = JSON.stringify(coords.x + "-" + coords.y);

      gameBoard[y][x] = (
        <Square
          key={id}
          id={id}
          coords={coords}
          value={squareValue}
          isClickable={clickCallback !== undefined}
          processClick={() =>
            clickCallback !== undefined ? clickCallback(coords) : {}
          }
        />
      );
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
      (coords) => boardState.board[coords.y][coords.x]
    );
  }

  return (
    <>
      {board.length === 0 ? (
        <Skeleton height="100" width="100" />
      ) : (
        <>
          <div className="board-title">{boardTitle}</div>
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

function ViewableBoard({ boardState, boardTitle, seenBoard, ...props }) {
  const board = [];
  let boardStyle = {};

  if (boardState.board !== undefined) {
    buildBoard(
      boardStyle,
      board,
      boardState.dimensions,
      (coords) => {
        if (
          seenBoard.find(
            (coord) => coord.x === coords.x && coord.y === coords.y
          ) !== undefined
        ) {
          return boardState.board[coords.y][coords.x];
        } else {
          return SQUARE_TYPES.UNKNOWN.id;
        }
      },
      (coords) => {
        props.onClick(coords);
      }
    );
  }

  return (
    <>
      {board.length === 0 ? (
        <Skeleton height="100" width="100" />
      ) : (
        <>
          <div className="board-title">{boardTitle}</div>
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
  seenBoard: PropTypes.array,
};

export { PlayerBoard, ViewableBoard };
