import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./home"; // Ensure the casing is correct
import Quiz from "./Quiz";
import ProgressTracker from "./ProgressTracker";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/progress-tracker" element={<ProgressTracker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
