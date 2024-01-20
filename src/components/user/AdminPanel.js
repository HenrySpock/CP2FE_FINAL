import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../user/UserContext'; 
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';  

import MessageConversationModal from '../interactions/MessageConversationModal'

import './AdminPanel.css'

function AdminPanel() {
  const { isAdmin } = useContext(UserContext);
  const { user } = useContext(UserContext); 

  const [reportedFeedback, setReportedFeedback] = useState([]); 

  const [complaintVisibility, setComplaintVisibility] = useState([]);

  const [suspendedUsers, setSuspendedUsers] = useState(new Set());

  const [activeConversationUser, setActiveConversationUser] = useState(null);

  const [unreadCounts, setUnreadCounts] = useState({});
  
  const navigate = useNavigate();

  const openConversationWithUser = (user) => {
    const newUser = { ...user, isWarning: true };
    // console.log('NEWUSER: ', newUser) 
    setActiveConversationUser(newUser);
    markMessagesAsRead(user.user_id);
    // Log the object being set
    // console.log('New active conversation user:', newUser);
    // MESSAGE COUNT BADGES 
    setUnreadCounts(prevCounts => ({ ...prevCounts, [newUser.user_id]: 0 }));
  };

  const handleNavigateToMaintenance = () => {
    navigate('/maintenance');
  };

  // MESSAGE COUNT BADGES 
  const renderBadge = (count) => {
    return count > 0 ? (
      <span className="badge badge-blue">
        {count}
      </span>
    ) : null;
  };

  const closeConversationModal = () => {
    setActiveConversationUser(null);
  };

  const markMessagesAsRead = (conversationId) => {
    fetch(`https://lgcbe.onrender.com/tally/mark-messages-as-read`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
      },
      body: JSON.stringify({
        userId: user.user_id,
        conversationId: conversationId
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Messages marked as read:', data);
    })
    .catch(error => console.error('Error marking messages as read:', error));
  };

  useEffect(() => {
    // Initialize the complaint visibility array with false values
    setComplaintVisibility(new Array(reportedFeedback.length).fill(false));
  }, [reportedFeedback]);
  
  // MESSAGE COUNT BADGES 
  // useEffect for fetching unread message counts 
  useEffect(() => {
    if (user) {
      const intervalId = setInterval(async () => {
        const newUnreadCounts = {};
  
        for (const report of reportedFeedback) {
          // Extracting the correct user ID based on the type of report
          const otherUserId = report.ReportedUser?.user_id || report.ReportedTrip?.User.user_id || report.ReportedTravelog?.User.user_id || report.ReportedComment?.user_id;
          // console.log('otheruserId: ', otherUserId)
          if (otherUserId) {
            const response = await fetch(`https://lgcbe.onrender.com/tally/unread-messages-count?adminUserId=${user.user_id}&otherUserId=${otherUserId}`);
            if(response.ok) {
              const data = await response.json();
              newUnreadCounts[otherUserId] = data.unreadCount;
              // console.log('data.unreadCount: ', data.unreadCount)
            } else {
              console.error('Failed to fetch unread messages count');
            }
          }
        }
  
        setUnreadCounts(newUnreadCounts);
      }, 600000); // Fetch every 60 seconds
  
      return () => clearInterval(intervalId);
    }
  }, [reportedFeedback, user]);
// console.log('user.user_id: ', user.user_id)

  const isReportOlderThan84Hours = (createdAt) => {
    const reportDate = new Date(createdAt);
    const now = new Date();
    const hoursDiff = (now - reportDate) / (1000 * 60 * 60); // Convert milliseconds difference to hours
    return hoursDiff > 84;
  };

  const oldReportStyle = {
    backgroundColor: 'red', 
  };

  // SUSTOG: REPLACES ABOVE - ADDS EMAIL CHECK FOR SUSPENSIONS ON MOUNT: 
  useEffect(() => {
    async function fetchReportedFeedback() {
      try {
        const response = await axios.get('https://lgcbe.onrender.com/feedback/api/reported-feedback');
        const reportedFeedbackData = response.data;
        // console.log('Reported Travelogs: ', response.data)

        // Fetch suspension status for each reported feedback
        const suspensionChecks = reportedFeedbackData.map(async (report) => {
          const userEmail = report.ReportedUser?.email || report.ReportedTrip?.User.email || report.ReportedTravelog?.User.email || report.ReportedComment?.user.email;
          if (userEmail) {
            const suspensionResponse = await axios.get(`https://lgcbe.onrender.com/feedback/api/check-suspension?userEmail=${userEmail}`);
            return { userEmail, isSuspended: suspensionResponse.data.isSuspended };
          }
          return null;
        });

        // Wait for all suspension checks to complete
        const suspensions = await Promise.all(suspensionChecks);
        const suspendedUsersSet = new Set(suspensions.filter(s => s?.isSuspended).map(s => s.userEmail));
        setSuspendedUsers(suspendedUsersSet);

        setReportedFeedback(reportedFeedbackData);
      } catch (error) {
        console.error('Error fetching reported feedback:', error);
      }
    }
  
    fetchReportedFeedback();
  }, []);
    
  const handleClearReport = async (reportId, index) => {
    try {
      const response = await axios.patch(`https://lgcbe.onrender.com/feedback/api/clear-report/${reportId}/clear`, {
        cleared: true,
        adminUserId: user.user_id
      });
      if (response.status === 200) {

        // Remove the cleared report from the local state
        const updatedReportedFeedback = reportedFeedback.filter((report) => report.reportId !== reportId);
        setReportedFeedback(updatedReportedFeedback);

        // Update the complaint visibility for the cleared report
        const updatedComplaintVisibility = [...complaintVisibility];
        updatedComplaintVisibility[index] = false;
        setComplaintVisibility(updatedComplaintVisibility);

      } else {
        console.error('Failed to clear the report.');
      }
    } catch (error) {
      console.error('Error clearing report:', error);
    }
  };

  // SUSTOG
  //Check for suspension
  useEffect(() => {
    async function checkSuspensions() {
      // Fetch suspensions for all reported users
      reportedFeedback.forEach(async (report) => {
        if (report.ReportedUser) {
          const response = await axios.get(`https://lgcbe.onrender.com/feedback/api/check-suspension?userEmail=${report.ReportedUser.email}`);
          if (response.data.isSuspended) {
            setSuspendedUsers(prev => new Set([...prev, report.ReportedUser.email]));
          }
        }
      });
    }
  
    checkSuspensions();
  }, [reportedFeedback]);

  // SUSTOG 
  // Toggle suspension status
  const toggleSuspension = async (userEmail) => {
    const isCurrentlySuspended = suspendedUsers.has(userEmail);
    const action = isCurrentlySuspended ? 'unsuspend' : 'suspend';
    try {
      const response = await axios.post('https://lgcbe.onrender.com/feedback/api/suspend', {
        userEmail,
        action,
      });
      if (response.data.success) {
        if (isCurrentlySuspended) {
          setSuspendedUsers(prev => {
            const updated = new Set(prev);
            updated.delete(userEmail);
            return updated;
          });
        } else {
          setSuspendedUsers(prev => new Set([...prev, userEmail]));
        }
      } else {
        console.error(`Failed to ${action} user.`);
      }
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
    }
  };

  // Function to ban an email and delete a user
  const handleBanUser = async (userId, email) => {
    
    // Confirmation dialog
    const confirmBan = window.confirm("This is irreversible. Are you sure?");

    if (!confirmBan) {
      return; // Exit the function if the user cancels the action
    }
    
    try {
      // console.log('email: ', email, 'userId: ', userId)
      // Add the email to the banned_emails table
      const banResponse = await fetch('https://lgcbe.onrender.com/feedback/ban-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (banResponse.ok) {
        // Email banned successfully, now delete the user
        const deleteUserResponse = await fetch(`https://lgcbe.onrender.com/user/api/user/${userId}`, {
          method: 'DELETE',
        });

        if (deleteUserResponse.ok) {
        // User deleted successfully 
        // Remove the cleared user's reports from the local state
        const updatedReportedFeedback = reportedFeedback.filter((report) => report.reported_user_id !== userId);
        setReportedFeedback(updatedReportedFeedback);
        return true;

        } else {
          // Handle user deletion error
          throw new Error('User deletion failed');
        }
      } else {
        // Handle email banning error
        throw new Error('Email banning failed');
      }
    } catch (error) {
      console.error('Error banning email and deleting user:', error);
      return false;
    }
  };

  const handleNotifyUser = async (userId) => {
    // console.log('userId: ', userId)
    try {
      const response = await fetch('https://lgcbe.onrender.com/api/notify-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
  
      if (response.ok) {
        console.log('Notification sent successfully.'); 
      } else {
        console.error('Failed to send notification.');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
 
  const capitalizedUsername = user && user.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : '';

  const toggleComplaintVisibility = (index) => {
    // Create a copy of the complaint visibility array
    const updatedVisibility = [...complaintVisibility];
    // Toggle the visibility for the clicked card
    updatedVisibility[index] = !updatedVisibility[index];
    // Update the state with the new array
    setComplaintVisibility(updatedVisibility);
  };

  // SUSTOG 
  const userEmails = reportedFeedback.map((report) => {
    
    return report.ReportedUser?.email || report.ReportedTrip?.User.email || report.ReportedTravelog?.User.email || report.ReportedComment?.user.email;
  }); 
  // console.log('USEREMAILS: ', userEmails)

  return (
  <div>
    <div> 
      <h2 className='admin-welcome'>Welcome, Administrator <strong>{capitalizedUsername}</strong>.</h2> 

      <div className='admin-schedule-btn-div'>
        <button className='admin-schedule-btn' onClick={handleNavigateToMaintenance}>Schedule Maintenance</button>
      </div>

      {activeConversationUser && (
        <div className="admin-conversation">
        <MessageConversationModal
          activeConversation={activeConversationUser}
          onClose={closeConversationModal}
          friends={[]} // If friends data is not relevant for admin, pass an empty array or modify the modal to handle this case
          isAdmin={isAdmin}
        />
        </div>
      )}

    </div>

    <div className='maintenance-slate'>
      <div>
        <h2>Reported Users</h2>
        {/* Map through reported users and create cards  */}
        {reportedFeedback.map((report, index) => {
          
          // Check if ReportedUser exists
          if (!report.ReportedUser) {
            return null; // Skip rendering this report if there's no ReportedUser
          }

          // SUSTOG  
          if (!report.ReportedUser && !report.ReportedTrip && !report.ReportedTravelog && !report.ReportedComment) {
            return null; // Skip rendering this report if there's no associated user
          }

          // SUSTOG 
          const userEmail = userEmails[index];
          // console.log('userEmail in return: ', userEmail) 
          const isUserSuspended = suspendedUsers.has(userEmail);

          // MESSAGE COUNT BADGES 
          const otherUserId = report.ReportedUser?.user_id || report.ReportedTrip?.User.user_id || report.ReportedTravelog?.User.user_id || report.ReportedComment?.user_id;
          const unreadMessageCount = unreadCounts[otherUserId] || 0;
          // console.log('unreadMessageCount: ', unreadCounts)

          return (
            
              <div className="admin-card">
                <div className="admin-mini-card" style={isReportOlderThan84Hours(report.createdAt) ? oldReportStyle : null}>
                  <div className='admin-mini-card-text'>

                  <Link to={`/public_profile/${report.ReportedUser.username}`} style={{ textDecoration: 'none', color: 'inherit' }} key={report.report_id}>
                    <h3 className="link-to-report-entity">Reported Username: {report.ReportedUser.username}</h3> 
                  </Link>

                    <p>Reported User ID: {report.reported_user_id}</p> 
                    <p>Reported User Email: {report.ReportedUser.email}</p>

                    <div className='admin-button-group'>

                      <button className='admin-panel-btn' onClick={(e) => {
                        e.preventDefault();
                        toggleComplaintVisibility(index);
                      }}>
                        {complaintVisibility[index] ? "Hide" : "View"}
                      </button>
                      <button className='admin-panel-btn' onClick={(e) => {
                        e.preventDefault(); 
                        openConversationWithUser(report.ReportedUser);
                      }}>
                        Communicate {renderBadge(unreadMessageCount)}
                      </button>
                      
                      {/* MESSAGE COUNT BADGES  */}

                      <button className='admin-panel-btn' onClick={(e) => {
                        e.preventDefault();
                        handleNotifyUser(report.reported_user_id, index)}}>
                          Notify
                      </button>
                      <button className='admin-panel-btn' onClick={(e) => {
                        e.preventDefault();
                        handleClearReport(report.reportId, index)
                        }}
                        disabled={isUserSuspended}
                      >
                        Clear
                      </button> 
  
                      {/* SUSTOG - REPLACES ABOVE */}
                      <button className='admin-panel-btn' 
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSuspension(userEmail);
                        }}
                        disabled={!userEmail || isReportOlderThan84Hours(report.createdAt)}
                      >
                        {suspendedUsers.has(userEmail) ? 'Unsuspend' : 'Suspend'}
                      </button>

                      <button className='admin-panel-btn' onClick={(e) => {
                        e.preventDefault();
                        handleBanUser(report.reported_user_id, report.ReportedUser.email)}}>
                          Ban
                      </button>

                    </div>

                  </div>
                </div>
                <div>
                  {complaintVisibility[index] && (
                    <div className="complaint-section">
                      <div>
                        <p>Reporter: {report.name}</p>
                      </div>
                      <div>
                        <p>Reporter's Email: {report.email}</p>
                      </div>
                      <div>
                        <p>Complaint Text: {report.complaint_text}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            
          );
        })}
      </div> 

      <div>
        <h2>Reported Trips</h2>
        {reportedFeedback.map((report, index) => {
          // Check if ReportedTravelog exists
          if (!report.ReportedTrip) {
            return null; // Skip rendering this report if there's no ReportedTravelog
          }

          // SUSTOG  
          if (!report.ReportedUser && !report.ReportedTrip && !report.ReportedTravelog && !report.ReportedComment) {
            return null; // Skip rendering this report if there's no associated user
          }

          // SUSTOG 
          const userEmail = userEmails[index];
          // console.log('userEmail in return: ', userEmail) 
          const isUserSuspended = suspendedUsers.has(userEmail);

          // MESSAGE COUNT BADGES 
          const otherUserId = report.ReportedUser?.user_id || report.ReportedTrip?.User.user_id || report.ReportedTravelog?.User.user_id || report.ReportedComment?.user_id;
          const unreadMessageCount = unreadCounts[otherUserId] || 0;
          // console.log('unreadMessageCount: ', unreadCounts)
          return (
            
              <div className="admin-card">
                <div className="admin-mini-card" style={isReportOlderThan84Hours(report.createdAt) ? oldReportStyle : null}>
                  <div className='admin-mini-card-text'>

                  <Link key={report.reportId} to={`/trip_det/${report.ReportedTrip.trip_id}`} style={{ textDecoration: 'none', color: 'inherit' }}> 
                    <h3 className="link-to-report-entity">Reported Trip Title: {report.ReportedTrip.title}</h3>   
                  </Link>

                    <p>Author: {report.ReportedTrip.username}</p>                                     
                    <p>Author's Email: {report.ReportedTrip.User.email}</p>  

                  <div className='admin-button-group'>
                    <button className='admin-panel-btn' onClick={(e) => {
                      e.preventDefault();
                      toggleComplaintVisibility(index);
                    }}>
                      {complaintVisibility[index] ? "Hide" : "View"}
                    </button> 
                    <button className='admin-panel-btn' onClick={(e) => {
                      e.preventDefault(); 
                      openConversationWithUser(report.ReportedTrip.User);
                    }}>
                      Communicate {renderBadge(unreadMessageCount)}
                    </button>
                    <button className='admin-panel-btn' onClick={(e) => {
                      e.preventDefault();
                      handleNotifyUser(report.ReportedTrip.User.user_id, index)}}>
                        Notify
                    </button>
                    <button className='admin-panel-btn' onClick={(e) => {
                      e.preventDefault();
                      handleClearReport(report.reportId, index)
                      }}
                      disabled={isUserSuspended}
                    >
                      Clear
                    </button> 

                    <button className='admin-panel-btn' 
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSuspension(userEmail);
                      }}
                      disabled={!userEmail || isReportOlderThan84Hours(report.createdAt)}
                    >
                      {suspendedUsers.has(userEmail) ? 'Unsuspend' : 'Suspend'}
                    </button>

                    <button className='admin-panel-btn' onClick={(e) => {
                      e.preventDefault();
                      handleBanUser(report.ReportedTrip.User.user_id, report.ReportedTrip.User.email)}}>
                        Ban
                    </button>

                  </div>

                  </div>
                </div>
                <div>
                  {complaintVisibility[index] && (
                    <div className="complaint-section">
                      <div>
                        <p>Reporter: {report.name}</p>
                      </div>
                      <div>
                        <p>Reporter's Email: {report.email}</p>
                      </div>
                      <div>
                        <p>Complaint Text: {report.complaint_text}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            
          );
        })}
      </div> 

      <div>
        <h2>Reported Travel Logs</h2>
        {reportedFeedback.map((report, index) => {
          // Check if ReportedTravelog exists
          if (!report.ReportedTravelog) {
            return null; // Skip rendering this report if there's no ReportedTravelog
          }

          // SUSTOG   
          if (!report.ReportedUser && !report.ReportedTrip && !report.ReportedTravelog && !report.ReportedComment) {
            return null; // Skip rendering this report if there's no associated user
          }

          // SUSTOG 
          const userEmail = userEmails[index];
          // console.log('userEmail in return: ', userEmail) 
          const isUserSuspended = suspendedUsers.has(userEmail);

          // MESSAGE COUNT BADGES 
          const otherUserId = report.ReportedUser?.user_id || report.ReportedTrip?.User.user_id || report.ReportedTravelog?.User.user_id || report.ReportedComment?.user_id;
          const unreadMessageCount = unreadCounts[otherUserId] || 0;
          // console.log('unreadMessageCount: ', unreadCounts)
          return (
            
              <div className="admin-card">
                <div className="admin-mini-card" style={isReportOlderThan84Hours(report.createdAt) ? oldReportStyle : null}>
                  <div className='admin-mini-card-text'>

                  <Link key={report.reportId} to={`/trav_det/${report.ReportedTravelog.travelogId}`} style={{ textDecoration: 'none', color: 'inherit' }}> 
                    <h3 className="link-to-report-entity">Reported Travelog Title: {report.ReportedTravelog.title}</h3>   
                  </Link>

                    <p>Author: {report.ReportedTravelog.username}</p>                                     
                    <p>Author's Email: {report.ReportedTravelog.User.email}</p>  

                    <div className='admin-button-group'>
                      <button className='admin-panel-btn' onClick={(e) => {
                        e.preventDefault();
                        toggleComplaintVisibility(index);
                      }}>
                        {complaintVisibility[index] ? "Hide" : "View"}
                      </button> 
                      <button className='admin-panel-btn' onClick={(e) => {
                        e.preventDefault();  
                        openConversationWithUser(report.ReportedTravelog.User);
                      }}>
                        Communicate {renderBadge(unreadMessageCount)}
                      </button>
                      <button className='admin-panel-btn' onClick={(e) => {
                        e.preventDefault();
                        handleNotifyUser(report.ReportedTravelog.User.user_id, index)}}>
                          Notify
                      </button>
                      <button className='admin-panel-btn' onClick={(e) => {
                        e.preventDefault();
                        handleClearReport(report.reportId, index)
                        }}
                        disabled={isUserSuspended}
                      >
                        Clear
                      </button> 

                      <button className='admin-panel-btn' 
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSuspension(userEmail);
                        }}
                        disabled={!userEmail || isReportOlderThan84Hours(report.createdAt)}
                      >
                        {suspendedUsers.has(userEmail) ? 'Unsuspend' : 'Suspend'}
                      </button>
                      
                      <button className='admin-panel-btn' onClick={(e) => {
                        e.preventDefault();
                        handleBanUser(report.ReportedTravelog.User.user_id, report.ReportedTravelog.User.email)}}>
                          Ban
                      </button>

                    </div>

                  </div>
                </div>
                <div>
                  {complaintVisibility[index] && (
                    <div className="complaint-section">
                      <div>
                        <p>Reporter: {report.name}</p>
                      </div>
                      <div>
                        <p>Reporter's Email: {report.email}</p>
                      </div>
                      <div>
                        <p>Complaint Text: {report.complaint_text}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            
          );
        })}
      </div>  

      <div>
        <h2>Reported Comments</h2>
        {reportedFeedback.map((report, index) => {
          // Check if ReportedTravelog exists
          if (!report.ReportedComment) {
            return null; // Skip rendering this report if there's no ReportedTravelog
          }

          // SUSTOG  
          if (!report.ReportedUser && !report.ReportedTrip && !report.ReportedTravelog && !report.ReportedComment) {
            return null; // Skip rendering this report if there's no associated user
          }

          // SUSTOG 
          const userEmail = userEmails[index];
          // console.log('userEmail in return: ', userEmail) 
          const isUserSuspended = suspendedUsers.has(userEmail);

          // MESSAGE COUNT BADGES 
          const otherUserId = report.ReportedUser?.user_id || report.ReportedTrip?.User.user_id || report.ReportedTravelog?.User.user_id || report.ReportedComment?.user_id;
          const unreadMessageCount = unreadCounts[otherUserId] || 0;
          // console.log('unreadMessageCount: ', unreadCounts)
          return (
            
            <div className="admin-card">
              <div className="admin-mini-card" style={isReportOlderThan84Hours(report.createdAt) ? oldReportStyle : null}>
                  <div className='admin-mini-card-text'>
                    <Link key={report.reportId} to={`/trav_det/${report.ReportedComment.travelogId}`} style={{ textDecoration: 'none', color: 'inherit' }}> 
                      <h3 className="link-to-report-entity">Reported Comment: {report.ReportedComment.content}</h3>   
                    </Link>
                    <p>Author: {report.ReportedComment.user.username}</p>                                     
                    <p>Author's Email: {report.ReportedComment.user.email}</p>  

                    <div className='admin-button-group'>
                    
                      <button className='admin-panel-btn' onClick={(e) => {
                        e.preventDefault();
                        toggleComplaintVisibility(index);
                      }}>
                        {complaintVisibility[index] ? "Hide" : "View"}
                      </button> 
                      <button className='admin-panel-btn' onClick={(e) => {
                        e.preventDefault(); 
                        openConversationWithUser(report.ReportedComment.user);
                      }}>
                        Communicate {renderBadge(unreadMessageCount)}
                      </button>
                      <button className='admin-panel-btn' onClick={(e) => {
                        e.preventDefault();
                        handleNotifyUser(report.ReportedComment.user_id, index)}}>
                          Notify
                      </button>
                      <button className='admin-panel-btn' onClick={(e) => {
                        e.preventDefault();
                        handleClearReport(report.reportId, index)
                        }}
                        disabled={isUserSuspended}
                      >
                        Clear
                      </button> 

                      <button className='admin-panel-btn' 
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSuspension(userEmail);
                        }}
                        disabled={!userEmail || isReportOlderThan84Hours(report.createdAt)}
                      >
                        {suspendedUsers.has(userEmail) ? 'Unsuspend' : 'Suspend'}
                      </button>

                      <button className='admin-panel-btn' onClick={(e) => {
                        e.preventDefault();
                        handleBanUser(report.ReportedComment.user_id, report.ReportedComment.user.email)}}>
                          Ban
                      </button> 

                    </div>

                  </div> 
                </div>
                <div>
                  {complaintVisibility[index] && (
                    <div className="complaint-section">
                      <div>
                        <p>Reporter: {report.name}</p>
                      </div>
                      <div>
                        <p>Reporter's Email: {report.email}</p>
                      </div>
                      <div>
                        <p>Complaint Text: {report.complaint_text}</p>
                      </div>
                    </div>
                  )}
                </div> 
            </div> 
          );
        })}
      </div> 
    </div>
  </div>
  ); 
}

export default AdminPanel;






 