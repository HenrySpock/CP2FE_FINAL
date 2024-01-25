import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext';  
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; 
import './Profile.css'

function DeleteConfirmationModal({ show, onClose }) {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.delete(`https://lgcbe.onrender.com/user/api/user/${user.user_id}`, { data: { password } });
      // Log out the user and redirect to home
      logout();
      navigate('/');
      onClose();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}> 
      <Modal.Body>
        <Modal.Title>Confirm Deletion</Modal.Title>
        <input 
          type="password" 
          placeholder="Enter password to confirm deletion" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />        
        <Button className='del-con-btn' variant="danger" onClick={handleSubmit}>Delete</Button>
        <Button className='del-con-btn' variant="secondary" onClick={onClose}>Cancel</Button>
      </Modal.Body> 
    </Modal>
  );
}

export default DeleteConfirmationModal;