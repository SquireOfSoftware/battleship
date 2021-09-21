import React, { useEffect } from "react";
import { connect } from "react-redux";
import decideWhoGoesFirst from "../../redux/actions/setupActions";
import {
  loadEnemyBoard,
  loadPlayerBoard,
  attackEnemy,
} from "../../redux/actions/boardActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { PlayerBoard, ViewableBoard } from "./Board";

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

  console.log(seenBoard);

  // actually we want to display the seen squares from the player
  // and every click on the board maps to the enemy board to check if there is a hit

  function clickHandler(event) {
    if (
      seenBoard.some((seenEvent) => {
        return seenEvent.x === event.x && seenEvent.y === event.y;
      })
    ) {
      alert("you already attacked this square");
    } else {
      actions.attackEnemy(event);
    }
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
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GridPage);