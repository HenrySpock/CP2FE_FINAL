import React from 'react';
import './NotificationCardModal.css'; 

const NotificationCardModal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;



  return (
    <div className="NotificationCardModal-overlay">
      <div className="notification-card-modal-content">
        <h2>All Notifications</h2>
        <button onClick={onClose} className="notification-card-modal-btn">Close</button>
        {children}
      </div>
    </div>
  );
};

export default NotificationCardModal;


  
 