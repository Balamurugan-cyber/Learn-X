import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Quiz.css";
import quizData from "./quizData.json"; // Import the JSON file

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleNextQuestion();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestion]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSelectedOption("");

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10);
    } else {
      // Store attempt in local storage before showing results
      const newAttempt = {
        time: new Date().toLocaleString(),
        score: score + 1, // Final score
      };
      const attempts = JSON.parse(localStorage.getItem("quizAttempts")) || [];
      attempts.push(newAttempt);
      localStorage.setItem("quizAttempts", JSON.stringify(attempts));
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(10);
  };

  return (
    <div className="quiz-wrapper">
      <div className="header-left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>Learn-X</h1> {/* Wrap the title with Link for navigation */}
        </Link>
      </div>
      <div className="quiz-container">
        {showResult ? (
          <div className="result-container">
            <h2>Quiz Completed!</h2>
            <p>
              Your Score: {score} / {quizData.length}
            </p>
            <button onClick={handleRestart}>Restart Quiz</button>
          </div>
        ) : (
          <>
            <div className="progress">
              <div
                className="progress-bar"
                style={{
                  width: `${((currentQuestion + 1) / quizData.length) * 100}%`,
                }}
              ></div>
            </div>
            <div className="timer">Time remaining: {timeLeft} seconds</div>
            <h2>{quizData[currentQuestion].question}</h2>
            <div className="options">
              {quizData[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  className={`option ${
                    selectedOption === option ? "selected" : ""
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  <input
                    type="radio"
                    checked={selectedOption === option}
                    onChange={() => handleOptionSelect(option)}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
            <button onClick={handleNextQuestion} disabled={!selectedOption}>
              Next Question
            </button>
            <div className="score-display">Score: {score}</div>
          </>
        )}
      </div>
      <footer>
        <p>
          💡 Did you know? Continuous learning keeps the brain young and sharp!
        </p>
      </footer>
    </div>
  );
}

export default Quiz;
