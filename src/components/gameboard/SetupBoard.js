import React from 'react';
import Grid from './Grid.js';
import {Ships} from '../ShipTypes';
import DeploymentCounter from './DeploymentCounter.js'

const SetupBoard = () => {
  const shipArray = [
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
          <Grid />
          <div>
              {radioButtons}
          </div>
          <div className="setup-instructions">
              Tip: Tap the above check boxes to place your ships
          </div>
      </div>
  )
}

export default SetupBoard;