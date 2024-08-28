import Button from "../../components/Button/Button";
import "../History/History.css";

const History = ({ history }) => {
  return (
    <>
      <div className="history-container">
        <div>
          <h1>History</h1>
        </div>
        <div className="history-buttons">
          <ul className="history-list">
            {history.length === 0 ? (
              <li>No operation</li>
            ) : (
              history.map((item, index) => <li key={index}>{item}</li>)
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default History;
