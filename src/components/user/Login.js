import React, { useContext, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';   
import './AuthPage.css'

function Login() {
  // console.log("DEBUG Rendering Login component");
  const { login } = useContext(UserContext);  
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
  
    try {
      // Get user's email based on the username
      const emailResponse = await fetch(`https://lgcbe.onrender.com/feedback/api/get-user-email?username=${encodeURIComponent(data.username)}`);
      if (!emailResponse.ok) {
        setErrorMessage('Username / Email not found or invalid.');
        return;
      }
      const { email } = await emailResponse.json(); 
      // Check for suspension
      const suspensionResponse = await fetch(`https://lgcbe.onrender.com/feedback/api/check-suspension?userEmail=${encodeURIComponent(email)}`);
      if (suspensionResponse.ok) {
        const suspensionData = await suspensionResponse.json();
        // console.log('suspensionData: ', suspensionData)
        if (suspensionData.isSuspended) {
          setErrorMessage(`Login failed. You are suspended for ${suspensionData.remainingTime} more hours.`);
          return;
        }
      }
  
      // Proceed with login if not suspended
      const response = await fetch('https://lgcbe.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
  
      if (response.ok) {
        // Process successful login
        const { token, user } = await response.json();
        localStorage.setItem('token', token);
        login({ token, user }); 
        navigate('/');
      } else {
        setErrorMessage('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className='login-form-container'>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}  
      <form className='login' onSubmit={handleSubmit}>
        <div className='reg-dual'>
          <input className='' type="text" name="username" placeholder="Username" required />
          <input className='' type="password" name="password" placeholder="Password" required />
        </div>
        <button className='login-btn' type="submit">Login</button> 
      </form>
    </div>
  );
}

export default Login;
