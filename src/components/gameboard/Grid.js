import React, { Component } from 'react';
import Square from './Square.js';

class Grid extends Component {
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
                let coords = {
                    x,
                    y
                };

                let value = this.props.getValue(coords);

                board[y][x] = <Square
                    key={id}
                    id={id}
                    coords={coords}
                    value={value}
                    processClick={this.props.handleClick}
                    processDrop={this.props.handleDrop}
            />;
            }
        }

        return (
           <div className="gameboard" style={boardStyle}>
               {board}
           </div>
        )
    }
}

export default Grid;