import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import NotificationCard from './NotificationCard';

function UserHub() {
  const { user } = useContext(UserContext);
  console.log('User Details on User Hub: ', user)
  const [travelogs, setTravelogs] = useState([]);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
 
  useEffect(() => {
    if (user) {  // Check if user is not null before proceeding
      const fetchUserTravelogs = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/user/${user.user_id}/travelogs`);
          console.log('Fetch Response on User Hub: ', response.data)
          setTravelogs(response.data);
        } catch (error) {
          console.error('Error fetching user travelogs:', error);
        }
      };

      fetchUserTravelogs();
    }
  }, [user]); 

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Make sure user is defined before trying to access user.user_id
        if (user) {
          console.log('user.user_id: ', user.user_id)
          const response = await fetch(`http://localhost:5000/api/notifications/${user.user_id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          const data = await response.json();
          setNotifications(data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [user]); 

  const handleDeny = async (sender_id, recipient_id, notificationId) => {
    try {
      const response = await fetch('http://localhost:5000/api/friends/request/deny', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender_id, recipient_id, notificationId })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      if (data.success) {
        setNotifications(notifications => notifications.filter(notification => notification.notificationId !== notificationId));
      }
    } catch (error) {
      console.error('Error denying friend request:', error);
    }
  };

  return (
  <div>
    <div>
      {user ? (  // Check if user is not null before rendering user details
        <div>
          <h2>Profile Details</h2>
          <p>Name: {user.firstName} {user.lastName}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <div className='hub-avatar'>
            <img src={ user.avatar } />
            </div>
          <div className='hub-bio'>
            <p>Bio: {user.bio}</p>
          </div>
          <br/>
        
          <button onClick={() => navigate('/profile')}>
            Edit Profile
          </button>  
            <div>
              <h2>Notifications</h2>
              {/* {notifications.map(notification => (
                <NotificationCard key={notification.notification_id} notification={notification} />
              ))} */}
              {notifications.map(notification => (
                <NotificationCard key={notification.notificationId} notification={notification} onDeny={handleDeny} />
              ))}
            </div>
     
            <div>
              <h2>Travel Logs</h2>
              {travelogs.map((travelog, index) => (
                <Link key={index} to={`/trav_det/${travelog.travelogId}`} style={{ textDecoration: 'none', color: 'inherit' }}> 
                <div className="hub-mini-card">
                   <div className="hub-mini-img-div"> 
                    {travelog.Images[0] && (  
                        <img 
                            className='hub-mini-img'
                            src={travelog.Images[0].image_url} 
                            alt={`Travelog Image 1`}
                        />
                    )}
                   </div>
                   <div className='hub-mini-card-text'>
                     <h3>{travelog.title}</h3>
                     <p>{travelog.site}</p>
                     <p>Visited On {new Date(travelog.dateVisited).toLocaleDateString('en-CA')}</p>
                     <p>In {travelog.city}, {travelog.country}</p> 
                   </div>
                </div>
              </Link>
              ))}
            </div>
        </div>
      ) : (
        <p>Loading...</p>  // Display a loading message while user is null
      )}
    </div>
 

 
  </div>
  );
}

export default UserHub;
