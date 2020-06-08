import React, { Component } from 'react';
import Grid from './Grid.js';
import Ships from '../ships/Ships.js';
import DeploymentCounter from './DeploymentCounter.js'

class SetupBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shipPlacements: [],
            selectedShipType: undefined,
            squaresLeft: 0,
            clickedSquares: []
        };
    }

    handleGridClick = (e) => {
        if (this.canClickGrid()) {

        }
    }

    getValue = (coords) => {

    }

    canClickGrid = () => {
        return this.state.selectedShipType !== undefined &&
            this.state.squaresLeft > 0 &&
            this.state.squaresLeft <= this.state.selectedShipType;
    }

    handleRadioSelection = (shipType, squaresLeft) => {
        console.log(shipType);
        this.setState({
            selectedShipType: shipType,
            squaresLeft: squaresLeft
        });
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
                                        handleRadioSelection={this.handleRadioSelection}
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

export default SetupBoard;