import React from "react";

const Square = (props) => {
  return (
    <div
      className="default-square-element"
      onClick={() => props.processClick(props.coords)}
      onDrop={(event) => {
        props.processDrop(event);
        event.stopPropagation();
        event.preventDefault();
      }}
      onDragOver={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
    >
      {props.value}
    </div>
  );
};

export default Square;
