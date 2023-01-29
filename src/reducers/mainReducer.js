import { SET_OUTPUT_EXPRESSION, ADD_HISTORY_ITEM } from "../actions/actionTypes";

export const INITIAL_STATE = {
  outputExpression: "0",
  history: [],
};

export const mainReducer = (state, action) => {
  switch (action.type) {
    case SET_OUTPUT_EXPRESSION:
      return { ...state, outputExpression: action.payload };
    case ADD_HISTORY_ITEM:
      return { ...state, history: [...state.history, action.payload] };
    default:
      return state;
  }
};
