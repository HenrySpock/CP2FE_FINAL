import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteConfirmationModal from './DeleteConfirmationModal';

import './Profile.css'

function Profile() {
  const { user, setUser } = useContext(UserContext);  
  const navigate = useNavigate();

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const clearErrorMessage = () => setErrorMessage('');
 
  const [editedUser, setEditedUser] = useState(null);

  // Toggle tooltips state and update in the backend
  const toggleTooltips = async () => {
    try {
      const updatedUser = {
        ...user,
        tooltips: !user.tooltips
      };

      await axios.patch(`https://lgcbe.onrender.com/user/api/user/${user.user_id}`, {
        tooltips: !user.tooltips
      });

      // Update UserContext
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating tooltips setting:', error);
    }
  };

  const checkBannedEmail = async (email) => {
    try {
      const response = await fetch(`https://lgcbe.onrender.com/feedback/api/check-banned-email?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      return response.ok ? true : data.message;
    } catch (error) {
      console.error('Error during email check:', error);
      return 'Error checking email';
    }
  };
  
  const checkSuspension = async (email) => {
    try {
      const response = await fetch(`https://lgcbe.onrender.com/feedback/api/check-suspension?user_email=${encodeURIComponent(email)}`);
      const data = await response.json();
      return data.isSuspended ? `Email suspended for ${data.remainingTime} more hours.` : true;
    } catch (error) {
      console.error('Error during suspension check:', error);
      return 'Error checking suspension';
    }
  };

  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`https://lgcbe.onrender.com/user/api/user/${user.user_id}`);
          console.log('response.data from user fetch on profile.js: ', response.data)
          setUser(response.data);  // Update the user data in UserContext
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchUser();
    }
  }, [user, setUser]); 

  const handleInputChange = (event) => {
    clearErrorMessage();
    const { name, value } = event.target;
    if (name === "answer" && value.trim() === "") {
      setEditedUser(prevUser => ({ ...prevUser, answer: null }));
    } else {
      setEditedUser(prevUser => ({ ...prevUser, [name]: value }));
    }
  };  

  useEffect(() => {
    if (user) {
      setEditedUser(prevState => ({
        ...user,
        answer: prevState ? prevState.answer : null,  
      }));
    }
  }, [user]);

  if (!editedUser) {
    return null;   
  }
 
  const handleSave = async () => {
    clearErrorMessage();
    const bannedEmailCheck = await checkBannedEmail(editedUser.email);
    if (bannedEmailCheck !== true) {
      setErrorMessage(bannedEmailCheck);
      return;
    }
  
    const suspensionCheck = await checkSuspension(editedUser.email);
    if (suspensionCheck !== true) {
      setErrorMessage(suspensionCheck);
      return;
    }

    try {
        const updateData = {
            first_name: editedUser.first_name,
            last_name: editedUser.last_name,
            email: editedUser.email,
            securityQuestion: editedUser.securityQuestion, 
            adminKey: editedUser.adminKey,
            avatar: editedUser.avatar,
            bio: editedUser.bio
        };

        if (editedUser.answer && editedUser.answer.trim() !== '') { 
          updateData.answer = editedUser.answer;
        }

        await axios.patch(`https://lgcbe.onrender.com/user/api/user/${user.user_id}`, updateData);
         
        const response = await axios.get(`https://lgcbe.onrender.com/user/api/user/${user.user_id}`);
        setUser(response.data);  // Update the user data in UserContext, including the updated isAdmin value
        navigate('/hub');
        window.location.reload();
    } catch (error) {
        console.error('Error updating user details:', error);
        setErrorMessage('Error updating user details');
    }
  };

  const handleDelete = async () => {
      if (window.confirm('Do you really want to do this?')) {

          setShowDeleteConfirmationModal(true);
      }
  };

  if (!editedUser) {
    return <div>Loading...</div>;
  }

return (
    <div className='profile-slate'>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <DeleteConfirmationModal 
        show={showDeleteConfirmationModal} 
        onClose={() => setShowDeleteConfirmationModal(false)} 
      />
      <h3>Welcome to the profile editing page, {user ? user.username : 'Loading...'}</h3>
      <form className='profile-form' onChange={handleInputChange}>




        <div className='prof-vert'>

          <div>
            <p>First Name:</p>
            <label>          
              <input className='profile-form' 
                type="text" 
                name="first_name" 
                value={editedUser.first_name || ''} 
                onChange={handleInputChange} 
              />
            </label>
          </div>

          <div>
            <p>Last Name:</p>
            <label>
              <input className='profile-form' 
                type="text" 
                name="last_name" 
                value={editedUser.last_name || ''} 
                onChange={handleInputChange} 
              />
            </label>
          </div>

          <div>
            <p>Email:</p>
            <label>
              <input className='profile-form' 
                type="email" 
                name="email" 
                value={editedUser.email || ''} 
                onChange={handleInputChange} 
              />
            </label> 
          </div>

          <div>

            {
              user && !user.isAdmin ? (
              <>
              <p>Admin key:</p>
                <label>
                  <input className='profile-form' 
                    type="text" 
                    name="adminKey" 
                    placeholder="Admin Key" 
                    value={editedUser.adminKey || ''} 
                    onChange={handleInputChange} 
                  />
                </label>
              </>
              ) : null
            }
          </div>

          <div>
            <p>Avatar URL:</p>
            <label>
              <input className='profile-form' 
                type="text" 
                name="avatar" 
                value={editedUser.avatar || ''} 
                onChange={handleInputChange} 
              />
            </label>
          </div>


        </div>  

        <div className='prof-vert'>
          <div>
            <p>Security Question:</p>
            <label>
              <select className='profile-form'
                name="securityQuestion" 
                value={editedUser.securityQuestion || 'Select a security question'} 
                onChange={handleInputChange}
              >
                <option value="What is the name of your first pet?">What is the name of your first pet?</option>
                <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                <option value="What is the worst Star Wars film?">What is the worst Star Wars film?</option>
                <option value="What is the best Exteme album?">What is the best Exteme album?</option>
                <option value="What is your favorite book?">What is your favorite book?</option>
                {/* other options */}
              </select>
            </label>
          </div>

          <div>
            <p>Security Answer:</p>
            <label>
              <input 
                className='profile-form' 
                type="text" 
                name="answer" 
                placeholder="New Security Answer (leave blank if unchanged)" 
                onChange={handleInputChange} 
              />
            </label>
          </div>
    
          <div>
            <p>Bio:</p>
            <label className='profile-bio'>
              <textarea 
                name="bio" 
                value={editedUser.bio || ''} 
                onChange={handleInputChange} 
                placeholder="Tell us about yourself"
                rows="4"
                cols="50"
                maxLength={1000}
              />
            </label>
          </div>
          
        </div>
  
      </form>

        <div className='profile-buttons'>
          <button className='profile-btn' onClick={() => navigate('/hub')}>Return to User Hub</button>
          <button className='profile-btn' onClick={toggleTooltips}> {user.tooltips ? 'Turn Tooltips Off' : 'Turn Tooltips On'} </button>
          <button className='profile-btn' onClick={handleSave}>Save Details</button>
          <button className='profile-btn' onClick={() => navigate('/password')}>Edit Password</button>
          <button className='profile-btn' onClick={() => navigate('/disconnections')}>Disconnections</button>
          <button className='profile-btn' onClick={handleDelete}>Delete Profile</button>
        </div>

    </div>
      
  );
}

export default Profile;
