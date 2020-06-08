import React, { Component } from 'react';
import Board from '../gameboard/Board.js';
import BoardType from '../gameboard/BoardType.js';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
        whosTurn: BoardType.Player
    };
    this.getNextTurn = this.getNextTurn.bind(this);
  }

  getNextTurn(event) {
    console.log(event);
    let nextTurn = BoardType.NoOne;
    switch(event) {
      case BoardType.Player:
         console.log("hello player!");
         nextTurn = BoardType.Enemy;
         break;
      case BoardType.Enemy:
         console.log("hello enemy!");
         nextTurn = BoardType.Player;
         break;
    }

    this.setState({
      whosTurn: nextTurn
    })
  }

  render() {
    let enemyBoard = <Board boardType={BoardType.Enemy}
                            getNextTurn={this.getNextTurn}
                     />
    let playerBoard = <Board boardType={BoardType.Player}
                            getNextTurn={this.getNextTurn}
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
