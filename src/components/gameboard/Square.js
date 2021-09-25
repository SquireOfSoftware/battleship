import React from "react";
import PropTypes from "prop-types";

const Square = (props) => {
  const classNames =
    "default-square-element " + (props.isClickable ? "clickable" : "");
  return (
    <div
      className={classNames}
      onClick={() => props.processClick(props.coords)}
    >
      {props.value}
    </div>
  );
};

Square.propTypes = {
  processClick: PropTypes.func.isRequired,
  coords: PropTypes.object.isRequired,
  value: PropTypes.string,
  isClickable: PropTypes.bool.isRequired
};

export default Square;
