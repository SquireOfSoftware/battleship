import React, { Component } from 'react';
import Grid from './Grid.js';
import Ships from '../ships/Ships.js';
import DeploymentCounter from './DeploymentCounter.js'

import { connect } from 'react-redux'
import { addShip } from '../../actions/setupActions'
import initialState from '../../reducers/initialState'

class SetupBoard extends Component {
    getValue = (coords) => {
      if (this.isAnObstacle(coords)) {
        return '-';
      } else {
        return 'X';
      }
    }

    isAnObstacle = (coords) => {
      if (initialState.obstacles !== undefined){
        return initialState.obstacles.find(obstacle => {
          return coords.x === obstacle.x && coords.y === obstacle.y
        }) !== undefined;
      }
      return false;
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

const mapStateToProps = state => ({
  ships: state.ships
})

export default connect(mapStateToProps, {addShip})(SetupBoard);