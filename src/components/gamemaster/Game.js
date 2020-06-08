import React, { Component } from 'react';
import Board from '../gameboard/Board.js';
import BoardType from '../gameboard/BoardType.js';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
        whosTurn: BoardType.Player
    };
  }

  endTurn = (incomingBoardType) => {
    let nextTurn;
    switch(incomingBoardType) {
      case BoardType.Player:
         console.log("ending enemy turn!");
         nextTurn = BoardType.Player;
         break;
      case BoardType.Enemy:
         console.log("ending player turn");
         nextTurn = BoardType.Enemy;
         break;
      default:
         nextTurn = BoardType.NoOne;
    }

    this.setState({
      whosTurn: nextTurn
    });
    console.log(this.state);
  }

  /*
  This checks the incoming source of the event, different players should
  be able to send "seemingly" contradictory events. A player is able to click
  on the enemy board hence sending an event from the enemy board and vice versa
  for the enemy.
  */
  canAttack = (boardEventSource) => {
    switch(boardEventSource) {
        case BoardType.Enemy:
            return this.state.whosTurn === BoardType.Player;
        case BoardType.Player:
            return this.state.whosTurn === BoardType.Enemy;
        default:
            return false;
    }
  }

  render() {
    let enemyBoard = <Board boardType={BoardType.Enemy}
                            endTurn={this.endTurn}
                            canAttack={this.canAttack}
                            isClickable='true'
                     />
    let playerBoard = <Board boardType={BoardType.Player}
                            endTurn={this.endTurn}
                            canAttack={this.canAttack}
                            isClickable='true'
                     />

    return (
      <div>
        {enemyBoard}
        {playerBoard}
        <div className="turn-order">The current turn is: {this.state.whosTurn}</div>
      </div>
    )
  }
}

export default Game;
