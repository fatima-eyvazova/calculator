export const formatNumber = (value) => {
  if (isNaN(value) || value === "") return value;
  return value;
};

export const inputNumber =
  (expression, setExpression, total, setTotal) => (e) => {
    const value = e.target.innerText;
    const operators = ["+", "-", "*", "/"];
    const lastChar = expression.slice(-1);

    if (total) {
      if (value === ".") {
        setExpression("0.");
      } else {
        setExpression(value);
      }
      setTotal(false);
      return;
    }

    if (value === "0") {
      if (expression === "" || operators.includes(lastChar)) {
        if (expression !== "0") {
          setExpression(expression + "0");
        }
        return;
      }
      if (lastChar === "0") {
        return;
      }
      setExpression(expression + value);
      return;
    }

    if (value === ".") {
      if (expression === "" || operators.includes(lastChar)) {
        setExpression(expression + "0.");
      } else {
        let lastNumber = "";
        let i = expression.length - 1;
        while (i >= 0 && !operators.includes(expression[i])) {
          lastNumber = expression[i] + lastNumber;
          i--;
        }

        if (!lastNumber.includes(".")) {
          setExpression(expression + value);
        }
      }
      return;
    }

    if (expression === "0" && value !== ".") {
      setExpression(value);
    } else {
      setExpression(expression + value);
    }
  };

export const operatorType = (expression, setExpression, setInput) => (e) => {
  const value = e.target.innerText;
  const operators = ["+", "-", "*", "/"];

  if (expression === "" && value === "-") {
    setExpression("-");
    setInput("-");
    return;
  }

  if (operators.includes(expression.slice(-1))) {
    if (value === "-" && expression === "") {
      setExpression("-");
      setInput("-");
    } else {
      setExpression(expression.slice(0, -1) + value);
      setInput(expression.slice(0, -1) + value);
    }
  } else {
    setExpression((prev) => prev + value);
    setInput(expression + value);
  }
};

export const calculation =
  (expression, setExpression, setInput, setTotal, setHistory) => () => {
    try {
      let result = evaluateExpression(expression);

      if (result === "Error") {
        throw new Error("Invalid expression");
      }

      if (typeof result === "number") {
        result = parseFloat(result.toFixed(10));
      }

      setInput(result);
      setExpression(result);
      setHistory((prev) => [...prev, `${expression} = ${result}`]);
      setTotal(true);
    } catch (error) {
      setInput("Error");
    }
  };

const evaluateExpression = (expr) => {
  try {
    const postfix = infixToPostfix(expr);
    return evaluatePostfix(postfix);
  } catch (error) {
    return "Error";
  }
};

const infixToPostfix = (expr) => {
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2, "√": 3 };
  const output = [];
  const operators = [];

  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];

    if (!isNaN(char) || char === ".") {
      let num = char;
      while (
        i + 1 < expr.length &&
        (!isNaN(expr[i + 1]) || expr[i + 1] === ".")
      ) {
        num += expr[++i];
      }
      output.push(parseFloat(num));
    } else if (char === "(") {
      operators.push(char);
    } else if (char === ")") {
      while (operators.length && operators[operators.length - 1] !== "(") {
        output.push(operators.pop());
      }
      operators.pop();
    } else if (["+", "-", "*", "/", "√"].includes(char)) {
      while (
        operators.length &&
        precedence[operators[operators.length - 1]] >= precedence[char]
      ) {
        output.push(operators.pop());
      }
      operators.push(char);
    }
  }

  while (operators.length) {
    output.push(operators.pop());
  }

  return output;
};

const evaluatePostfix = (postfix) => {
  const stack = [];

  postfix.forEach((token) => {
    if (typeof token === "number") {
      stack.push(token);
    } else {
      if (token === "√") {
        const a = stack.pop();
        stack.push(Math.sqrt(a));
      } else {
        const b = stack.pop();
        const a = stack.pop();
        switch (token) {
          case "+":
            stack.push(a + b);
            break;
          case "-":
            stack.push(a - b);
            break;
          case "*":
            stack.push(a * b);
            break;
          case "/":
            if (b === 0) throw new Error("Division by zero error");
            stack.push(a / b);
            break;
          default:
            throw new Error("Unsupported operator");
        }
      }
    }
  });

  return stack[0];
};

export const calculateSquare = (setExpression) => () => {
  setExpression((prev) => prev + "√");
};

export const percentCalculate = (setExpression) => () => {
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

export const deleteLastCharacter = (setExpression) => () => {
  setExpression((prev) => {
    if (typeof prev === "string") {
      return prev.slice(0, -1) || "0";
    }
    return prev;
  });
};
export const resetSettings = (setExpression, setInput, setTotal) => () => {
  setExpression("");
  setInput("0");
  setTotal(false);
};
