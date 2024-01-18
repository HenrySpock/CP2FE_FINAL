// NotificationCard.js
import React from 'react';
import './UserHub.css'
 
const NotificationCard = ({ notification, onAccept, onDeny }) => {
  const { sender_id, recipient_id, notificationId } = notification;
  
  let notificationContent;
  try {
      notificationContent = JSON.parse(notification.content);
      // console.log('NOTIFICATION CONTENT: ', notificationContent);
  } catch (error) {
      console.error('Error parsing notification content:', error);
      return null;  
  }

  return (
    <div className="notification-card">
      <p> 
        {/* Check if it's a 'like' notification and render likerUsername as a link */}
        {notification.type === 'profile-like' && (
          <a href={notificationContent.likerUrl}>
            {notificationContent.likerUsername}
          </a>
        )}

        {/* Check if it's a 'like' notification and render likerUsername as a link */}
        {notification.type === 'trip' && (
          <a href={notificationContent.likerUrl}>
            {notificationContent.likerUsername}
          </a>
        )}

        {/* Check if it's a 'like' notification and render likerUsername as a link */}
        {notification.type === 'travelog-like' && (
          <a href={notificationContent.likerUrl}>
            {notificationContent.likerUsername}
          </a>
        )}

        {/* Check if it's a 'like' notification and render likerUsername as a link */}
        {notification.type === 'image-like' && (
          <a href={notificationContent.likerUrl}>
            {notificationContent.likerUsername}
          </a>
        )}

        {/* Check if it's a 'like' notification and render likerUsername as a link */}
        {notification.type === 'comment-like' && (
          <a href={notificationContent.likerUrl}>
            {notificationContent.likerUsername}
          </a>
        )}

        {/* Check if it's a 'like' notification and render likerUsername as a link */}
        {notification.type === 'comment' && (
          <a href={notificationContent.url}>
            {notificationContent.username}
          </a>
        )}

        {/* Check if it's a 'friend-request' and render username as a link */}
        {notification.type === 'friend-request' && (
          <a href={`/public_profile/${notificationContent.username}`}>
            {notificationContent.username}
          </a>
        )}

        {/* Check if it's a 'friend-request-accepted' and render username as a link */}
        {notification.type === 'friend-request-accepted' && (
          <a href={`/public_profile/${notificationContent.username}`}>
            {notificationContent.username}
          </a>
        )}

        {/* Check if it's a 'trip-access-accepted' and render username as a link */}
        {notification.type === 'trip-access-granted' && (
          <a href={`/public_profile/${notificationContent.username}`}>
            {notificationContent.username}
          </a>
        )}

        {/* Check if it's a 'travelog-access-accepted' and render username as a link */}
        {notification.type === 'travelog-access-granted' && (
          <a href={`/public_profile/${notificationContent.username}`}>
            {notificationContent.username}
          </a>
        )}

        {/* Check if it's a 'new-follow' and render username as a link */}
        {notification.type === 'new-follow' && (
          <a href={`/public_profile/${notificationContent.username}`}>
            {notificationContent.username}
          </a>
        )}
        
        <span> </span>
        {notificationContent.text}
        {notificationContent.entityUrl && (
          <>
          <span> </span>
          <a href={notificationContent.entityUrl}>View</a>
          </>
        )}
      </p>

      {notification.type === 'friend-request' && (
        <div>
          <button className='accept-deny' onClick={() => onAccept(sender_id, recipient_id, notificationId)}>Accept</button>
          <button className='accept-deny' onClick={() => onDeny(sender_id, recipient_id, notificationId)}>Deny</button>
        </div>
      )}

    </div>
  );
}

export default NotificationCard;

