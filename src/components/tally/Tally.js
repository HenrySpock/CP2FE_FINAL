import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../user/UserContext';  


const Tally = () => { 
  const { user, isAuthenticated, logout,
  

    //TALLYING 05
    setUnreadUserNotifications,
    setUnreadUserMessages,
    setUnreadAdminUserMessages,
    setUnreadAdminReports,
  } = useContext(UserContext);
   
  const [maintenanceMessage, setMaintenanceMessage] = useState(''); 

  useEffect(() => {
    let intervalId;  
    const fetchCounts = async () => {
      if (isAuthenticated && user) {
        try {
            // TALLYING 06 
          

          const userNotificationsResponse = await fetch(`https://lgcbe.onrender.com/tally/unread-user-notifications?userId=${user.user_id}`, {
            method: 'GET', 
          });
 
          const userMessagesResponse = await fetch(`https://lgcbe.onrender.com/tally/unread-user-messages?userId=${user.user_id}&isAdmin=${user.isAdmin}`, {
            method: 'GET',
          });

          const adminMessagesResponse = await fetch(`https://lgcbe.onrender.com/tally/unread-admin-messages?userId=${user.user_id}`, {
            method: 'GET',
          });
          
          const adminReportsResponse = await fetch(`https://lgcbe.onrender.com/tally/unread-admin-reports`, {
            method: 'GET',
          });
  
          const checkUserStatus = async () => {
            if (user && isAuthenticated) {
              // Check for maintenance mode
              const maintenanceResponse = await fetch('https://lgcbe.onrender.com/api/maintenance/status');
              const maintenanceData = await maintenanceResponse.json();

              if (maintenanceData.maintenanceActive && !user.isAdmin) {
                logout();
                return;
              }

              // Check for suspension
              const suspensionResponse = await fetch(`https://lgcbe.onrender.com/feedback/api/check-suspension?userEmail=${encodeURIComponent(user.email)}`);
              const suspensionData = await suspensionResponse.json();
              if (suspensionData.isSuspended) {
                logout();
                return;
              }

              // Check for banned email
              const bannedEmailResponse = await fetch(`https://lgcbe.onrender.com/feedback/api/check-banned-email?email=${encodeURIComponent(user.email)}`);
              const bannedEmailData = await bannedEmailResponse.json();
              if (bannedEmailData.message === 'Invalid email address. Use another.') {
                logout();
                return;
              }
            }

          };
          checkUserStatus();

          const checkForMaintenance = async () => {
            try {
              const maintenanceResponse = await fetch('https://lgcbe.onrender.com/api/maintenance/status');
              
              const maintenanceData = await maintenanceResponse.json();

              if (maintenanceData.maintenanceInfo) {
                const startTime = new Date(maintenanceData.maintenanceInfo.timestamp_start);
                const endTime = new Date(maintenanceData.maintenanceInfo.timestamp_end);
                const now = new Date();
          
                if (startTime > now && startTime - now <= 24 * 60 * 60 * 1000) {
                  const formatDateTime = (date) => {
                    const hours = date.getHours().toString().padStart(2, '0');
                    const minutes = date.getMinutes().toString().padStart(2, '0');
                    const day = date.getDate().toString().padStart(2, '0');
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');  
                    const year = date.getFullYear();
                    return `${hours}:${minutes}, ${month}/${day}/${year}`;
                  };
          
                  const formattedStartTime = formatDateTime(startTime);
                  const formattedEndTime = formatDateTime(endTime);
          
                  setMaintenanceMessage(`The server will be down for maintenance from ${formattedStartTime} to ${formattedEndTime}.`);
                } else {
                  setMaintenanceMessage('');
                }
              }
            } catch (error) {
              console.error('Error fetching maintenance information:', error);
            }
          };
          checkForMaintenance()

          if (userNotificationsResponse.ok && userMessagesResponse.ok && adminMessagesResponse.ok && adminReportsResponse.ok) { 
            // TALLYING 07
            const userNotificationsData = await userNotificationsResponse.json();
            const userMessagesData = await userMessagesResponse.json();
            const adminMessagesData = await adminMessagesResponse.json();
            const adminReportsData = await adminReportsResponse.json();

            setUnreadUserNotifications(userNotificationsData.unreadCount);
            setUnreadUserMessages(userMessagesData.unreadCount);
            setUnreadAdminUserMessages(adminMessagesData.unreadCount);
            setUnreadAdminReports(adminReportsData.unreadCount);
          } else {
            console.error('Failed to fetch unread counts');
          }
        } catch (error) {
          console.error('Error fetching counts:', error);
        }
      }
    };

    // Start polling every second
    if (isAuthenticated  
      ) { 
      intervalId = setInterval(fetchCounts, 10000);
    }

    // Clean up the interval on component unmount  
    return () => {
      clearInterval(intervalId);
    };
  }, [user, isAuthenticated, logout, 

    //TALLYING 08
    setUnreadUserNotifications,
    setUnreadUserMessages,
    setUnreadAdminUserMessages,
    setUnreadAdminReports
    
  ]);

  return (
    <div>  
      {maintenanceMessage && (
        <div className="maintenance-notification">
          {maintenanceMessage}
        </div>
      )}
    </div>
  );
};

export default Tally;
