import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AuthPage.css'

function VerificationCheck() {
  const [verificationStatus, setVerificationStatus] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');  
  const navigate = useNavigate();

  useEffect(() => {
    const checkVerification = async () => {
      try {
        const response = await fetch(`https://lgcbe.onrender.com/auth/verification_check?email=${encodeURIComponent(email)}`);
        const message = await response.text();
        
        if (response.ok) {
          setVerificationStatus(message);
        } else {
          setVerificationStatus('An error occurred during verification check.');
        }
      } catch (error) {
        console.error('Error during verification check:', error);
        setVerificationStatus('An error occurred during verification check.');
      }
    };

    if (email) {
      checkVerification();
    }
  }, [email]);

  const handleVerifiedClick = () => {
    navigate('/auth'); // Navigate to /auth when clicked
  };

  return (
    <div className='verification'>
      {verificationStatus === 'Email verified. Returning to login.' && (
        <p onClick={handleVerifiedClick} style={{ cursor: 'pointer' }} className='register-btn'>
          EMAIL VERIFIED, CLICK TO RETURN TO LOGIN
        </p>
      )}
      {verificationStatus === 'Problem with verification. Please request a new token.' && <p>EMAIL NOT VERIFIED, PLEASE REQUEST NEW TOKEN</p>}
      {verificationStatus && verificationStatus.startsWith('An error') && <p>{verificationStatus}</p>}
    </div>
  );
}

export default VerificationCheck;

