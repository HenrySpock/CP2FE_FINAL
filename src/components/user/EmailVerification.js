 

import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function EmailVerification() {
  // console.log("EmailVerification component mounting");
  const navigate = useNavigate();
  const location = useLocation(); 
  const verificationStatusRef = useRef('');   

  useEffect(() => {
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const verifyEmailToken = async (token) => {
    // console.log("DEBUG Verifying token:", token);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify_email?token=${encodeURIComponent(token)}`, {
        method: 'PATCH', 
      });

      if (response.ok) {
        const data = await response.json(); 
        // console.log('data from email verification: ', data)  
        setTimeout(() =>  
          navigate(`/verification_check?email=${data.email}`) 
        , 2000);
      } else { 
      }
    } catch (error) {
      console.error('Error during email verification:', error); 
    }
    // console.log("DEBUG Verification process completed for token:", token);
  };

  if (token) {
    // console.log("DEBUG Starting verification process for token:", token);
    verifyEmailToken(token);
  }
}, [location, navigate]);

  return (
    <div>
      <p>{verificationStatusRef.current}</p>
    </div>
  );
}

export default EmailVerification;


