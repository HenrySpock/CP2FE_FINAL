// App.js
import React from 'react'; 
import './App.css';

// Connectivity Test
import PingTest from './components/site/PingTest';

// Router Components
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

// Context Providers
import { UserProvider } from './components/user/UserContext';
import { WebSocketProvider } from './components/interactions/WebSocketProvider';
 
// Navbar And Search Results
import Navbar from './components/site/Navbar';  
import Results from './components/site/Results'

// Route Components
import Home from './components/travlog/Home';  
import About from './components/feedback-report/About';
import Documentation from './components/feedback-report/Documentation';
import Feedback from './components/feedback-report/Feedback'; 
import AuthPage from './components/user/AuthPage';  
import AdminPanel from './components/user/AdminPanel'; 
import LogEntry from './components/travlog/LogEntry';
import UserHub from './components/user/UserHub';
import Abaci from './components/abaci/Abaci';
import TravDet from './components/travlog/TravDet'; 

// User and Interaction Components
import Profile from './components/user/Profile';
import Password from './components/user/Password';
import PublicProfile from './components/interactions/PublicProfile';
import Connections from './components/interactions/Connections';
import Disconnections from './components/interactions/Disconnections'; 
import Messaging from './components/interactions/Messaging';

// Trip Components
import CreateTrip from './components/trips/CreateTrip';
import TripDet from './components/trips/TripDet.js'; 

// TipTap Componenents 
import TravTipTap from './components/tiptap/TravTipTap'
import TripTipTap from './components/tiptap/TripTipTap'

import Tally from './components/tally/Tally'
import PrivateLogs from './components/user/PrivateLogs'

// Verification 
import EmailVerification from './components/user/EmailVerification';
import VerificationCheck from './components/user/VerificationCheck';
import Permissions from './components/user/Permissions'
import ScheduleMaint from './components/user/ScheduleMaint'
import HomeOther from './components/travlog/HomeOther'

function App() { 
  return (
    // User Context Wrapper 
    <UserProvider>    
      {/* WebSocket provider  */}
      <WebSocketProvider> 
 
      <Router>
        <div className="App"> 
          <Navbar />
          <PingTest/ >
          <Tally />
          <Routes>
            <Route path="/" element={<Home />} />  
            <Route path="/homeother" element={<HomeOther />} /> 
            <Route path="/about" element={<About />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/log_entry" element={<LogEntry />} />
            <Route path="/hub" element={<UserHub />} />
            <Route path="/Abaci" element={<Abaci />} />
            <Route path="/trav_det/:travelogId" element={<TravDet />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/password" element={<Password />} />
            <Route path="/public_profile/:username" element={<PublicProfile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/disconnections" element={<Disconnections />} />
            <Route path="/messaging" element={<Messaging />} />
            <Route path="/create_trip" element={<CreateTrip />} />
            <Route path="/trip_det/:trip_id" element={<TripDet />} /> 
            <Route path="/travtiptap/:id" element={<TravTipTap />} /> 
            <Route path="/TripTipTap/:id" element={<TripTipTap />} />  
            <Route path="/private_logs/:user_id" element={<PrivateLogs />} /> 
            <Route path="/verify_email" element={<EmailVerification />} /> 
            <Route path="/verification_check" element={<VerificationCheck />} /> 
            <Route path="/permissions" element={<Permissions />} /> 
            <Route path="/maintenance" element={<ScheduleMaint />} /> 
            <Route path="/results" element={<Results />} /> 
          </Routes>
        </div>
      </Router>

      </WebSocketProvider>

    </UserProvider>
    
  );
}

export default App;