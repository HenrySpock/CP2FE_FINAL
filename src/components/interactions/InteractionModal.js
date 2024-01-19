import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import ReportModal from './ReportModal'

import './PublicProfile.css'

function InteractionModal({ isOpen, friendshipStatus, setFriendshipStatus, currentUser, profileUser, userData, contextUser }) {
  const [isFollowing, setIsFollowing] = useState(false); 
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); 
  const navigate = useNavigate();
  
  if (!isOpen) {
    return null;
  } 
 
  // Function to handle opening the report modal
  const openReportModal = () => {
    setIsReportModalOpen(true);
  };

  // console.log('currentUser: ', currentUser, 'profileUser: ', profileUser) 
  const handleBefriend = async () => {
    const url = `${API_BASE_URL}/api/friends/request`;
  
    try {
      const response1 = await fetch(`${API_BASE_URL}/user/api/users/${currentUser}`);
      const data1 = await response1.json(); 
      const user1Id = data1.user_id;   
      // console.log('user1Id: ', user1Id);
  
      const response2 = await fetch(`${API_BASE_URL}/user/api/users/${profileUser}`);
      const data2 = await response2.json();
      const user2Id = data2.user_id;  
      // console.log('user2Id: ', user2Id);
  
      const payload = {
        requester: user1Id,
        requestee: user2Id
      };
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      setFriendshipStatus({ accepted: false, denied: false });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      // const data = await response.json();
      // console.log('Befriend response:', data);
    } catch (error) {
      console.error('Error befriending user:', error);
    }
  }; 

  const handleUnfriend = async () => {
    const response1 = await fetch(`${API_BASE_URL}/user/api/users/${currentUser}`);
    const data1 = await response1.json(); 
    const user1Id = data1.user_id;
  
    const response2 = await fetch(`${API_BASE_URL}/user/api/users/${profileUser}`);
    const data2 = await response2.json();
    const user2Id = data2.user_id;
  
    const payload = {
      user1: user1Id,
      user2: user2Id
    };
  
    try {
      const response = await fetch('${API_BASE_URL}/api/friends/unfriend', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      // const data = await response.json();
      // console.log('Unfriend response:', data);
      
      setFriendshipStatus({ status: 'no-record' });
    } catch (error) {
      console.error('Error unfriending user:', error);
    }
  };

const handleCancelRequest = async () => {
  const response1 = await fetch(`${API_BASE_URL}/user/api/users/${currentUser}`);
  const data1 = await response1.json(); 
  const user1Id = data1.user_id;

  
  const response2 = await fetch(`${API_BASE_URL}/user/api/users/${profileUser}`);
  const data2 = await response2.json();
  const user2Id = data2.user_id;

  const payload = {
    requester: user1Id,
    requestee: user2Id
  };

  try {
    const response = await fetch('${API_BASE_URL}/api/friends/request', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload), 
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // const data = await response.json();
    // console.log('Cancel request response:', data);
    
    setFriendshipStatus({ status: 'no-record' });
  } catch (error) {
    console.error('Error canceling request:', error);
  }
};

const handleFollow = async () => {
  // Fetch the user IDs
  const response1 = await fetch(`${API_BASE_URL}/user/api/users/${currentUser}`);
  const data1 = await response1.json();
  const user1Id = data1.user_id;
  
  const response2 = await fetch(`${API_BASE_URL}/user/api/users/${profileUser}`);
  const data2 = await response2.json();
  const user2Id = data2.user_id;
  
  // Set the URL and method based on the following state
  const url = isFollowing ? '${API_BASE_URL}/api/unfollow' : '${API_BASE_URL}/api/follow';
  const method = isFollowing ? 'DELETE' : 'POST';

  try {
    // console.log('user1Id: ', user1Id, 'user2Id: ', user2Id);
    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ follower_id: user1Id, followee_id: user2Id })  
    });
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    if (data.success) {
      setIsFollowing(!isFollowing);  // Toggle the following state
    }
  } catch (error) {
    console.error('Error following/unfollowing user:', error);
  }
}; 

// console.log('contextUser: ', contextUser, 'email: ', contextUser.email) 

const submitReport = async (complaint) => {

  try {
    // console.log('contextUser: ', contextUser, 'userData: ', userData)
    const reportPayload = { 
      user_id: contextUser.user_id,
      complaint_text: complaint,
      reported_comment_id: null,
      reported_travelog_id: null,
      reported_trip_id: null,
      reported_user_id: userData.user_id,
      username: contextUser.username,  
      email: contextUser.email, 
    };

    const response = await fetch(`${API_BASE_URL}/feedback/api/users/${profileUser}/report`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportPayload),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // console.log('User reported successfully');
  } catch (error) {
    console.error('Error reporting user:', error);
  }
};


const handleBlock = async (blockedUserId) => {

  const response1 = await fetch(`${API_BASE_URL}/user/api/users/${currentUser}`);
  const data1 = await response1.json();
  const blocker_id = data1.user_id;
  
  const response2 = await fetch(`${API_BASE_URL}/user/api/users/${profileUser}`);
  const data2 = await response2.json();
  const blocked_id = data2.user_id;

  try {
    const response = await fetch('${API_BASE_URL}/api/block', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blocker_id: blocker_id, blocked_id: blocked_id })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const data = await response.json();
    if (data.success) {
      navigate('/hub');  // Navigate back to UserHub on successful block
    }
  } catch (error) {
    console.error('Error blocking user:', error);
  }
};

const renderFriendButton = () => {
  if (friendshipStatus.status === 'no-record') {
    return <button className='interaction-mini-btn blue-button' onClick={handleBefriend}>Befriend</button>;
  } else if (friendshipStatus.accepted) {
    return <button className='interaction-mini-btn red-button' onClick={handleUnfriend}>Unfriend</button>;
  } else if (friendshipStatus.denied) {
    return null;  // Nothing will be rendered if the friendship request was denied
  } else {
    return <button className='interaction-mini-btn orange-button' onClick={handleCancelRequest}>Remove</button>;
  }
};
 
  return (
    <div className="interaction-modal">
      {renderFriendButton()}
      <button className='interaction-mini-btn blue-button' onClick={handleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
      </button> 
      <button className='interaction-mini-btn red-button' onClick={() => handleBlock(profileUser)}>Block</button> 
      <button className='interaction-mini-btn orange-button' onClick={openReportModal}>Report</button> 
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={submitReport}
      />
    </div>
  );
}

export default InteractionModal;
