import React from "react";
import Skeleton from "react-loading-skeleton";
import Square from "./Square";

import PropTypes from "prop-types";
import { SQUARE_TYPES } from "../SquareTypes";

function PlayerBoard({ boardState, boardTitle }) {
  function buildGrid(boardStyle, gameBoard, boardState) {
    const boardWidth = boardState.dimensions.width;
    const boardHeight = boardState.dimensions.height;

    boardStyle["gridTemplateColumns"] = "repeat(" + boardWidth + ", 25px)";
    boardStyle["gridTemplateRows"] = "repeat(" + boardHeight + ", 25px)";

    for (let y = 0; y < boardHeight; y++) {
      gameBoard[y] = [];
      for (let x = 0; x < boardWidth; x++) {
        let id = "x:" + x + ",y:" + y;
        let coords = {
          x,
          y,
        };

        const squareValue = boardState.board[y][x];

        gameBoard[y][x] = (
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
    }
  }

  const board = [];
  let boardStyle = {};

  if (boardState.board !== undefined) {
    buildGrid(boardStyle, board, boardState);
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

PlayerBoard.PropTypes = {
  boardState: PropTypes.shape({
    dimensions: PropTypes.object,
    board: PropTypes.array,
    boardType: PropTypes.string,
  }),
  boardTitle: PropTypes.string.isRequired,
};

function ViewableBoard({ boardState, boardTitle, ...props }) {
  function buildGrid(boardStyle, gameBoard, boardState) {
    const boardWidth = boardState.dimensions.width;
    const boardHeight = boardState.dimensions.height;

    boardStyle["gridTemplateColumns"] = "repeat(" + boardWidth + ", 25px)";
    boardStyle["gridTemplateRows"] = "repeat(" + boardHeight + ", 25px)";

    for (let y = 0; y < boardHeight; y++) {
      gameBoard[y] = [];
      for (let x = 0; x < boardWidth; x++) {
        let id = "x:" + x + ",y:" + y;
        let coords = {
          x,
          y,
        };

        const squareValue = SQUARE_TYPES.UNKNOWN.id;

        gameBoard[y][x] = (
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
    }
  }

  const board = [];
  let boardStyle = {};

  if (boardState.board !== undefined) {
    buildGrid(boardStyle, board, boardState);
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
  boardTitle: PropTypes.string.isRequired,
};

export { PlayerBoard, ViewableBoard };
