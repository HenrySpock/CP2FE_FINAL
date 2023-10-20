import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';  // Make sure the path is correct
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteConfirmationModal from './DeleteConfirmationModal';


function Profile() {
  const { user, setUser, logout } = useContext(UserContext);  
  const navigate = useNavigate();

  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/user/${user.user_id}`);
          setUser(response.data);  // Update the user data in UserContext
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchUser();
    }
  }, [user, setUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const [editedUser, setEditedUser] = useState(user);  // Assuming user is the state holding the fetched user details

  useEffect(() => {
    if (user) {
      setEditedUser(user);
    }
  }, [user]);

  if (!editedUser) {
    return null;   
  }

  // const handleSave = async () => {
  //   try {
  //     await axios.patch(`http://localhost:5000/api/user/${user.user_id}`, editedUser);
  //     setUser(editedUser);  // Update the user data in UserContext
  //     navigate('/hub');
  //   } catch (error) {
  //     console.error('Error updating user details:', error);
  //   }
  // };

  // const handleSave = async () => {
  //   try {
  //     const updateData = {
  //       firstName: editedUser.firstName,
  //       lastName: editedUser.lastName,
  //       email: editedUser.email,
  //       securityQuestion: editedUser.securityQuestion,
  //       answer: editedUser.answer,
  //       adminKey: editedUser.adminKey,
  //     };
  //     await axios.patch(`http://localhost:5000/api/user/${user.user_id}`, updateData);
  //     setUser({ ...user, ...updateData });  // Update the user data in UserContext
  //     navigate('/hub');
  //   } catch (error) {
  //     console.error('Error updating user details:', error);
  //   }
  // };

  const handleSave = async () => {
    try {
        const updateData = {
            firstName: editedUser.firstName,
            lastName: editedUser.lastName,
            email: editedUser.email,
            securityQuestion: editedUser.securityQuestion,
            answer: editedUser.answer,
            adminKey: editedUser.adminKey,
            avatar: editedUser.avatar,
            bio: editedUser.bio
        };
        await axios.patch(`http://localhost:5000/api/user/${user.user_id}`, updateData);
        
        // Now fetch the updated user data
        const response = await axios.get(`http://localhost:5000/api/user/${user.user_id}`);
        setUser(response.data);  // Update the user data in UserContext, including the updated isAdmin value
        navigate('/hub');
        window.location.reload();
    } catch (error) {
        console.error('Error updating user details:', error);
    }
  };

  const handleDelete = async () => {
      if (window.confirm('Do you really want to do this?')) {

          setShowDeleteConfirmationModal(true);

          // try {
          //     await axios.delete(`http://localhost:5000/api/user/${user.user_id}`);
          //     // Log out the user and redirect to home
          //     // Assume logout() is a function that logs out the user
          //     logout();
          //     navigate('/');
          // } catch (error) {
          //     console.error('Error deleting user:', error);
          // }
      }
  };

return (
    <div>
      <DeleteConfirmationModal 
        show={showDeleteConfirmationModal} 
        onClose={() => setShowDeleteConfirmationModal(false)} 
      />
      <h3>Welcome to the profile editing page, {user ? user.username : 'Loading...'}</h3>
      <form>
        <label>
          First Name:
          <input 
            type="text" 
            name="firstName" 
            value={editedUser.firstName || ''} 
            onChange={handleInputChange} 
          />
        </label>
        <br />
        <label>
          Last Name:
          <input 
            type="text" 
            name="lastName" 
            value={editedUser.lastName || ''} 
            onChange={handleInputChange} 
          />
        </label>
        <br />
        <label>
          Email:
          <input 
            type="email" 
            name="email" 
            value={editedUser.email || ''} 
            onChange={handleInputChange} 
          />
        </label>
        <br />
        {
          user && !user.isAdmin ? (
            <label>
              Admin key:
              <input 
                type="text" 
                name="adminKey" 
                placeholder="Admin Key" 
                value={editedUser.adminKey || ''} 
                onChange={handleInputChange} 
              />
            </label>
          ) : null
        }
        <br />
        <label>
          Security question:
            <select name="securityQuestion" value={editedUser.securityQuestion || ''} onChange={handleInputChange} required>
              <option value="" disabled>Select a security question</option>
                <option value="What is the name of your first pet?">What is the name of your first pet?</option>
                <option value="What is your mother's maiden name?">What is your mother's maiden name?</option> 
                <option value="What is the worst Star Wars movie?">What is the worst Star Wars movie?</option>
                <option value="What is the best Led Zeppelin album?">What is the best Led Zeppelin album?</option>
            </select>
        </label>
        <br />
        <label>
          Answer:
            <input type="text" name="answer" placeholder="Answer" value={editedUser.answer || ''} onChange={handleInputChange} required />
        </label>
        <label>
          Avatar URL:
          <input 
            type="text" 
            name="avatar" 
            value={editedUser.avatar || ''} 
            onChange={handleInputChange} 
            placeholder="Enter URL of avatar image"
          />
        </label>
        <br />
        <label>
          Bio:
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
        <br />
      </form>
        <button onClick={() => navigate('/hub')}>Return to User Hub</button>
        <button onClick={handleSave}>Save Details</button>
        <button onClick={() => navigate('/password')}>Edit Password</button>
        <button onClick={handleDelete}>Delete Profile</button>
      </div>
      
  );
}

export default Profile;
