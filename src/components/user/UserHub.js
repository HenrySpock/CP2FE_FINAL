import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import NotificationCard from './NotificationCard';
 
import { useWebSocket } from '../interactions/WebSocketProvider';
import TravelogFilter from '../travlog/TravelogFilter';

 
function UserHub() {
  // State for holding notifications
  const [notifications, setNotifications] = useState([]);
  const [isFriend, setIsFriend] = useState(true);   

  // Function to add a new notification to state
  const addNotification = (newNotification) => {
    setNotifications(prevNotifications => [...prevNotifications, newNotification]);
  };

  // const socket = useWebSocket();
  const { socket } = useWebSocket();  

  // Function to delete a notification from state
  const deleteNotification = (notificationId) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.notificationId !== notificationId));
  };

  useEffect(() => {
    if (socket) {
        // Existing listeners...
        socket.on('new-notification', (notification) => {
            console.log('Notification received:', notification);
            addNotification(notification);
        });
        socket.on('notification-deleted', (data) => {
            console.log('Notification deleted:', data);
            deleteNotification(data.notificationId);
        });
        // New listener for unfriend event...
        socket.on('unfriend', (data) => {
          console.log('Unfriend event received:', data);
          // Assuming the data contains the IDs of the two users involved in the unfriend event 
        });
        socket.on('remove-follow-notification', (data) => {
          // console.log('Follow notification removed:', data);
          console.log('data.notificationId for deleting: ', data.notificationId)
          deleteNotification(data.notificationId);  // Assuming data contains notificationId
        });

        return () => {
            // Existing unbinds...
            socket.off('new-notification');
            socket.off('notification-deleted');

            // New unbind for unfriend event...
            socket.off('unfriend');
        };
    }
}, [socket]);

useEffect(() => {
  if (socket) {
      socket.on('error', (error) => {
          console.error('Socket error:', error);
      });
  }
}, [socket]);

  const { user } = useContext(UserContext);
  console.log('User Details on User Hub: ', user)
  const [travelogs, setTravelogs] = useState([]);
  const navigate = useNavigate();

  // const [notifications, setNotifications] = useState([]);
 
  useEffect(() => {
    if (user) {  // Check if user is not null before proceeding
      const fetchUserTravelogs = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/user/${user.user_id}/travelogs`);
          // console.log('Fetch Response on User Hub: ', response.data)
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

  const handleAccept = async (sender_id, recipient_id, notificationId) => {
    try {
      const response = await fetch('http://localhost:5000/api/friends/request/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender_id, recipient_id, notificationId })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
  
      const data = await response.json();
      if (data.success) {
        // Remove the accepted notification from state
        setNotifications(notifications => notifications.filter(notification => notification.notificationId !== notificationId));
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

// };

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
          <button onClick={() => navigate('/connections')}>
            See Connections
          </button>
          <button onClick={() => navigate('/profile')}>
            Edit Profile
          </button>  
            <div>
              <h2>Notifications</h2>
              {/* {notifications.map(notification => (
                <NotificationCard key={notification.notification_id} notification={notification} />
              ))} */}
              {notifications.map(notification => ( 
                <NotificationCard key={notification.notificationId} notification={notification} onAccept={handleAccept} onDeny={handleDeny} />
              ))}
            </div>
            <TravelogFilter />
        </div>
      ) : (
        <p>Loading...</p>  // Display a loading message while user is null
      )}
    </div> 
  </div>
  );
}

export default UserHub;


 
  // <div>
  //   <h2>Travel Logs</h2>
  //   {travelogs.map((travelog, index) => (
  //     <Link key={index} to={`/trav_det/${travelog.travelogId}`} style={{ textDecoration: 'none', color: 'inherit' }}> 
  //     <div className="hub-mini-card">
  //         <div className="hub-mini-img-div"> 
  //         {travelog.Images[0] && (  
  //             <img 
  //                 className='hub-mini-img'
  //                 src={travelog.Images[0].image_url} 
  //                 alt={`Travelog Image 1`}
  //             />
  //         )}
  //         </div>
  //         <div className='hub-mini-card-text'>
  //           <h3>{travelog.title}</h3>
  //           <p>{travelog.site}</p>
  //           <p>Visited On {new Date(travelog.dateVisited).toLocaleDateString('en-CA')}</p>
  //           <p>In {travelog.city}, {travelog.country}</p> 
  //         </div>
  //     </div>
  //   </Link>
  //   ))}
  // </div>  