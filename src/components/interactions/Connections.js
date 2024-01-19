// FriendsPage.js
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../user/UserContext';  
import './Connections.css'

function ConnectionsPage() {
  const [friends, setFriends] = useState([]);
  const [followers, setFollowers] = useState([]);  
  const [followings, setFollowings] = useState([]);  
  const { user } = useContext(UserContext); 

  const [showFriends, setShowFriends] = useState(true);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);

  useEffect(() => {
    // Check if user is defined before making the request
    if (user) { 
      fetch(`https://lgcbe.onrender.com/api/friends/${user.user_id}`)
        .then(response => response.json())
        .then(data => setFriends(data))
        .catch(error => console.error('Error fetching friends:', error));

      // Fetch followers
      fetch(`https://lgcbe.onrender.com/api/followers/${user.user_id}`)
        .then(response => response.json())
        .then(data => setFollowers(data))
        .catch(error => console.error('Error fetching followers:', error));

      // Fetch followings
      fetch(`https://lgcbe.onrender.com/api/followings/${user.user_id}`)
        .then(response => response.json())
        .then(data => setFollowings(data))
        .catch(error => console.error('Error fetching followings:', error));
    }
  }, [user]);

  const toggleSection = (section) => {
    switch (section) {
      case 'friends':
        setShowFriends(prev => !prev);
        break;
      case 'followers':
        setShowFollowers(prev => !prev);
        break;
      case 'followings':
        setShowFollowings(prev => !prev);
        break;
      default:
        break;
    }
  };
  

  return (
    <div className='interaction-slate'>
      <div className="interaction-section" onClick={() => toggleSection('friends')}>
        <h2>{showFriends ? 'Hide Your Friends' : 'Show Your Friends'}</h2>
      </div>

      <div className='interaction-card-divs'>
        {showFriends && friends.map(friend => (
          <div key={friend.user_id} className="interaction-card">
            <Link to={`/public_profile/${friend.username}`}>
              {friend.username}
            </Link>
            <img src={friend.avatar} alt={`${friend.username}'s avatar`} />
          </div>
        ))}
      </div>

      
      <div className="interaction-section" onClick={() => toggleSection('followers')}>
        <h2>{showFollowers ? 'Hide Your Followers' : 'Show Your Followers'}</h2>
      </div>

      <div className='interaction-card-divs'>
        {showFollowers && followers.map(follower => (   
            <div key={follower.user_id} className="interaction-card">
              <Link to={`/public_profile/${follower.username}`}>
                {follower.username}
              </Link>
              <img src={follower.avatar} alt={`${follower.username}'s avatar`} />
            </div>        
        ))}
      </div>

      <div className="interaction-section" onClick={() => toggleSection('followings')}>
        <h2>{showFollowings ? 'Hide Your Followings' : 'Show Your Followings'}</h2>
      </div>

      <div className='interaction-card-divs'>
        {showFollowings && followings.map(following => (
          <div key={following.user_id} className="interaction-card">       
            <Link to={`/public_profile/${following.username}`}>
              {following.username}
            </Link>
            <img src={following.avatar} alt={`${following.username}'s avatar`} />         
          </div>        
        ))} 
      </div>

    </div>
  ); 

}

export default ConnectionsPage; 