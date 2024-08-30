import Button from "../../components/Button/Button";
import "../Calculator/Calculator.css";
import { useEffect, useState } from "react";
import History from "../../components/History/History";
import {
  inputNumber,
  operatorType,
  calculation,
  calculateSquare,
  percentCalculate,
  deleteLastCharacter,
  resetSettings,
  formatNumber,
} from "../../components/CalculatorLogic/CalculatorLogic";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [input, setInput] = useState("0");
  const [total, setTotal] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setInput(expression || "0");
  }, [expression]);

  const buttonConfig = [
    {
      label: "C",
      onClick: resetSettings(setExpression, setInput, setTotal),
      className: "operator-clear",
    },
    {
      label: "⌫",
      onClick: deleteLastCharacter(setExpression),
      className: "operator",
    },
    { label: "%", onClick: percentCalculate(setExpression) },
    {
      label: "/",
      onClick: operatorType(expression, setExpression, setInput),
      className: "button",
    },
    {
      label: "7",
      onClick: inputNumber(expression, setExpression, total, setTotal),
    },
    {
      label: "8",
      onClick: inputNumber(expression, setExpression, total, setTotal),
    },
    {
      label: "9",
      onClick: inputNumber(expression, setExpression, total, setTotal),
    },
    {
      label: "*",
      onClick: operatorType(expression, setExpression, setInput),
      className: "operator",
    },
    {
      label: "4",
      onClick: inputNumber(expression, setExpression, total, setTotal),
    },
    {
      label: "5",
      onClick: inputNumber(expression, setExpression, total, setTotal),
    },
    {
      label: "6",
      onClick: inputNumber(expression, setExpression, total, setTotal),
    },
    {
      label: "-",
      onClick: operatorType(expression, setExpression, setInput),
      className: "operator",
    },
    {
      label: "1",
      onClick: inputNumber(expression, setExpression, total, setTotal),
    },
    {
      label: "2",
      onClick: inputNumber(expression, setExpression, total, setTotal),
    },
    {
      label: "3",
      onClick: inputNumber(expression, setExpression, total, setTotal),
    },
    {
      label: "+",
      onClick: operatorType(expression, setExpression, setInput),
      className: "operator",
    },
    {
      label: "0",
      onClick: inputNumber(expression, setExpression, total, setTotal),
      className: "zero",
    },
    {
      label: "√",
      onClick: calculateSquare(setExpression),
      className: "operator",
    },
    {
      label: ".",
      onClick: inputNumber(expression, setExpression, total, setTotal),
    },
    {
      label: "=",
      onClick: calculation(
        expression,
        setExpression,
        setInput,
        setTotal,
        setHistory
      ),
      className: "operator",
    },
  ];

  return (
    <div className="calculator">
      <h1 className="title">Calculator</h1>
      <div className="calculator-history">
        <div className="calculator-container">
          <div className="display">
            {input !== "" ? (
              <div>{formatNumber(input)}</div>
            ) : (
              <div>{formatNumber(expression.slice(0, 2))}</div>
            )}
          </div>

          <div className="buttons">
            {buttonConfig.map((button, index) => (
              <Button
                key={index}
                onClick={button.onClick}
                className={button.className}
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>
        <History history={history} />
      </div>
    </div>
  );
};

export default Calculator;
