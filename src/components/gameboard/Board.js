import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from './Row.js';
import Square from './Square.js';

class Board extends Component {
    render() {
        let boardSize = this.props.boardSize;
        const board = [];
        for(let y = 0; y < boardSize.y; y++) {
            board.push(<Row key={y} id={y} rowWidth={boardSize.x}/>);
        }

        // for(let y = 0; y < boardSize.y; y++) {
        //     for(let x = 0; x < boardSize.x; x++) {
        //         let id = "x:" + x + ",y:" + y;
        //         board.push(<Square key={id} id={id}/>);
        //     }   
        // }

        return (
           <div style={boardStyle}>
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
        y: 9
    }
}

const boardStyle = {
    display: 'flex',
    flexDirection: 'column'
}

export default Board;