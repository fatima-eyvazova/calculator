import Button from "../../components/Button/Button";
import "../Calculator/Calculator.css";
import { useEffect, useState } from "react";
import History from "../../components/History/History";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [input, setInput] = useState("0");
  const [total, setTotal] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const formatNumber = (value) => {
    if (isNaN(value) || value === "") return value;
    return Number(value).toString();
  };

  const inputNumber = (e) => {
    const value = e.target.innerText;

    if (total) {
      setExpression(value === "." ? "0." : value);
      setTotal(false);
    } else {
      if (value === ".") {
        const lastChar = expression.slice(-1);

        if (lastChar === "" || ["+", "-", "*", "/"].includes(lastChar)) {
          setExpression((prev) => prev + "0.");
        } else {
          setExpression((prev) => prev + value);
        }
      } else {
        setExpression((prev) => prev + value);
      }
    }
  };

  useEffect(() => {
    setInput(expression || "0");
  }, [expression]);

  const operatorType = (e) => {
    e.stopPropagation();
    const value = e.target.innerText;

    if (expression === "" && value === "-") {
      setExpression("-");
      return;
    }

    if (expression === "" && value !== "-" && value !== ".") return;

    if (["+", "-", "*", "/"].includes(expression.slice(-1))) {
      setExpression(expression.slice(0, -1) + value);
    } else {
      setExpression((prev) => prev + value);
    }

    setInput(expression + value);
  };

  const calculation = () => {
    try {
      let result = evaluateExpression(expression);

      if (result === "Error") {
        throw new Error("Invalid expression");
      }

      setInput(result);
      setExpression(result);
      setHistory((prev) => [...prev, `${expression} = ${result}`]);
      setTotal(true);
    } catch (error) {
      setInput("Error");
      setExpression("");
    }
  };

  const evaluateExpression = (expr) => {
    try {
      if (expr.includes("/0")) {
        throw new Error("Division by zero error");
      }

      let updatedExpr = expr;
      while (updatedExpr.includes("√")) {
        const sqrtIndex = updatedExpr.indexOf("√");
        let number = "";
        let i = sqrtIndex + 1;

        while (
          i < updatedExpr.length &&
          !isNaN(updatedExpr[i]) &&
          updatedExpr[i] !== " " &&
          updatedExpr[i] !== "+" &&
          updatedExpr[i] !== "-" &&
          updatedExpr[i] !== "*" &&
          updatedExpr[i] !== "/"
        ) {
          number += updatedExpr[i];
          i++;
        }

        const sqrtResult = Math.sqrt(parseFloat(number));
        updatedExpr =
          updatedExpr.slice(0, sqrtIndex) +
          sqrtResult +
          updatedExpr.slice(sqrtIndex + number.length + 1);
      }

      return Function(`return ${updatedExpr}`)();
    } catch (error) {
      return "Error";
    }
  };

  const calculateSquare = () => {
    setExpression((prev) => prev + "√");
  };

  const minusPlus = () => {
    setExpression((prev) => {
      const operators = ["+", "-", "*", "/"];
      let lastOperatorIndex = -1;

      for (let i = prev.length - 1; i >= 0; i--) {
        if (operators.includes(prev[i])) {
          lastOperatorIndex = i;
          break;
        }
      }

      if (lastOperatorIndex === -1) {
        if (prev[0] === "-") {
          return prev.slice(1);
        } else {
          return "-" + prev;
        }
      }

      const operator = prev[lastOperatorIndex];
      if (operator === "+") {
        return (
          prev.slice(0, lastOperatorIndex) +
          "-" +
          prev.slice(lastOperatorIndex + 1)
        );
      } else if (operator === "-") {
        return (
          prev.slice(0, lastOperatorIndex) +
          "+" +
          prev.slice(lastOperatorIndex + 1)
        );
      }

      return prev;
    });
  };

  const percentCalculate = () => {
    setExpression((prev) => {
      const operators = ["+", "-", "*", "/"];
      let lastOperatorIndex = -1;

      for (let i = prev.length - 1; i >= 0; i--) {
        if (operators.includes(prev[i])) {
          lastOperatorIndex = i;
          break;
        }
      }

      if (lastOperatorIndex === -1) {
        const value = parseFloat(prev);
        return !isNaN(value) ? String(value / 100) : prev;
      }

      const lastNumber = prev.slice(lastOperatorIndex + 1);
      const percentValue = parseFloat(lastNumber) / 100;

      return prev.slice(0, lastOperatorIndex + 1) + percentValue;
    });
  };

  const resetSettings = () => {
    setExpression("");
    setInput("0");
    setTotal(false);
  };

  const toggleHistory = () => {
    setShowHistory((prev) => !prev);
  };

  return (
    <>
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
              <div className="top-row">
                <Button className="operator-clear" onClick={resetSettings}>
                  C
                </Button>
                <Button onClick={operatorType} className="button">
                  /
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
                  -
                </Button>
              </div>
              <div className="number-row">
                <Button onClick={inputNumber}>1</Button>
                <Button onClick={inputNumber}>2</Button>
                <Button onClick={inputNumber}>3</Button>
                <Button onClick={operatorType} className="operator">
                  +
                </Button>
              </div>
              <div className="last-row">
                <Button onClick={inputNumber} className="zero">
                  0
                </Button>
                <Button onClick={calculateSquare} className="operator">
                  √
                </Button>
                <Button onClick={inputNumber}>.</Button>
                <Button className="operator" onClick={calculation}>
                  =
                </Button>
              </div>
            </div>
          </div>
          <History
            history={history}
            showHistory={showHistory}
            toggleHistory={toggleHistory}
          />
        </div>
      </div>
    </>
  );
};

export default Calculator;
