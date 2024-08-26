import Button from "../../components/Button/Button";
import "../History/History.css";

const History = ({ history, showHistory, toggleHistory }) => {
  return (
    <>
      <div className="history-container">
        <div>
          <h1>History</h1>
        </div>
        <div className="history-buttons">
          <Button onClick={toggleHistory} className="history-button">
            H
          </Button>
          {showHistory && (
            <div className="history">
              <ul className="history-list">
                {history.length === 0 ? (
                  <li>No operation</li>
                ) : (
                  history.map((entry, index) => <li key={index}>{entry}</li>)
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default History;
