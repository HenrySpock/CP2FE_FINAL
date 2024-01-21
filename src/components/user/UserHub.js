import React, { useState, useEffect, useContext, useCallback } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NotificationCard from './NotificationCard';
import NotificationCardModal from './NotificationCardModal';
 
import { useWebSocket } from '../interactions/WebSocketProvider';
import TravelogFilter from '../travlog/TravelogFilter';
import TripFilter from '../trips/TripFilter';
 
import UserHubMap from './UserHubMap';

import './UserHub.css'
import MapSorting from './MapSorting'

function UserHub() {
  // State for holding notifications
  const [notifications, setNotifications] = useState([]);  
  const [trips, setTrips] = useState([]);
  const { user } = useContext(UserContext);
  // console.log('User Details on User Hub: ', user)
  const [travelogs, setTravelogs] = useState([]);
  const navigate = useNavigate();

  const [isGrantee, setIsGrantee] = useState(false);

  // SORTING 
  const [filteredTravelogs, setFilteredTravelogs] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);

  const [isNotificationCardModalOpen, setIsNotificationCardModalOpen] = useState(false);
  // console.log('USERHUB TRAVELOGS: ', travelogs, 'TRIPS: ', trips)
  // Function to add a new notification to state
  const addNotification = (newNotification) => {
    setNotifications(prevNotifications => [newNotification,...prevNotifications]);
  };
 
 
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      // console.log('clicked')
      closeNotificationCardModal();
    }
  };

   const openNotificationCardModal = () => {
    setIsNotificationCardModalOpen(true);
  };

  // Function to close the modal
  const closeNotificationCardModal = () => {
    setIsNotificationCardModalOpen(false);
  };

  // SORTING  

  const handleVisibilityChange = useCallback((newFilteredTravelogs, newFilteredTrips) => {
    setFilteredTravelogs(newFilteredTravelogs);
    setFilteredTrips(newFilteredTrips);
  }, []);
  
 
  const { socket } = useWebSocket();  

  // Function to delete a notification from state
  const deleteNotification = (notificationId) => {
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification.notificationId !== notificationId));
  };

  useEffect(() => {
    const checkPermissions = async () => {
        try {
            const response = await fetch(`https://lgcbe.onrender.com/api/permissions/check/${user.user_id}`);
            if (response.ok) {
                const { hasPermissions } = await response.json();
                setIsGrantee(hasPermissions);
            }
        } catch (error) {
            console.error('Error checking permissions:', error);
        }
    };

    if (user) {
        checkPermissions();
    }
  }, [user]);

  const handlePrivateLogsClick = () => {
      navigate(`/private_logs/${user.user_id}`);
  };

  useEffect(() => {
    if (socket) {
        // Existing listeners
        socket.on('new-notification', (notification) => {
            // console.log('Notification received:', notification);
            addNotification(notification);
        });
        socket.on('notification-deleted', (data) => {
            // console.log('Notification deleted:', data);
            deleteNotification(data.notificationId);
        });
        // New listener for unfriend event...
        socket.on('unfriend', (data) => {
          // console.log('Unfriend event received:', data);
           
        });
        socket.on('remove-follow-notification', (data) => {
          // console.log('Follow notification removed:', data);
          // console.log('data.notificationId for deleting: ', data.notificationId)
          deleteNotification(data.notificationId);  
        });

        return () => {
            // Existing unbinds
            socket.off('new-notification');
            socket.off('notification-deleted');

            // New unbind for unfriend event
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

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          // Fetch travelogs
          const travelogsResponse = await axios.get(`https://lgcbe.onrender.com/travelog/api/user/${user.user_id}/travelogs`);
          // SORTING 
          setTravelogs(travelogsResponse.data);
          setFilteredTravelogs(travelogsResponse.data);

          // Fetch trips
          const tripsResponse = await axios.get(`https://lgcbe.onrender.com/trip/api/trips/${user.user_id}`);
          // console.log('tripsResponse: ', tripsResponse)
          // SORTING 
          setTrips(tripsResponse.data); 
          setFilteredTrips(tripsResponse.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }
  }, [user]); // This will re-run when the user object changes

  

  useEffect(() => {
    // console.log('trips:', trips);
  }, [trips]);
  
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Make sure user is defined before trying to access user.user_id
        if (user) {
          // console.log('user.user_id: ', user.user_id)
          const response = await fetch(`https://lgcbe.onrender.com/api/notifications/${user.user_id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          const data = await response.json();
          setNotifications(data);
          // console.log('notifications: ', data)
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [user]); 

  const handleDeny = async (sender_id, recipient_id, notificationId) => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/api/friends/request/deny', {
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

  const handleAccept = async (sender_id, recipient_id, notification_id) => {
    
    try {
      const response = await fetch('https://lgcbe.onrender.com/api/friends/request/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender_id, recipient_id, notification_id })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
  
      const data = await response.json();
      if (data.success) {
        // Remove the accepted notification from state
        setNotifications(notifications => notifications.filter(notification => notification.notification_id !== notification_id));
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

// };

const handleDeleteNotification = async (notificationId) => {
  try {
    const response = await fetch(`https://lgcbe.onrender.com/api/notifications/delete/${notificationId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete notification');
    }

    // Update the state to remove the notification from the list
    deleteNotification(notificationId);

  } catch (error) {
    console.error('Error deleting notification:', error);
  }
};
 
  useEffect(() => {
    const markNotificationsAsRead = async () => {
      if (user && user.user_id) {
        try {
          await fetch(`https://lgcbe.onrender.com/tally/mark-notifications-read/${user.user_id}`, {
            method: 'PATCH'
          });
        } catch (error) {
          console.error('Error marking notifications as read:', error);
        }
      }
    };
  
    markNotificationsAsRead();
  }, [user]);

  // console.log('Filtered Travelogs:', filteredTravelogs, 'Filtered Trips:', filteredTrips);

  return (
  <div>

      {user ? (  // Check if user is not null before rendering user details
      
      <div>
        
        <div className='home-center'>
            <div>
              <h2>
                {user ? `Welcome to your dashboard, ${user.username}!` : null}
              </h2>
            </div>            
        </div>

        <div className='userhub-row'> 
          <div className='hub-map-col hubmcl'>
            <h2>Sort Your Entries</h2>

            <div> 
              <MapSorting 
                  travelogs={travelogs}
                  trips={trips} 
                  onVisibilityChange={handleVisibilityChange}
              /> 
            </div>
            <div className='notification-div'>
              <div className='notification-heading'>
                <h2>Notifications</h2> 
                <button className='see-all-btn' onClick={openNotificationCardModal}>See All</button>
              </div> 

              {notifications.map(notification => ( 
                <div className='notification-slate' key={notification.notification_id}>
                  <NotificationCard notification={notification} onAccept={handleAccept} onDeny={handleDeny} />
                  {notification && (
                    <button className='notification-delete-btn' onClick={() => handleDeleteNotification(notification.notification_id)}>Delete</button>
                  )} 
                </div>
              ))}


              
              <div className={`notification-card-modal-overlay ${isNotificationCardModalOpen ? 'open' : ''}`} onClick={handleOverlayClick}>
                <NotificationCardModal isOpen={isNotificationCardModalOpen} onClose={closeNotificationCardModal}>
                  {notifications.map(notification => ( 
                    <div className='notification-slate' key={notification.notificationId}>
                      <NotificationCard notification={notification} onAccept={handleAccept} onDeny={handleDeny} />
                      {notification && (
                        <button className='notification-delete-btn' onClick={() => handleDeleteNotification(notification.notificationId)}>Delete</button>
                      )} 
                    </div>
                  ))}
                </NotificationCardModal>
              </div>
            </div> 
        </div>
          
          <span> 
            <UserHubMap travelogs={filteredTravelogs} trips={filteredTrips}/> 
          </span> 
 
            <div className='hub-map-col hubmcr'> 
                <h2>Profile Details</h2>
                <div className='hub-avatar'>
                  <img src={ user.avatar } alt="user avatar"/>
                </div>
                <p>Name: {user.firstName} {user.lastName}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <button onClick={() => navigate('/connections')} className='hub-btn'>
                  See Connections
                </button>
                <button onClick={() => navigate(`/public_profile/${user.username}`)} className='hub-btn'>
                  See Public Profile
                </button>
                <button onClick={() => navigate('/profile')} className='hub-btn'>
                  Edit Profile
                </button>  
                  {isGrantee && (
                    <button className='hub-btn' onClick={handlePrivateLogsClick}>
                      Private Logs
                    </button>
                  )}
                <br/> 
            </div> 

        </div>



              


            <div className='filters'>
              <TripFilter />
              <TravelogFilter />
            </div>
      </div>
      ) : (
        <p>Loading...</p>  // Display a loading message while user is null
      )}

  </div>
  );
}

export default UserHub;

 