// Registration Component 
import React, { useState } from 'react';
import './AuthPage.css'

function Register() { 
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  const clearErrorMessage = () => setErrorMessage('');

  const checkBannedEmail = async (email) => {
    try {
      const response = await fetch(`${API_BASE_URL}/feedback/api/check-banned-email?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      return response.ok ? true : data.message;
    } catch (error) {
      console.error('Error during email check:', error);
      return 'Error checking email';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.target;
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

   

    const bannedEmailCheck = await checkBannedEmail(data.email);
    if (bannedEmailCheck !== true) { 
      setErrorMessage(bannedEmailCheck);
      return; 
    }

    try {
      const response = await fetch('${API_BASE_URL}/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    
      if (response.ok) { 
        const message = await response.text();  
        setRegistrationMessage(message);
        formElement.reset();
      } else {
        const errorData = await response.json();
        if (errorData.error === 'Username exists') { 
          setErrorMessage('Username exists, try another.');
        } else if (errorData.error === 'Email already in use') { 
          setErrorMessage('Email already in use, please try another email.');
        } else { 
          setErrorMessage('Username already in use, lease choose another.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

    return (
      <div className='register-container'>
      {registrationMessage && <p className='reg-message'>{registrationMessage}</p>}
      {errorMessage && <p className='error-message'>{errorMessage}</p>} 
        <form className='register-form' onSubmit={handleSubmit} onChange={clearErrorMessage}>
        <div className='reg-dual'>
          <input className='register-form' type="text" name="firstName" placeholder="First Name" required />
          <input className='register-form' type="text" name="lastName" placeholder="Last Name" required />
        </div>
        <div className='reg-dual'>
          <input className='register-form' type="text" name="username" placeholder="Username" required />
          <input className='register-form' type="email" name="email" placeholder="Email" required />
        </div>
        <div className='reg-dual'>
          <input className='register-form' type="password" name="password" placeholder="Password" required />
          <input className='register-form' type="password" name="retypedPassword" placeholder="Retype Password" required />
        </div>
          <input className='register-form' type="text" name="adminKey" placeholder="Admin Key" />
          <select className='register-form reg-select' name="securityQuestion" defaultValue="Select a security question" required>
            <option value="What is the name of your first pet?">What is the name of your first pet?</option>
            <option value="What is your mother's maiden name?">What is your mother's maiden name?</option> 
            <option value="What is the worst Star Wars movie?">What is the worst Star Wars movie?</option>
            <option value="What is the best Led Zeppelin album?">What is the best Led Zeppelin album?</option>
            <option value="What is your favorite book?">What is your favorite book?</option>
          </select>
          <input className='register-form' type="text" name="answer" placeholder="Answer" required /> 
 
            <div style={{ display: 'flex', alignItems: 'center' }}>  
              <input className='register-form' type="text" name="avatar" placeholder="Avatar URL" />
              <div className='tooltip'>
                <span className='tooltip-icon'>?</span> 
                <span className='tooltip-text'>
                  This is not an image hosting site, any images you use need to be hosted elsewhere.
                
                  Tooltips can be turned off when you edit your profile.
                </span>
              </div>
            </div> 

          <textarea className='register-text' name="bio" placeholder="Bio: 1000 Characters or Less" rows="4" cols="50" maxLength={1000}></textarea >
          <button className='register-btn' type="submit">Register</button>  
        </form>
      </div>
    );
  } 

export default Register;