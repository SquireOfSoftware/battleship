import React from "react";
import PropTypes from "prop-types";

const Square = (props) => {
  return (
    <div
      className="default-square-element"
      onClick={() => props.processClick(props.coords)}
    >
      {props.value}
    </div>
  );
};

Square.PropTypes = {
  processClick: PropTypes.func.isRequired,
  coords: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
};

export default Square;
