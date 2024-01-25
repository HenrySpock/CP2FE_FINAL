import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../user/UserContext';
import MessageConversationModal from './MessageConversationModal';
import { Link } from 'react-router-dom';
import './Messaging.css'

function Messages() {
  const [friends, setFriends] = useState([]);
  const { user } = useContext(UserContext);
  const [activeConversation, setActiveConversation] = useState(null); 
  const [adminUser, setAdminUser] = useState(null); 
  const [adminCardVisible, setAdminCardVisible] = useState(true); 

  const [allReportsCleared, setAllReportsCleared] = useState(true);
  
  const markMessagesAsRead = (conversationId) => {
    // console.log('conversationId: ', conversationId)
    fetch(`https://lgcbe.onrender.com/tally/mark-messages-as-read`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,  
      },
      body: JSON.stringify({
        user_id: user.user_id,
        conversationId: conversationId
      }),
    })
    .then(response => response.json())
    .then(data => {
      // console.log('Messages marked as read:', data);
    })
    .catch(error => console.error('Error marking messages as read:', error));
  };

 
  useEffect(() => {
    const fetchAndUpdateAdminMessages = () => {
      fetch(`https://lgcbe.onrender.com/api/admin-messages/${user.user_id}`)
        .then(response => response.json())
        .then(({ adminUser, unreadCount, readCount, allReportsCleared }) => {
          // console.log('ALLREPORTSCLEARED: ', allReportsCleared)
          setAllReportsCleared(allReportsCleared)
          // console.log('Fetched admin messages:', adminUser);
          setAdminUser(adminUser ? { ...adminUser, unreadCount, readCount } : null);
          // console.log('Set Fetched adminUser', adminUser, 'readCount', readCount)
  
          // Show the admin card if there are unread or read messages and reports are not cleared
          const shouldDisplayCard = (unreadCount > 0 || readCount > 0) && !allReportsCleared;
          // console.log('Should display admin card:', shouldDisplayCard);
          setAdminCardVisible(shouldDisplayCard);
  
        })
        .catch(error => console.error('Error fetching admin details:', error));
    };  
    
    if (user) {
      const intervalId = setInterval(() => { 
         
            fetch(`https://lgcbe.onrender.com/api/friends/${user.user_id}`)
              .then(response => response.json())
              .then(data => {
                // console.log('Fetched friends data:', data);
                setFriends(data.map(friend => ({
                  ...friend,
                  unreadCount: friend.unreadCount || 0  
                })));
              }) 
            .catch(error => console.error('Error fetching friends:', error));

            fetchAndUpdateAdminMessages();

       }, 3000);  
  
      return () => clearInterval(intervalId);  
    }
  }, [user, friends, adminUser ]);
 

  // Handle friend card click
  const handleFriendClick = (friend) => {
    if (activeConversation && activeConversation.user_id === friend.user_id) {
      setActiveConversation(null);
    } else {
      setActiveConversation(friend);
      markMessagesAsRead(friend.user_id); 
      setFriends(prevFriends => prevFriends.map(f => f.user_id === friend.user_id ? { ...f, unreadCount: 0 } : f));
    }
  };
 


  const handleAdminClick = (adminUserData) => { 
    // console.log('adminCardVisible1: ', adminCardVisible);
    if (activeConversation && activeConversation.user_id === adminUserData.user_id) {
      setActiveConversation(null);
    } else {
      setActiveConversation(adminUserData);
      markMessagesAsRead(adminUserData.user_id); 
    }
    // console.log('adminCardVisible2: ', adminCardVisible);
  };


  return (
    <div>
      <div className="message-page">
 
        {adminCardVisible && adminUser 
        && ( adminUser.unreadCount > 0 || adminUser.readCount > 0 )
        && (
          <div className='admin-space'>
            <h2>ADMIN MESSAGE - READ IMMEDIATELY</h2>
            <div className='messaging-list admin-message'>
              <div className="messaging-card admin-message-card" id='admin-card' onClick={() => handleAdminClick(adminUser)}>
                <div className="badge-container">
                  <span className="badge badge-blue">{adminUser.unreadCount}</span>
                </div>
                <img src={adminUser.avatar} alt={`${adminUser.username}'s avatar`} />
                <div>{adminUser.username}</div>
              </div>
            </div>
          </div>
        )}
          
        <div className='messaging-slate'>
          <div className='messaging-title'>
            <h2>Your Friends</h2>
          </div>


          <div className="messaging-list">
            {friends.map(friend => {
              // Check if the friend is an admin and if all reports are not cleared
              const isFriendAdmin = adminUser && friend.user_id === adminUser.user_id;
              if (isFriendAdmin && !allReportsCleared) return null; // Do not render this friend card

              return (
                <>
                  <div key={friend.user_id} className="messaging-card" onClick={() => handleFriendClick(friend)}>
                    {/* <div className="badge-container">   
                      {friend.unreadCount > 0 && (
                        <span className="badge badge-blue">{friend.unreadCount}</span>
                      )}
                    </div> */}
                    <img src={friend.avatar} alt={`${friend.username}'s avatar`} />
                    <Link to={`/public_profile/${friend.username}`} className="friend-username-link">
                      <p className='friend-username-text'>{friend.username}</p>
                    </Link> 
                  </div>
                  <div className="badge-container">   
                    {friend.unreadCount > 0 && (
                      <span className="badge badge-blue">{friend.unreadCount}</span>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <div className="message-list">
          {activeConversation && (
            <MessageConversationModal
              activeConversation={activeConversation}
              onClose={() => setActiveConversation(null)}
              friends={friends}  // Pass the friends data
              // markMessagesAsRead={markMessagesAsRead} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;