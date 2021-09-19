import React, { useEffect } from "react";
import Square from "./Square";
import { connect } from "react-redux";
import decideWhoGoesFirst from "../../redux/actions/setupActions";
import {
  loadEnemyBoard,
  loadPlayerBoard,
} from "../../redux/actions/boardActions";

import { bindActionCreators } from "redux";

const GridPage = (props) => {
  useEffect(() => {
    props.actions.flipCoin();
    props.actions.loadPlayerBoard();
    props.actions.loadEnemyBoard();
    console.log({props});
  }, []);

  function buildGrid() {
    boardStyle["gridTemplateColumns"] =
      "repeat(" + props.playerBoard.endX + ", 25px)";
    boardStyle["gridTemplateRows"] =
      "repeat(" + props.playerBoard.endY + ", 25px)";

    for (let y = 0; y < props.playerBoard.endY; y++) {
      board[y] = [];
      for (let x = 0; x < props.playerBoard.endX; x++) {
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
            processClick={() => console.log("hello")}
          />
        );
      }
    }
  }

  const board = [];
  let boardStyle = {};

  return (
    <div className="gameboard" style={boardStyle}>
      {board}
    </div>
  );
};

function mapStateToProps(state) {
  console.log({ state });
  return {
    enemyBoard: state.enemyBoard,
    playerBoard: state.playerBoard,
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
