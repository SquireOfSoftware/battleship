import React, { Component } from 'react';
import Grid from './Grid.js';
import Ships from '../ships/Ships.js';
import PropTypes from 'prop-types';
import BoardType from './BoardType.js';

class AttackBoard extends Component {
    constructor(props) {
        super(props);

        console.log(props);

        this.state = {
            clickedSquares: []
        }
    }

    handleClick = (e) => {
        if (this.props.isClickable &&
            this.props.canAttack(this.props.boardType)) {
            this.processAttack(e);
        }
    }

    processAttack = (square) => {
        let clickedSquares = this.state.clickedSquares;
        if (!this.existsInClickedSquares(square)) {
            clickedSquares.push(square);
            this.setState({
                clickedSquares
            });
            this.props.endTurn(this.props.boardType);
        }
    }

    existsInClickedSquares = (coord) => {
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
        return (
           <div>
               <div className='title'>{this.props.boardType} board</div>
               <Grid handleClick={this.handleClick}
                     boardSize={this.props.boardSize}
                     getValue={this.getValue}
               />
           </div>
        )
    }
}

AttackBoard.propTypes = {
    boardSize: PropTypes.object.isRequired,
    ships: PropTypes.array
}

AttackBoard.defaultProps = {
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
    ],
    boardType: BoardType.Player,
    isClickable: false
}


export default AttackBoard;