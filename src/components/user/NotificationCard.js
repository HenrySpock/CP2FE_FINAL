// NotificationCard.js
import React, { useState } from 'react';


const NotificationCard = ({ notification, onAccept, onDeny }) => {
  const { sender_id, recipient_id, notificationId } = notification;
  console.log('notification content: ', notification.content);
  // const notificationContent = JSON.parse(notification.content);

  let notificationContent;
  try {
      notificationContent = JSON.parse(notification.content);
  } catch (error) {
      console.error('Error parsing notification content:', error);
      // Handle error as necessary...
      return null;  // or some other appropriate fallback
  }

  return (
    <div className="notification-card">
      <p>
        <a href={notificationContent.url}>
          {notificationContent.username}
        </a>
        {notificationContent.text}
      </p>
      {notification.type === 'friend-request' && (
        <div>
          <button onClick={() => onAccept(sender_id, recipient_id, notificationId)}>Accept</button>
          <button onClick={() => onDeny(sender_id, recipient_id, notificationId)}>Deny</button>
        </div>
      )}
    </div>
  );
}

export default NotificationCard;

// let notificationContent;
// try {
//     notificationContent = JSON.parse(notification.content);
// } catch (error) {
//     console.error('Error parsing notification content:', error);
//     // Handle error as necessary...
//     return null;  // or some other appropriate fallback
// }

// // function NotificationCard({ notification, onDeny }) {
//   const NotificationCard = ({ notification, onAccept, onDeny }) => {
//   const { sender_id, recipient_id, notificationId } = notification; 
//   console.log ('notification: ', notification, ' sender_id: ', sender_id, ' recipient_id: ', recipient_id, ' notificationId: ', notificationId)
 

//   // const handleAccept = () => {
//     // Define your accept logic
//   // };

 

//   return (
//     <div className="notification-card">
//       <p>{notification.content}</p>
//       {notification.type === 'friend-request' && (
//         <div>
//           {/* <button onClick={() => handleAccept(sender_id, recipient_id)}>Accept</button> */}
//           {/* <button onClick={() => handleDeny(sender_id, recipient_id, notificationId)}>Deny</button> */}
//           <button onClick={() => onAccept(sender_id, recipient_id, notificationId)}>Accept</button>
//           <button onClick={() => onDeny(sender_id, recipient_id, notificationId)}>Deny</button>
          
//         </div>
//       )}
//     </div>
//   );
// }

// export default NotificationCard;