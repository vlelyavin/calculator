import { useEffect, useRef } from "react";
import { addHistoryItem, setOutputExpression } from "../actions/actions";
import "./Calc.css";

export const Calc = ({ state, dispatch }) => {
  const outputExpression = state.outputExpression;
  const regex = /[-/*+]/; // checks if a string contains math signs
  const output = useRef();
  const space = " ";
  let outputLastSymbol = outputExpression[outputExpression.length - 2];

  const clearAll = () => {
    dispatch(setOutputExpression("0"));
  };

  const plusMinus = () => {
    if (outputExpression === "0") return;
    const matches = outputExpression.match(/[+-]?([1-9]\d*(\.\d*[1-9])?|0\.\d*[1-9]+)|\d+(\.\d*[1-9])?/g); // matches all positive and negative numbers
    if ((matches[0] > 0 && matches.length === 1) || (matches[0] < 0 && matches.length === 1)) {
      dispatch(setOutputExpression((matches[0] * -1).toString()));
    } else {
      dispatch(
        setOutputExpression(outputExpression.slice(0, matches[0].length + 2) + space + (matches[1] * -1).toString())
      );
    }
  };

  const evaluate = () => {
    const splittedState = outputExpression.split(regex);
    if (regex.test(outputLastSymbol) && outputExpression.length > 1) {
      dispatch(setOutputExpression(eval(outputExpression + splittedState[0]).toString()));
      dispatch(
        addHistoryItem([
          outputExpression + splittedState[0] + " = ",
          eval(outputExpression + splittedState[0]).toString(),
        ])
      );
    } else {
      dispatch(setOutputExpression(eval(outputExpression).toString()));
      dispatch(addHistoryItem([outputExpression + " = ", outputExpression]));
    }
  };

  const setSign = (e) => {
    if (outputExpression.length === 2 && outputLastSymbol === "-") {
      outputLastSymbol = outputExpression[outputExpression.length - 1];
    }
    const sign = e.target.textContent;
    if (regex.test(outputLastSymbol)) {
      dispatch(setOutputExpression(outputExpression.replace(outputLastSymbol, sign)));
    } else if (outputExpression.match(regex)) {
      dispatch(addHistoryItem([outputExpression + " = ", eval(outputExpression).toString()]));
      dispatch(setOutputExpression(eval(outputExpression) + space + sign + space));
    } else {
      dispatch(setOutputExpression(outputExpression + space + sign + space));
    }
  };

  const dot = () => {
    const splittedState = outputExpression.split(regex);
    if (splittedState.length > 1) {
      if (!splittedState[1].includes(".")) {
        dispatch(setOutputExpression(outputExpression + "."));
      }
    } else {
      if (!outputExpression.includes(".")) {
        dispatch(setOutputExpression(outputExpression + "."));
      }
    }
  };

  const eraseLast = () => {
    if (outputExpression.length === 1) {
      clearAll();
    } else if (outputExpression[outputExpression.length - 1] === space) {
      dispatch(setOutputExpression(outputExpression.slice(0, -2)));
    } else {
      dispatch(setOutputExpression(outputExpression.slice(0, -1)));
    }
  };

  const handleClick = (e) => {
    if (outputExpression === "0" && e.target.textContent === 0) {
      clearAll();
    } else if (outputExpression === "0") {
      dispatch(setOutputExpression("" + e.target.textContent));
    } else {
      dispatch(setOutputExpression(outputExpression + e.target.textContent));
    }
  };

  useEffect(() => {
    output.current.textContent = outputExpression;
  }, [outputExpression]);

  return (
    <div className="calc">
      <div className="header">Calculator</div>
      <div className="calc__screen">
        <p className="calc__screen__number" ref={output}>
          0
        </p>
      </div>
      <div className="calc__buttons">
        <div className="btn bg-gray" onClick={clearAll}>
          AC
        </div>
        <div className="btn bg-gray" onClick={eraseLast}>
          &larr;
        </div>
        <div className="btn bg-gray" onClick={plusMinus}>
          &#xB1;
        </div>
        <div className="btn bg-gray" onClick={(e) => setSign(e)}>
          /
        </div>

        <div className="btn" onClick={(e) => handleClick(e)}>
          7
        </div>
        <div className="btn" onClick={(e) => handleClick(e)}>
          8
        </div>
        <div className="btn" onClick={(e) => handleClick(e)}>
          9
        </div>
        <div className="btn bg-gray" onClick={(e) => setSign(e)}>
          *
        </div>

        <div className="btn" onClick={(e) => handleClick(e)}>
          4
        </div>
        <div className="btn" onClick={(e) => handleClick(e)}>
          5
        </div>
        <div className="btn" onClick={(e) => handleClick(e)}>
          6
        </div>
        <div className="btn bg-gray" onClick={(e) => setSign(e)}>
          -
        </div>

        <div className="btn" onClick={(e) => handleClick(e)}>
          1
        </div>
        <div className="btn" onClick={(e) => handleClick(e)}>
          2
        </div>
        <div className="btn" onClick={(e) => handleClick(e)}>
          3
        </div>
        <div className="btn bg-gray" onClick={(e) => setSign(e)}>
          +
        </div>

        <div className="btn zero" onClick={(e) => handleClick(e)}>
          0
        </div>
        <div className="btn" onClick={dot}>
          .
        </div>
        <div className="btn bg-gray" onClick={evaluate}>
          =
        </div>
      </div>
    </div>
  );
};
