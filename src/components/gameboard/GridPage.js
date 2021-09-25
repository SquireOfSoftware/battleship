import React, { useEffect } from "react";
import { connect } from "react-redux";
import decideWhoGoesFirst from "../../redux/actions/setupActions";
import {
  loadEnemyBoard,
  loadPlayerBoard,
  attackEnemy,
  restartBoards,
} from "../../redux/actions/boardActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { PlayerBoard, ViewableBoard } from "./Board";
import RestartBoardButton from "./RestartBoardButton";

const GridPage = ({
  playerBoard = {},
  enemyBoard = {},
  actions,
  seenBoard = [],
  ...props
}) => {
  useEffect(() => {
    actions.flipCoin();
    actions.loadPlayerBoard();
    actions.loadEnemyBoard();
    console.log({ props });
  }, []);

  // actually we want to display the seen squares from the player
  // and every click on the board maps to the enemy board to check if there is a hit

  function clickHandler(coord) {
    if (
      seenBoard.some((seenEvent) => {
        return seenEvent.x === coord.x && seenEvent.y === coord.y;
      })
    ) {
      alert("you already attacked this square");
    } else {
      actions.attackEnemy(coord, enemyBoard.board, enemyBoard.ships);
    }
  }

  function reloadBoard(event) {
    event.preventDefault();

    actions.restartBoards();
  }

  return (
    <>
      <ViewableBoard
        boardState={enemyBoard}
        boardTitle="Enemy Board"
        onClick={clickHandler}
        seenBoard={seenBoard}
      />
      <PlayerBoard boardState={playerBoard} boardTitle="Player Board" />
      <RestartBoardButton reloadCallback={reloadBoard} />
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
    restartBoards: PropTypes.func.isRequired,
    attackEnemy: PropTypes.func.isRequired,
  }),
  seenBoard: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    enemyBoard: state.enemyBoardState,
    playerBoard: state.playerBoardState,
    whoGoesFirst: state.turnDeterminer,
    seenBoard: state.seenEnemyBoard,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      flipCoin: bindActionCreators(decideWhoGoesFirst, dispatch),
      loadPlayerBoard: bindActionCreators(loadPlayerBoard, dispatch),
      loadEnemyBoard: bindActionCreators(loadEnemyBoard, dispatch),
      attackEnemy: bindActionCreators(attackEnemy, dispatch),
      restartBoards: bindActionCreators(restartBoards, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GridPage);
