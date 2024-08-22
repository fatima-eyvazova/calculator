import Button from "../../components/Button/Button";
import { FaTimes, FaMinus, FaPlus } from "react-icons/fa";
import { FaDivide } from "react-icons/fa6";

import "./Calculator.css";

const Calculator = () => {
  return (
    <>
      <div className="calculator"></div>
      <h1 className="title">Calculator</h1>
      <div className="calculator-container">
        <div className="buttons">
          <div className="top-row">
            <Button className="operator-clear">C</Button>
            <Button className="button">
              <FaDivide />
            </Button>
            <Button>%</Button>
            <Button className="operator">+/-</Button>
          </div>
          <div className="number-row">
            <Button>7</Button>
            <Button>8</Button>
            <Button>9</Button>
            <Button className="operator">
              <FaTimes />
            </Button>
          </div>
          <div className="number-row">
            <Button>4</Button>
            <Button>5</Button>
            <Button>6</Button>
            <Button className="operator">
              <FaMinus />
            </Button>
          </div>
          <div className="number-row">
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
            <Button className="operator">
              <FaPlus />
            </Button>
          </div>
          <div className="last-row">
            <Button className="zero">0</Button>
            <Button>.</Button>
            <Button className="operator">=</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
