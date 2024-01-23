import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../user/UserContext';  
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Disconnections.css'

function Disconnections() {
  const { user } = useContext(UserContext);
  const user_id = user ? user.user_id : null;

  const [deniedRequests, setDeniedRequests] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [showDenied, setShowDenied] = useState(false);
  const [showBlocked, setShowBlocked] = useState(false);

  async function unblockUser(blockId) {
    try {
      // console.log('blockId: ', blockId);
      await axios.delete(`https://lgcbe.onrender.com/api/block/${blockId}`); 
      const response = await axios.get(`https://lgcbe.onrender.com/api/user/${user_id}/blocked-users`);
      setBlockedUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (user_id) {
      const fetchDeniedRequests = async () => {
        const response = await axios.get(`https://lgcbe.onrender.com/api/user/${user_id}/denied-requests`);
        setDeniedRequests(response.data);
      };

      const fetchBlockedUsers = async () => {
        const response = await axios.get(`https://lgcbe.onrender.com/api/user/${user_id}/blocked-users`);
        setBlockedUsers(response.data);
      };

      fetchDeniedRequests();
      fetchBlockedUsers();
    }
  }, [user_id]);

  const handleAccept = async (sender_id, recipient_id) => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/api/friends/request/undenied', {
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
      const response = await fetch('https://lgcbe.onrender.com/api/friends/request/dismiss', {
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
    // console.log('blockedUsers: ', blockedUsers); 
  }, [blockedUsers]);
  
  return (
    <div className='disconnections-slate'>
      <div>
        <button className='disconections-btn' onClick={() => setShowDenied(!showDenied)}>Show/Hide Denied Requests</button>
        {showDenied && (
          <div className='disconnections-card-divs'>
            {deniedRequests.map(request => (
              <div  className='disconnection-card' key={request.friendshipId}>
                <Link to={`/publicprofile/${request.Requester.user_id}`}>
                  {request.Requester.username}
                </Link>
                <img src={request.Requester.avatar} alt={`${request.Requester.username}'s avatar`} />
                <button className='disconections-mini-btn' onClick={() => handleAccept(request.Requester.user_id, user_id)}><p>Accept</p></button> 
                <button className='disconections-mini-btn' onClick={() => handleDismiss(request.friendshipId)}><p>Dismiss</p></button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <button className='disconections-btn' onClick={() => setShowBlocked(!showBlocked)}>Show/Hide Blocked Users</button>
        {showBlocked && (
          <div className='disconnections-card-divs'>
            {blockedUsers.map(user => (
              <div  className='disconnection-card' key={user.blockId}> 
                  {user.username} 
                <img src={user.avatar} alt={`${user.username}'s avatar`} /> 
                <button className='disconections-mini-btn' onClick={() => unblockUser(user.blocksReceived[0].blockId)}><p>Unblock</p></button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Disconnections;

 