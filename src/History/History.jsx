import { v4 as uuidv4 } from "uuid";
import { addHistoryItem, setOutputExpression } from "../actions/actions";
import "./History.css";

export const History = ({ state, dispatch }) => {
  // const url = "localhost:8080/math/expamples";
  const arr = ["2+2", "44/2", "35*8", "40+1"];

  const getMathExpressions = async () => {
    // const request = await fetch(url);
    // const response = await response.json();
    // response.forEach((item) => {
    //   setHistory((prev) => [...prev, [item + "=", eval(item).toString()]]);
    // });
    arr.forEach((item) => {
      dispatch(addHistoryItem([item + "=", eval(item).toString()]));
    });
  };

  return (
    <div className="history">
      <div className="header">History</div>
      <div className="history__container">
        {state.history.map((item) => (
          <div className="history__item" key={uuidv4()} onClick={() => dispatch(setOutputExpression(item[1]))}>
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
