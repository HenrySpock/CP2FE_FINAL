// Password.js
import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './Password.css'

function Password() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypedPassword, setRetypedPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSavePassword = async () => {
    if (newPassword !== retypedPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.patch(`https://lgcbe.onrender.com/user/api/user/${user.user_id}/password`, {
        oldPassword,
        newPassword
      });
      navigate('/profile');
    } catch (err) {
      console.error('Error updating password:', err);
      setError('Failed to update password');
    }
  };

  return (
    <div className='password-slate'>
      <input className='password-reset-input'
        type="password" 
        placeholder="Old Password" 
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)} 
      />
      <input className='password-reset-input'
        type="password" 
        placeholder="New Password" 
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)} 
      />
      <input className='password-reset-input'
        type="password" 
        placeholder="Retype New Password" 
        value={retypedPassword}
        onChange={(e) => setRetypedPassword(e.target.value)} 
      />
      {error && <div>{error}</div>}
      <button className='password-btn' onClick={() => navigate('/profile')}>Return to Profile Page</button>
      <button className='password-btn' onClick={handleSavePassword}>Save Password</button>
    </div>
  );
}

export default Password;
