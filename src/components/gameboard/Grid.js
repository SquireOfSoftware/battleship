import React from 'react';
import Square from './Square.js';

import { useDispatch, useSelector } from 'react-redux'
import { addShip } from '../../actions/setupActions'

const Grid = () => {
  const ships = useSelector(state => state.setupBoard.ships);
  const obstacles = useSelector(state => state.setupBoard.obstacles);
  const boardSize = useSelector(state => state.setupBoard.boardSize);
  const board = [];
  let boardStyle = {};
  const dispatch = useDispatch();

  boardStyle["gridTemplateColumns"] = "repeat(" + boardSize.x + ", 25px)";
  boardStyle["gridTemplateRows"] = "repeat(" + boardSize.y + ", 25px)";

  const handleGridClick = (event) => {
    console.log(event);
  }

  let handleMouseDrop = (event) => {
    let shipReference = JSON.parse(event.dataTransfer.getData("shipReference"));
    shipReference.dragEndCoords = {
      x: event.clientX,
      y: event.clientY
    };

    // figure out which square this is
    // place the ship around it
    dispatch(addShip(shipReference));
  }

  let getValue = (coords) => {
    if (isAnObstacle(coords, obstacles)) {
      return '-';
    } else if (isAShip(coords, ships)) {
      return 'S';
    } else {
      return 'O';
    }
  }

  const isAnObstacle = (coords, obstacles) => {
    if (obstacles !== undefined){
      return obstacles.find(obstacle => {
        return coords.x === obstacle.x && coords.y === obstacle.y
      }) !== undefined;
    }
    return false;
  }

  const isAShip = (coords, ships) => {
    if (ships !== undefined) {
      return ships.find(ship => {
        return coords.x === ship.x && coords.y === ship.y
      }) !== undefined;
    }
  }

  for(let y = 0; y < boardSize.y; y++) {
      board[y] = [];
      for(let x = 0; x < boardSize.x; x++) {
          let id = "x:" + x + ",y:" + y;
          let coords = {
              x,
              y
          };

          let value;
          if (isAnObstacle(coords, obstacles)) {
            value = '-';
          } else if (isAShip(coords, ships)) {
            value = 'S';
          } else {
            value = 'O';
          }

          board[y][x] = <Square
              key={id}
              id={id}
              coords={coords}
              value={value}
              processClick={() => handleGridClick()}
              processDrop={event => handleMouseDrop(event)}
      />;
      }
  }

  return (
     <div className="gameboard" style={boardStyle}>
         {board}
     </div>
  )
}

export default Grid;
