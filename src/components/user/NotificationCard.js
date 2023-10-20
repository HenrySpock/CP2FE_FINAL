// NotificationCard.js
import React, { useState } from 'react';

function NotificationCard({ notification, onDeny }) {
  const { sender_id, recipient_id, notificationId } = notification; 
  console.log ('notification: ', notification, ' sender_id: ', sender_id, ' recipient_id: ', recipient_id, ' notificationId: ', notificationId)
 

  const handleAccept = () => {
    // Define your accept logic
  };

  // async function handleDeny(sender_id, recipient_id, notificationId) {
  //   try {
  //     const response = await fetch('http://localhost:5000/api/friends/request/deny', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ sender_id, recipient_id, notificationId })
  //     });
  
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok ' + response.statusText);
  //     }
  
  //     const data = await response.json();
  //     if (data.success) {
  //       // Optionally, refresh notifications or redirect user
  //     }
  //   } catch (error) {
  //     console.error('Error denying friend request:', error);
  //   }
  // }


  

  return (
    <div className="notification-card">
      <p>{notification.content}</p>
      {notification.type === 'friend-request' && (
        <div>
          <button onClick={() => handleAccept(sender_id, recipient_id)}>Accept</button>
          {/* <button onClick={() => handleDeny(sender_id, recipient_id, notificationId)}>Deny</button> */}
          <button onClick={() => onDeny(sender_id, recipient_id, notificationId)}>Deny</button>
        </div>
      )}
    </div>
  );
}

export default NotificationCard;
