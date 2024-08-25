import Button from "../../components/Button/Button";
// import { FaTimes, FaMinus, FaPlus } from "react-icons/fa";
// import { FaDivide } from "react-icons/fa6";

import "./Calculator.css";
import { useEffect, useState } from "react";

const Calculator = () => {
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  const formatNumber = (value) => {
    if (isNaN(value) || value === "") return "0";
    return Number(value);
  };

  const inputNumber = (e) => {
    if (total) {
      setPreState("");
      setCurState("");
      setTotal(false);
    }

    const value = e.target.innerText;
    if (value === "." && curState.includes(".")) return;

    setCurState((prev) => prev + value);
  };

  useEffect(() => {
    setInput(curState || preState || null);
  }, [curState, preState]);

  const operatorType = (e) => {
    e.stopPropagation();
    const value = e.target.innerText;
    console.log("e", e);

    if (curState === "" && value === "-") {
      setCurState("-");
      return;
    }

    if (curState === "" && value !== "-" && value !== ".") return;

    if (preState !== "" && curState !== "") {
      calculation();
    }

    setOperator(value);
    setPreState(curState);
    setCurState("");
    setInput(input + value);
  };

  const calculation = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }
    console.log("operator", operator);

    let cal;
    switch (operator) {
      case "/":
        cal = String(parseFloat(preState) / parseFloat(curState));

        break;

      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "*":
        cal = String(parseFloat(preState) * parseFloat(curState));

        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));

        break;
      default:
        return;
    }

    setInput("");
    setPreState(cal);
    setCurState("");
  };

  const minusPlus = () => {
    setCurState((prev) =>
      prev.charAt(0) === "-" ? prev.substring(1) : "-" + prev
    );
  };

  const percentCalculate = () => {
    const value = parseFloat(curState);
    if (preState) {
      setCurState(String((value / 100) * parseFloat(preState)));
    } else {
      setCurState(String(value / 100));
    }
  };

  const resetSettings = () => {
    setPreState("");
    setCurState("");
    setInput("0");
    setOperator(null);
    setTotal(false);
  };

  return (
    <>
      <div className="calculator">
        <h1 className="title">Calculator</h1>
        <div className="calculator-container">
          <div className="display">
            {input !== "" ? (
              <div>{formatNumber(input)}</div>
            ) : (
              <div>{formatNumber(preState)}</div>
            )}
          </div>

          <div className="buttons">
            <div className="top-row">
              <Button className="operator-clear" onClick={resetSettings}>
                C
              </Button>
              <Button onClick={operatorType} className="button">
                {/* <FaDivide /> */} /
              </Button>
              <Button onClick={percentCalculate}>%</Button>
              <Button onClick={minusPlus} className="operator">
                +/-
              </Button>
            </div>
            <div className="number-row">
              <Button onClick={inputNumber}>7</Button>
              <Button onClick={inputNumber}>8</Button>
              <Button onClick={inputNumber}>9</Button>
              <Button onClick={operatorType} className="operator">
                *
              </Button>
            </div>
            <div className="number-row">
              <Button onClick={inputNumber}>4</Button>
              <Button onClick={inputNumber}>5</Button>
              <Button onClick={inputNumber}>6</Button>
              <Button onClick={operatorType} className="operator">
                {/* <FaMinus /> */} -
              </Button>
            </div>
            <div className="number-row">
              <Button onClick={inputNumber}>1</Button>
              <Button onClick={inputNumber}>2</Button>
              <Button onClick={inputNumber}>3</Button>
              <Button onClick={operatorType} className="operator">
                {/* <FaPlus /> */} +
              </Button>
            </div>
            <div className="last-row">
              <Button onClick={inputNumber} className="zero">
                0
              </Button>
              <Button onClick={inputNumber}>.</Button>
              <Button className="operator" onClick={calculation}>
                =
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
