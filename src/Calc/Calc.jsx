import { useEffect, useRef } from "react";

import "./Calc.css";

export const Calc = ({ state, setState, setHistory }) => {
  const regex = /[-/*+]/; // checks if a string contains math signs
  const calcNumber = useRef();
  let lastStateSymbol = state[state.length - 2];
  const space = " ";

  const clearAll = () => {
    setState("0");
  };

  const plusMinus = () => {
    if (state === "0") return;
    const matches = state.match(/[+-]?([1-9]\d*(\.\d*[1-9])?|0\.\d*[1-9]+)|\d+(\.\d*[1-9])?/g); // matches all positive and negative numbers
    if ((matches[0] > 0 && matches.length === 1) || (matches[0] < 0 && matches.length === 1)) {
      setState((matches[0] * -1).toString());
    } else {
      setState(state.slice(0, matches[0].length + 2) + space + (matches[1] * -1).toString());
    }
  };

  const evaluate = () => {
    const splittedState = state.split(regex);
    if (regex.test(lastStateSymbol) && state.length > 1) {
      setState(eval(state + splittedState[0]).toString());
    } else {
      setState(eval(state).toString());
    }
    setHistory((prev) => [...prev, [state + " = ", eval(state).toString()]]);
  };

  const setSign = (e) => {
    if (state.length === 2 && lastStateSymbol === "-") lastStateSymbol = state[state.length - 1];
    const sign = e.target.textContent;
    if (regex.test(lastStateSymbol)) {
      setState(state.replace(lastStateSymbol, sign));
    } else if (state.match(regex)) {
      setHistory((prev) => [...prev, [state + " = ", eval(state).toString()]]);
      setState(eval(state) + space + sign + space);
    } else {
      setState(state + space + sign + space);
    }
  };

  const dot = () => {
    const splittedState = state.split(regex);
    if (splittedState.length > 1) {
      if (!splittedState[1].includes(".")) {
        setState(state + ".");
      }
    } else {
      if (!state.includes(".")) {
        setState(state + ".");
      }
    }
  };

  const eraseLast = () => {
    if (state.length === 1) {
      clearAll();
    } else if (state[state.length - 1] === space) {
      setState(state.slice(0, -2));
    } else {
      setState(state.slice(0, -1));
    }
  };

  const handleClick = (e) => {
    if (state === "0" && e.target.textContent === 0) {
      clearAll();
    } else if (state === "0") {
      setState("" + e.target.textContent);
    } else {
      setState(state + e.target.textContent);
    }
  };

  useEffect(() => {
    calcNumber.current.textContent = state;
  }, [state]);

  return (
    <div className="calc">
      <div className="header">Calculator</div>
      <div className="calc__screen">
        <p className="calc__screen__number" ref={calcNumber}>
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
