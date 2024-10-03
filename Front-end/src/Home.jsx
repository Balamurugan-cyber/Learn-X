import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Learn-X</h1>
      <p>Select an option below:</p>
      <div className="home-links">
        <Link to="/quiz" className="home-link-button">
          Start Quiz
        </Link>
        <Link to="/progress-tracker" className="home-link-button">
          Track Progress
        </Link>
      </div>
    </div>
  );
}

export default Home;
