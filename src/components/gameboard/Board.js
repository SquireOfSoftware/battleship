import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from './Row.js';
import Square from './Square.js';

class Board extends Component {
    render() {
        let boardSize = this.props.boardSize;
        const board = [];
        let boardStyle = {};

        boardStyle["gridTemplateColumns"] = "repeat(" + boardSize.x + ", 25px)";
        boardStyle["gridTemplateRows"] = "repeat(" + boardSize.y + ", 25px)";

        for(let y = 0; y < boardSize.y; y++) {
            board[y] = [];
            for(let x = 0; x < boardSize.x; x++) {
                let id = "x:" + x + ",y:" + y;
                board[y][x] = <Square key={id} id={id}/>;
            }   
        }

        return (
           <div className="gameboard" style={boardStyle}>
               {board}
           </div>
        )
    }
}

const boardType = {
    enemy: "enemy",
    player: "player"
}

Board.types = boardType

Board.propTypes = {
    boardSize: PropTypes.object,
    type: PropTypes.oneOf(Object.keys(boardType))
}

Board.defaultProps = {
    boardSize: {
        x: 25,
        y: 10
    }
}

export default Board;