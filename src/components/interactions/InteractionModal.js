import React from 'react';

function InteractionModal({ isOpen, onBefriend, onFollow, onBlock, onReport, friendshipStatus, setFriendshipStatus, currentUser, profileUser, }) {
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
  
  
  

const handleUnfriend = () => {
  // Define your unfriend logic here or pass down a function from a parent component
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

console.log('friendshipStatus: ', friendshipStatus)
const renderFriendButton = () => {
  if (friendshipStatus.status === 'no-record') {
    return <button onClick={handleBefriend}>Befriend</button>;
  } else if (friendshipStatus.accepted) {
    return <button onClick={handleUnfriend}>Unfriend</button>;
  } else if (friendshipStatus) {
    return <button onClick={handleCancelRequest}>Cancel Request</button>;
  } else if (friendshipStatus.denied) {
    return <button onClick={handleCancelRequest}>Cancel Request</button>;
  }  
};

  return (
    <div className="interaction-modal">
      {renderFriendButton()}
      <button onClick={onFollow}>Follow</button>
      <button onClick={onBlock}>Block</button>
      <button onClick={onReport}>Report</button> 
    </div>
  );
}

export default InteractionModal;
