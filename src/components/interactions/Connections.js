// FriendsPage.js
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../user/UserContext';  // Assume UserContext is exported from UserContext.js

function ConnectionsPage() {
  const [friends, setFriends] = useState([]);
  const [followers, setFollowers] = useState([]);  // Assume you'll fetch followers the same way as friends
  const [followings, setFollowings] = useState([]);  // Assume you'll fetch followings the same way as friends
  const { user } = useContext(UserContext); 

  const [showFriends, setShowFriends] = useState(true);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);

  useEffect(() => {
    // Check if user is defined before making the request
    if (user) {
      // Assume you have an endpoint to get the list of friends
      fetch(`http://localhost:5000/api/friends/${user.user_id}`)
        .then(response => response.json())
        .then(data => setFriends(data))
        .catch(error => console.error('Error fetching friends:', error));

      // Fetch followers
      fetch(`http://localhost:5000/api/followers/${user.user_id}`)
        .then(response => response.json())
        .then(data => setFollowers(data))
        .catch(error => console.error('Error fetching followers:', error));

      // Fetch followings
      fetch(`http://localhost:5000/api/followings/${user.user_id}`)
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
    <div>
      <div className="section" onClick={() => toggleSection('friends')}>
        <h2>Your Friends</h2>
      </div>
      {showFriends && friends.map(friend => (
        <div key={friend.user_id} className="friend-card">
          <Link to={`/publicprofile/${friend.user_id}`}>
            {friend.username}
          </Link>
          <img src={friend.avatar} alt={`${friend.username}'s avatar`} />
        </div>
      ))}
  
      <div className="section" onClick={() => toggleSection('followers')}>
        <h2>Your Followers</h2>
      </div>
      {showFollowers && followers.map(follower => (   
          <div key={follower.user_id} className="follower-card">
            <Link to={`/publicprofile/${follower.user_id}`}>
              {follower.username}
            </Link>
            <img src={follower.avatar} alt={`${follower.username}'s avatar`} />
          </div>        
      ))}

      <div className="section" onClick={() => toggleSection('followings')}>
        <h2>Your Followings</h2>
      </div>
      {showFollowings && followings.map(following => (
        <div key={following.user_id} className="following-card">       
          <Link to={`/publicprofile/${following.user_id}`}>
            {following.username}
          </Link>
          <img src={following.avatar} alt={`${following.username}'s avatar`} />         
        </div>        
      ))} 
    </div>
  ); 

}

export default ConnectionsPage;

  // return (
  //   <div>
  //     <h2>Your Friend List</h2>
  //     {friends.map(friend => (
  //       <div key={friend.user_id} className="friend-card">
  //         <Link to={`/publicprofile/${friend.user_id}`}>
  //           {friend.username}  {/* Assuming friend object has firstName and lastName properties */}
  //         </Link>
  //         <img src={friend.avatar} alt={`${friend.username}'s avatar`} />
  //       </div>
  //     ))}
  //     <h2>Your Followers List</h2>
  //     <h2>Your Followings List</h2>
  //   </div>
  // );