import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./History.css";

export const History = ({ history, setState, setHistory }) => {
  // const url = "localhost:8080/math/expamples";
  const arr = ["2+2", "44/2", "35*8", "40+1"];

  const getMathExpressions = async () => {
    // const request = await fetch(url);
    // const response = await response.json();
    // response.forEach((item) => {
    //   setHistory((prev) => [...prev, [item + "=", eval(item).toString()]]);
    // });
    arr.forEach((item) => {
      setHistory((prev) => [...prev, [item + "=", eval(item).toString()]]);
    });
  };

  return (
    <div className="history">
      <div className="header">History</div>
      <div className="history__container">
        {history.map((item) => (
          <div className="history__item" key={uuidv4()} onClick={() => setState(item[1])}>
            <div className="history__item__expression">{item[0]}</div>
            <div className="history__item__result">{item[1]}</div>
          </div>
        ))}
      </div>
      <button className="history__button" onClick={getMathExpressions}>
        Get expressions
      </button>
    </div>
  );
};
