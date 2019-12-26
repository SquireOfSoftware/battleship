import React, { Component } from 'react';
import Square from './Square.js';
import Ships from '../ships/Ships.js';
// import Ship from '../ships/Ship.js';
import PropTypes from 'prop-types';

class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clickedSquares: []
        }
    }

    handleClick = (e) => {
        let clickedSquares = this.state.clickedSquares;
        // console.log(clickedSquares);
        clickedSquares.push(e);
        this.setState({
            clickedSquares
        })
    }

    existsInClickedSquares = (coord) => {
        // return this.state.clickedSquares[coord.x, coord.y] !== undefined;
        return this.state.clickedSquares.filter(
            square => square.x === coord.x &&
                square.y === coord.y)
            .length > 0;
    }

    existsOnShipPositions = (coord) => {
        return this.props.ships.flatMap(ship =>  ship.coords)
            .filter(shipCoord => shipCoord.x === coord.x &&
                shipCoord.y === coord.y)
            .length > 0;
    }

    getValue = (coord) => {
        let value = "";
        if (this.existsInClickedSquares(coord)) {
            if (this.existsOnShipPositions(coord)) {
                value = "S";
            } else {
                value = "X";
            }
        }
        return value;
    }

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

                let value = this.getValue(coords);

                board[y][x] = <Square 
                    key={id}
                    id={id}
                    coords={coords} 
                    value={value}
                    processClick={this.handleClick}
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

Board.propTypes = {
    boardSize: PropTypes.object.isRequired,
    ships: PropTypes.array
}

Board.defaultProps = {
    boardSize: {
        x: 25,
        y: 10
    },
    ships: [
        {
            name: Ships.Destroyer,
            coords: [
                {x: 1, y: 2},
                {x: 2, y: 2},
            ]
        },
        {
            name: Ships.Destroyer,
            coords: [
                {x: 0, y: 0},
                {x: 0, y: 1},
            ]
        }
    ]
}

export default Board;