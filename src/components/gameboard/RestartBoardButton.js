import React from "react";
import PropTypes from "prop-types";
function RestartBoardButton(props) {
  return (
    <form className="restart-board-btn" onSubmit={props.reloadCallback}>
      <button type="submit">Restart</button>
    </form>
  );
}

RestartBoardButton.propTypes = {
  reloadCallback: PropTypes.func.isRequired,
};

export default RestartBoardButton;
