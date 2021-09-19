import { initialState } from "./initialState";

const turnReducer = (state = initialState.whoGoesFirst, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default turnReducer;
