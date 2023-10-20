// // App.js
// import React from 'react'; 
// import './App.css';
// import PingTest from './components/PingTest';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// import { UserProvider } from './components/user/UserContext';

// // Route Components 
// import Home from './components/travlog/Home';  
// import About from './components/feedback-report/About';
// import Feedback from './components/feedback-report/Feedback'; 
// import AuthPage from './components/user/AuthPage';  
// import AdminPanel from './components/user/AdminPanel';

// function App() {
//   return (
//     <UserProvider>

//       <Router>
//         <div className="App">
//           <PingTest/ >
//           <Routes>
//             <Route path="/" element={<Home />} /> {/* Home page displaying travlog posts */}
//             <Route path="/about" element={<About />} />
//             <Route path="/feedback" element={<Feedback />} />
//             <Route path="/auth" element={<AuthPage />} />
//             <Route path="/admin" element={<AdminPanel />} />
//           </Routes>
//         </div>
//       </Router>

//     </UserProvider>
//   );
// }

// export default App; 

// App.js
import React, { useContext } from 'react'; 
import './App.css';
import PingTest from './components/site/PingTest';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { UserContext } from './components/user/UserContext';
import { UserProvider } from './components/user/UserContext';
 


// Route Components 
import Home from './components/travlog/Home';  
import About from './components/feedback-report/About';
import Feedback from './components/feedback-report/Feedback'; 
import AuthPage from './components/user/AuthPage';  
import AdminPanel from './components/user/AdminPanel'; 

import Travelogue from './components/travlog/Travelogue';
import LogEntry from './components/travlog/LogEntry';
import UserHub from './components/user/UserHub';
import TallyStick from './components/travlog/TallyStick'
import TravDet from './components/travlog/TravDet'

// Import your Navbar component
import Navbar from './components/site/Navbar';  
import Profile from './components/user/Profile'
import Password from './components/user/Password'
import PublicProfile from './components/interactions/PublicProfile'

function App() { 
  return (
    <UserProvider> 
      <Router>
        <div className="App">
          {/* Include the Navbar component */}
          <Navbar />

          <PingTest/ >
          <Routes>

            <Route path="/" element={<Home />} /> {/* Home page displaying travlog posts */}
            <Route path="/about" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/travelogue" element={<Travelogue />} />
            <Route path="/log_entry" element={<LogEntry />} />
            <Route path="/hub" element={<UserHub />} />
            <Route path="/tally" element={<TallyStick />} />
            <Route path="/trav_det/:id" element={<TravDet />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/password" element={<Password />} />
            <Route path="/public_profile/:username" element={<PublicProfile />} />

          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App; 
 
 
