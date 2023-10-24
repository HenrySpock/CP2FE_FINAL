import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../user/UserContext';  // Adjust the import path if necessary
import axios from 'axios';
import { Link } from 'react-router-dom';

function Disconnections() {
  const { user } = useContext(UserContext);
  const userId = user ? user.user_id : null;

  const [deniedRequests, setDeniedRequests] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [showDenied, setShowDenied] = useState(false);
  const [showBlocked, setShowBlocked] = useState(false);

  async function unblockUser(blockId) {
    try {
      console.log('blockId: ', blockId);
      await axios.delete(`http://localhost:5000/api/block/${blockId}`);
      // Optionally, re-fetch the blocked users list to update the UI
      const response = await axios.get(`http://localhost:5000/api/user/${userId}/blocked-users`);
      setBlockedUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (userId) {
      const fetchDeniedRequests = async () => {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}/denied-requests`);
        setDeniedRequests(response.data);
      };

      const fetchBlockedUsers = async () => {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}/blocked-users`);
        setBlockedUsers(response.data);
      };

      fetchDeniedRequests();
      fetchBlockedUsers();
    }
  }, [userId]);

  const handleAccept = async (sender_id, recipient_id) => {
    try {
      const response = await fetch('http://localhost:5000/api/friends/request/undenied', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender_id, recipient_id })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
  
      const data = await response.json();
      if (data.success) {
        // Remove the accepted request from the deniedRequests state
        setDeniedRequests(deniedRequests => 
          deniedRequests.filter(request => request.Requester.user_id !== sender_id)
        );
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleDismiss = async (friendshipId) => {
    try {
      const response = await fetch('http://localhost:5000/api/friends/request/dismiss', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendshipId })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
  
      const data = await response.json();
      if (data.success) {
        // Remove the dismissed request from the deniedRequests state
        setDeniedRequests(deniedRequests => 
          deniedRequests.filter(request => request.friendshipId !== friendshipId)
        );
      }
    } catch (error) {
      console.error('Error dismissing friend request:', error);
    }
  };
  
  useEffect(() => {
    console.log('blockedUsers: ', blockedUsers);
    // ... rest of your code
  }, [blockedUsers]);
  
  return (
    <div>
      <div>
        <button onClick={() => setShowDenied(!showDenied)}>Show/Hide Denied Requests</button>
        {showDenied && (
          <div>
            {deniedRequests.map(request => (
              <div key={request.friendshipId}>
                <Link to={`/publicprofile/${request.Requester.user_id}`}>
                  {request.Requester.username}
                </Link>
                <img src={request.Requester.avatar} alt={`${request.Requester.username}'s avatar`} />
                <button onClick={() => handleAccept(request.Requester.user_id, userId)}>Accept</button> 
                <button onClick={() => handleDismiss(request.friendshipId)}>Dismiss</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <button onClick={() => setShowBlocked(!showBlocked)}>Show/Hide Blocked Users</button>
        {showBlocked && (
          <div>
            {blockedUsers.map(user => (
              <div key={user.blockId}>
                <Link to={`/publicprofile/${user.user_id}`}>
                  {user.username}
                </Link>
                <img src={user.avatar} alt={`${user.username}'s avatar`} />
                {/* <button onClick={() => unblockUser(user.blockId)}>Unblock</button> */}
                <button onClick={() => unblockUser(user.blocksReceived[0].blockId)}>Unblock</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Disconnections;

 