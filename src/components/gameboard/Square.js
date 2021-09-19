import React from 'react';
import { useSelector } from 'react-redux'

const Square = (props) => {
  const ships = useSelector(state => state.setupBoard.ships);
  const obstacles = useSelector(state => state.setupBoard.obstacles);
  const value = useSelector(state => state.setupBoard.board[props.coords.x][props.coords.y].id)

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

  return (
      <div
          className="default-square-element"
          onClick={() => props.processClick(props.coords)}
          onDrop={(event) => {
                  props.processDrop(event);
                  event.stopPropagation();
                  event.preventDefault();
              }
          }
          onDragOver={(event) => {
              event.stopPropagation();
              event.preventDefault();
          }}
      >
          {value}
      </div>
  )
}

export default Square;