import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

function ProgressTracker() {
  const [attempts, setAttempts] = useState([]); // Array to store attempts

  // Load attempts from local storage when component mounts
  useEffect(() => {
    const storedAttempts =
      JSON.parse(localStorage.getItem("quizAttempts")) || [];
    setAttempts(storedAttempts);
  }, []);

  return (
    <div className="progress-tracker-container">
      <div className="header-left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>Learn-X</h1> {/* Wrap the title with Link for navigation */}
        </Link>
      </div>
      <h2>Progress Tracker</h2>
      <h3>Your Attempts</h3>
      <ul className="attempts-list">
        {attempts
          .slice(-9) // Get the last 9 attempts
          .reverse() // Optional: reverse to show the most recent at the top
          .map((attempt, index) => (
            <li key={index} className="attempt-item">
              {`Time: ${attempt.time}, Score: ${attempt.score}`}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ProgressTracker;
