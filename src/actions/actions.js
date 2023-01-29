import { ADD_HISTORY_ITEM, SET_OUTPUT_EXPRESSION } from "./actionTypes";

export const setOutputExpression = (output) => ({
  type: SET_OUTPUT_EXPRESSION,
  payload: output,
});

export const addHistoryItem = (item) => ({
  type: ADD_HISTORY_ITEM,
  payload: item,
});
