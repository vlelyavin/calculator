import { useReducer } from "react";
import { INITIAL_STATE, mainReducer } from "./reducers/mainReducer";
import { Calc } from "./Calc";
import { History } from "./History";
import "./main.css";

export const App = () => {
  const [state, dispatch] = useReducer(mainReducer, INITIAL_STATE);

  return (
    <>
      <Calc state={state} dispatch={dispatch} />
      <History state={state} dispatch={dispatch} />
    </>
  );
};
