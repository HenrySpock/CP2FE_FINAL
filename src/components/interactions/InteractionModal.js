import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

function InteractionModal({ isOpen, onBefriend, onFollow, onBlock, onReport, friendshipStatus, setFriendshipStatus, currentUser, profileUser}) {
  const [isFollowing, setIsFollowing] = useState(false); 
  const navigate = useNavigate();
  
  if (!isOpen) {
    return null;
  } 
 
  console.log('currentUser: ', currentUser, 'profileUser: ', profileUser)

  const handleBefriend = async () => {
    const url = `http://localhost:5000/api/friends/request`;
  
    try {
      const response1 = await fetch(`http://localhost:5000/api/users/${currentUser}`);
      const data1 = await response1.json(); 
      const user1Id = data1.user_id;  // corrected line
      console.log('user1Id: ', user1Id);
  
      const response2 = await fetch(`http://localhost:5000/api/users/${profileUser}`);
      const data2 = await response2.json();
      const user2Id = data2.user_id;  // corrected line
      console.log('user2Id: ', user2Id);
  
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
  
      const data = await response.json();
      console.log('Befriend response:', data);
    } catch (error) {
      console.error('Error befriending user:', error);
    }
  };
  
  
  

  const handleUnfriend = async () => {
    const response1 = await fetch(`http://localhost:5000/api/users/${currentUser}`);
    const data1 = await response1.json(); 
    const user1Id = data1.user_id;
  
    const response2 = await fetch(`http://localhost:5000/api/users/${profileUser}`);
    const data2 = await response2.json();
    const user2Id = data2.user_id;
  
    const payload = {
      user1: user1Id,
      user2: user2Id
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/friends/unfriend', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Unfriend response:', data);
      
      setFriendshipStatus({ status: 'no-record' });
    } catch (error) {
      console.error('Error unfriending user:', error);
    }
  };

const handleCancelRequest = async () => {
  const response1 = await fetch(`http://localhost:5000/api/users/${currentUser}`);
  const data1 = await response1.json(); 
  const user1Id = data1.user_id;

  
  const response2 = await fetch(`http://localhost:5000/api/users/${profileUser}`);
  const data2 = await response2.json();
  const user2Id = data2.user_id;

  const payload = {
    requester: user1Id,
    requestee: user2Id
  };

  try {
    const response = await fetch('http://localhost:5000/api/friends/request', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload), 
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Cancel request response:', data);
    
    setFriendshipStatus({ status: 'no-record' });
  } catch (error) {
    console.error('Error canceling request:', error);
  }
};



// const handleFollow = async () => {
//   try {
//     // Fetch the user ID for currentUser
//     const response1 = await fetch(`http://localhost:5000/api/users/${currentUser}`);
//     const data1 = await response1.json(); 
//     const user1Id = data1.user_id;

//     // Fetch the user ID for profileUser
//     const response2 = await fetch(`http://localhost:5000/api/users/${profileUser}`);
//     const data2 = await response2.json();
//     const user2Id = data2.user_id;

//     // Now use user1Id and user2Id in your request
//     const response = await fetch('http://localhost:5000/api/follow', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ follower_id: user1Id, followee_id: user2Id })
//     });
//     if (!response.ok) {
//       throw new Error('Network response was not ok ' + response.statusText);
//     }
//     const data = await response.json();
//     if (data.success) {
//       setIsFollowing(true);
//     }
//   } catch (error) {
//     console.error('Error following user:', error);
//   }
// };

const handleFollow = async () => {
  // Fetch the user IDs
  const response1 = await fetch(`http://localhost:5000/api/users/${currentUser}`);
  const data1 = await response1.json();
  const user1Id = data1.user_id;
  
  const response2 = await fetch(`http://localhost:5000/api/users/${profileUser}`);
  const data2 = await response2.json();
  const user2Id = data2.user_id;
  
  // Set the URL and method based on the following state
  const url = isFollowing ? 'http://localhost:5000/api/unfollow' : 'http://localhost:5000/api/follow';
  const method = isFollowing ? 'DELETE' : 'POST';

  try {
    console.log('user1Id: ', user1Id, 'user2Id: ', user2Id);
    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ follower_id: user1Id, followee_id: user2Id })  // Use the fetched user IDs
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

const handleBlock = async (blockedUserId) => {

  const response1 = await fetch(`http://localhost:5000/api/users/${currentUser}`);
  const data1 = await response1.json();
  const blocker_id = data1.user_id;
  
  const response2 = await fetch(`http://localhost:5000/api/users/${profileUser}`);
  const data2 = await response2.json();
  const blocked_id = data2.user_id;

  try {
    const response = await fetch('http://localhost:5000/api/block', {
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



// console.log('friendshipStatus: ', friendshipStatus)
// const renderFriendButton = () => {
//   if (friendshipStatus.status === 'no-record') {
//     return <button onClick={handleBefriend}>Befriend</button>;
//   } else if (friendshipStatus.accepted) {
//     return <button onClick={handleUnfriend}>Unfriend</button>;
//   } else if (friendshipStatus) {
//     return <button onClick={handleCancelRequest}>Cancel Request</button>;
//   } else if (friendshipStatus.denied) {
//     return <button onClick={handleCancelRequest}>Cancel Request</button>;
//   }  
// };

const renderFriendButton = () => {
  if (friendshipStatus.status === 'no-record') {
    return <button onClick={handleBefriend}>Befriend</button>;
  } else if (friendshipStatus.accepted) {
    return <button onClick={handleUnfriend}>Unfriend</button>;
  } else if (friendshipStatus.denied) {
    return null;  // Nothing will be rendered if the friendship request was denied
  } else {
    return <button onClick={handleCancelRequest}>Cancel Request</button>;
  }
};
 
  return (
    <div className="interaction-modal">
      {renderFriendButton()}
      <button onClick={handleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
      {/* <button onClick={onBlock}>Block</button> */}
      <button onClick={() => handleBlock(profileUser)}>Block User</button>
      <button onClick={onReport}>Report</button> 
    </div>
  );
}

export default InteractionModal;
