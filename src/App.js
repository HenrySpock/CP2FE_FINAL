// App.js
import React from 'react'; 
import './App.css';
import PingTest from './components/PingTest';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Route Components 
import Home from './components/travlog/Home';  
import About from './components/feedback-report/About';
import Feedback from './components/feedback-report/Feedback'; 
import AuthPage from './components/user/AuthPage';  

function App() {
  return (
    <Router>
      <div className="App">
        <PingTest/ >
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page displaying travlog posts */}
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

