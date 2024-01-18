import React, { useState, useEffect } from 'react';
import Register from './Register'; 
import Login from './Login'; 
import './AuthPage.css'


// AuthPage Component
function AuthPage() {
  const [showResetModal, setShowResetModal] = useState(false);
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const [email, setEmail] = useState('');

  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [maintenanceKey, setMaintenanceKey] = useState('');
  const [enteredKey, setEnteredKey] = useState('');
 
  const [maintenanceEndTime, setMaintenanceEndTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');
 
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const clearMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  useEffect(() => {
    const checkMaintenanceMode = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/maintenance/status');
                        
        const data = await response.json();
        setIsMaintenanceMode(data.maintenanceActive);
        if (data.maintenanceActive) {
          setMaintenanceKey(data.maintenanceInfo.maintenance_key);
          setMaintenanceEndTime(new Date(data.maintenanceInfo.timestamp_end));
        }
      } catch (error) {
        console.error('Error fetching maintenance mode:', error);
      }
    };
  
    checkMaintenanceMode();
    const interval = setInterval(checkMaintenanceMode, 100000);  
  
    return () => clearInterval(interval); // cleanup interval on component unmount
  }, []);
  
  // Set Countdown 
  useEffect(() => {
    const countdown = setInterval(() => {
      if (maintenanceEndTime) {
        const now = new Date();
        const remainingTime = maintenanceEndTime - now;
        if (remainingTime > 0) {
          const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
          const seconds = Math.floor((remainingTime / 1000) % 60);

          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeRemaining('Maintenance period has ended');
        }
      }
    }, 60000);

    return () => clearInterval(countdown); // cleanup interval on component unmount
  }, [maintenanceEndTime]);

  // Handle Maintenance Key input
  const handleMaintenanceKeyInput = (event) => {
    setEnteredKey(event.target.value);
  };

  // Check if entered key is correct 
  const isKeyCorrect = enteredKey === maintenanceKey; 

  const handleResetSubmit = async (event) => {
    event.preventDefault();
    clearMessages();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    // console.log('email: ', email)
    data.email = email; 
  
    try {
      const response = await fetch('http://localhost:5000/auth/api/user/validate_security_answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        setShowResetModal(false);
        setShowNewPasswordModal(true);
        setSuccessMessage('Security details validated successfully.');
      } else { 
        setErrorMessage('Invalid email, security question, or security answer');
      }
    } catch (error) {
      console.error('Error:', error); 
      setErrorMessage('An error occurred while validating your details');
    }
  };
  
  
  

  const handleNewPasswordSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.email = email;  

    try {
      const response = await fetch('http://localhost:5000/auth/api/user/reset_password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) { 
        setSuccessMessage('Password updated successfully');
        setShowNewPasswordModal(false);
      } else { 
        setErrorMessage('Failed to update password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  // Render maintenance mode screen if in maintenance mode and key is incorrect
  if (isMaintenanceMode) {
    if (!isKeyCorrect) {
      return (
        <div className="maintenance-mode">

          <div className='maintenance-mode-info'>
            <p>Maintenance ends in: {timeRemaining}</p>

            <input 
              type="text" 
              placeholder="Maintenance Key" 
              value={enteredKey}
              onChange={handleMaintenanceKeyInput}
            />
          </div>
          <div className='maintenance-img'>
            <img  src="/maintenance_castle.jpg" alt="Maintenance" /> 
          </div>

        </div>
      );
    } else {
      // If in maintenance mode and key is correct, display only the Login component
      return <Login />;
    }
  }


  return (
    <div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className='auth-container'>
        <Register />
        <div className='login-container'>
          <Login />
          <button className='forgot-btn' onClick={() => setShowResetModal(true)}>
            Forgot Your Username/Password?
          </button>
        </div>
      </div>  

      {showResetModal && (
        <div className="modal password-reset-modal">
          <form onSubmit={handleResetSubmit}>
            <input className='security-email-input' type="email" name="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />

            <select className='security-select' name="securityQuestion" required>
              <option value="">Select your security question</option>
              <option value="What is the name of your first pet?">What is the name of your first pet?</option>
              <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
              <option value="What is the worst Star Wars film?">What is the worst Star Wars film?</option>
              <option value="What is the best Extreme album?">What is the best Extreme album?</option>
              <option value="What is your favorite book?">What is your favorite book?</option>
              {/* Additional security questions here */}
            </select>
            <div>
              <input className='security-answer-input' type="text" name="securityAnswer" placeholder="Security Answer" required />
              <button className='security-submit-btn' type="submit">Submit</button>
            </div>
          </form>
            <button className='security-cancel-btn' onClick={() => setShowResetModal(false)}>Cancel</button>
        </div>
      )}



      {showNewPasswordModal && (
        <div className="modal password-reset-modal">
          <form onSubmit={handleNewPasswordSubmit}>
            <input className='password-reset-input' type="password" name="newPassword" placeholder="New Password" required />
            <input className='password-reset-input'type="password" name="confirmNewPassword" placeholder="Confirm New Password" required />
            <div className='password-reset-buttons'>
              <button className='password-reset-btn' type="submit">Submit</button>
              <button className='password-reset-btn' onClick={() => setShowNewPasswordModal(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

export default AuthPage;