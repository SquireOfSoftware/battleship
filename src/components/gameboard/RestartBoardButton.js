import React from "react";

export default function RestartBoardButton(props) {
  return (
    <form onSubmit={props.reloadCallback}>
      <button type="submit">Restart</button>
    </form>
  );
}
