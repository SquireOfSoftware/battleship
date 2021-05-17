import React from 'react';
import Square from './Square';

import { useDispatch, useSelector } from 'react-redux'
import { addShip } from '../../actions/setupActions'

const Grid = () => {
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

  for(let y = 0; y < boardSize.y; y++) {
      board[y] = [];
      for(let x = 0; x < boardSize.x; x++) {
          let id = "x:" + x + ",y:" + y;
          let coords = {
              x,
              y
          };

          board[y][x] = <Square
              key={id}
              id={id}
              coords={coords}
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
