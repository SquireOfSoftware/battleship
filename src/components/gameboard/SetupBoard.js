import React, { Component } from 'react';
import Grid from './Grid.js';
import Ships from '../ships/Ships.js';
import DeploymentCounter from './DeploymentCounter.js'

import { connect } from 'react-redux'
import { addShip, setupBoardSize } from '../../actions/setupActions'

class SetupBoard extends Component {
    constructor(props) {
        super(props);
        this.props.setupBoardSize(props.boardSize);
    }

    getValue = (coords) => {
      return 'X';
    }

    handleMouseDrop = (event) => {
        let shipReference = JSON.parse(event.dataTransfer.getData("shipReference"));
        shipReference.dragEndCoords = {
          x: event.clientX,
          y: event.clientY
        };

        // figure out which square this is
        // place the ship around it
        this.props.addShip(shipReference);
    }

    handleGridClick = (event) => {
      console.log(event);
    }

    render() {
        let shipArray = [
            Ships.Carrier,
            Ships.Battleship,
            Ships.Cruiser,
            Ships.Submarine,
            Ships.Destroyer
        ];

        let radioButtons = [];

        shipArray.forEach(
            (shipReference, index) => {
                let radioButton = <DeploymentCounter key={index}
                                        id={index}
                                        reference={shipReference}
                                        link="setupBoard"
                                  />
                radioButtons.push(radioButton);
            }
        );

        return (
            <div>
                <div className="setup-instructions">
                    Deploy your ships for naval warfare
                </div>
                <Grid handleClick={this.handleGridClick}
                      boardSize={this.props.boardSize}
                      getValue={this.getValue}
                      handleDrop={this.handleMouseDrop}
                />
                <div>
                    {radioButtons}
                </div>
                <div className="setup-instructions">
                    Tip: Tap the above check boxes to place your ships
                </div>
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

const mapStateToProps = state => ({
  ships: state.ships,
  boardSize: state.boardSize
})

export default connect(mapStateToProps, {addShip, setupBoardSize})(SetupBoard);