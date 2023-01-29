import { useState } from "react";
import { Calc } from "./Calc";
import { History } from "./History";
import "./main.css";

export const App = () => {
  const [state, setState] = useState("0");

  const [history, setHistory] = useState([]);

  return (
    <>
      <Calc setHistory={setHistory} state={state} setState={setState} />
      <History history={history} setState={setState} setHistory={setHistory} />
    </>
  );
};
