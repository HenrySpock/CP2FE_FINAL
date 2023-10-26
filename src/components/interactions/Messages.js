import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../user/UserContext';  // Assume UserContext is exported from UserContext.js
import MessageModal from './MessageModal';  // Assume you'll create a MessageModal component for handling messaging UI

function MessagePage() {
  const [friends, setFriends] = useState([]);
  const { user } = useContext(UserContext);
  const [activeConversation, setActiveConversation] = useState(null);  // Holds the selected friend for messaging

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/friends/${user.user_id}`)
        .then(response => response.json())
        .then(data => {console.log('Fetched friends data:', data); setFriends(data)})
        .catch(error => console.error('Error fetching friends:', error));
    }
  }, [user]);

  const handleFriendClick = (friend) => {
    setActiveConversation(friend); 
  };

  useEffect(() => {
    console.log('Active Conversation:', activeConversation);
  }, [activeConversation]);
  
  return (
    <div className="message-page">
      <div className="friends-list">
        <h2>Your Friends</h2>
        {friends.map(friend => (
          <div key={friend.user_id} className="friend-card" onClick={() => handleFriendClick(friend)}>
            <img src={friend.avatar} alt={`${friend.username}'s avatar`} />
            {friend.username}
          </div>
        ))}
      </div>

      {activeConversation && (
        <MessageModal
          activeConversation={activeConversation}
          onClose={() => setActiveConversation(null)}
        />
      )}
    </div>
  );
}

export default MessagePage;
