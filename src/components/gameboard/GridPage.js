import React, { useEffect } from "react";
import Square from "./Square";
import { connect } from "react-redux";
import decideWhoGoesFirst from "../../redux/actions/setupActions";
import {
  loadEnemyBoard,
  loadPlayerBoard,
} from "../../redux/actions/boardActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Skeleton from "react-loading-skeleton";

const GridPage = ({ playerBoard = {}, enemyBoard = {}, actions, ...props }) => {
  useEffect(() => {
    actions.flipCoin();
    actions.loadPlayerBoard();
    actions.loadEnemyBoard();
  }, []);

  console.log({ playerBoard, enemyBoard, props });

  function buildGrid(boardStyle, board, boardState, dimensions) {
    const boardWidth = dimensions.width;
    const boardHeight = dimensions.height;

    boardStyle["gridTemplateColumns"] = "repeat(" + boardWidth + ", 25px)";
    boardStyle["gridTemplateRows"] = "repeat(" + boardHeight + ", 25px)";

    for (let y = 0; y < boardHeight; y++) {
      board[y] = [];
      for (let x = 0; x < boardWidth; x++) {
        let id = "x:" + x + ",y:" + y;
        let coords = {
          x,
          y,
        };

        board[y][x] = (
          <Square
            key={id}
            id={id}
            coords={coords}
            value={boardState[y][x]}
            processClick={() =>
              console.log(`hello im ${JSON.stringify(coords)}`)
            }
          />
        );
      }
    }
    console.log({ board });
  }

  const playerGameBoard = [];
  let playerBoardStyle = {};

  if (playerBoard.board !== undefined) {
    console.log("trying to build a board");
    buildGrid(
      playerBoardStyle,
      playerGameBoard,
      playerBoard.board,
      playerBoard.dimensions
    );
  }

  const enemyGameBoard = [];
  let enemyGameBoardStyle = {};
  if (enemyBoard.board !== undefined) {
    buildGrid(
      enemyGameBoardStyle,
      enemyGameBoard,
      enemyBoard.board,
      enemyBoard.dimensions
    );
  }

  return (
    <>
      {enemyGameBoard.length === 0 ? (
        <Skeleton height="100" width="100" />
      ) : (
        <>
          <div>enemyBoard</div>
          <div className="gameboard" style={enemyGameBoardStyle}>
            {enemyGameBoard}
          </div>
        </>
      )}
      {playerGameBoard.length === 0 ? (
        <Skeleton height="100" width="100" />
      ) : (
        <>
          <div>Player board</div>
          <div className="gameboard" style={playerBoardStyle}>
            {playerGameBoard}
          </div>
        </>
      )}
    </>
  );
};

GridPage.propTypes = {
  playerBoard: PropTypes.shape({
    board: PropTypes.array,
    ships: PropTypes.array,
    dimensions: PropTypes.object,
  }),
  enemyBoard: PropTypes.shape({
    board: PropTypes.array,
    ships: PropTypes.array,
    dimensions: PropTypes.object,
  }),
  actions: PropTypes.shape({
    flipCoin: PropTypes.func.isRequired,
    loadPlayerBoard: PropTypes.func.isRequired,
    loadEnemyBoard: PropTypes.func.isRequired,
  }),
};

function mapStateToProps(state) {
  return {
    enemyBoard: state.enemyBoardState,
    playerBoard: state.playerBoardState,
    whoGoesFirst: state.turnDeterminer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      flipCoin: bindActionCreators(decideWhoGoesFirst, dispatch),
      loadPlayerBoard: bindActionCreators(loadPlayerBoard, dispatch),
      loadEnemyBoard: bindActionCreators(loadEnemyBoard, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GridPage);
