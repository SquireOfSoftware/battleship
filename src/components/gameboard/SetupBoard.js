import React, { Component } from 'react';
import Grid from '../gameboard/Grid.js';

class SetupBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shipPlacements: []
        };
    }

    handleClick = (e) => {

    }

    getValue = (coord) => {

    }

    render() {
        return (
            <div>
                <Grid handleClick={this.handleClick}
                      boardSize={this.props.boardSize}
                      getValue={this.getValue}
               />
            </div>
        )
    }
}

SetupBoard.defaultProps = {
              boardSize: {
                  x: 25,
                  y: 10
              }
          }

export default SetupBoard;