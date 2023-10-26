import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InteractionModal from './InteractionModal';
import { UserContext } from '../user/UserContext';

function PublicProfile() {
  const { username: profileUser } = useParams();
  console.log('profileUser: ', profileUser)
  const contextValue = useContext(UserContext); 
  console.log('contextValue: ', contextValue)
  const { user: contextUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkBlockStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${profileUser}/block-status/${currentUser}`);
        if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
        const data = await response.json();
        if (data.isBlocked) {
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking block status:', error);
      }
    };
    if (currentUser) {
      checkBlockStatus();
    }
  }, [profileUser, currentUser, navigate]);
  
  useEffect(() => {
    if (contextUser) {
      setCurrentUser(contextUser.username);
    }
  }, [contextUser]);
  console.log('currentUser: ', currentUser)

  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friendshipStatus, setFriendshipStatus] = useState(null);

  const handleBefriend = () => { /*...*/ };
  const handleFollow = () => { /*...*/ };
  const handleBlock = () => { /*...*/ };
  const handleReport = () => { /*...*/ };
  const toggleModal = () => { setIsModalOpen(prevIsModalOpen => !prevIsModalOpen); };

  const fetchUserProfile = async (profileUser) => {
    const response = await fetch(`http://localhost:5000/api/users/${profileUser}`);
    if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
    return response.json();
  };

  useEffect(() => {
    fetchUserProfile(profileUser)
      .then(data => {
        setUserData(data);
        console.log('Public Facing User Response Data: ', data);
      })
      .catch(error => console.error('Error fetching user profile:', error));
  }, [profileUser]);

  // useEffect(() => {
  //   const fetchFriendshipStatus = async () => {
  //     if (currentUser && profileUser) {
  //       const url = `http://localhost:5000/api/friends/status/${currentUser}/${profileUser}`;
  //       console.log('Fetching friendship status with URL:', url);  // Add this line
  //       const response = await fetch(url);
  //       const data = await response.json();
  //       console.log('fetchFriendshipStatus Response: ', data);
  //       // setFriendshipStatus(data);
  //     }
  //   };
  //   fetchFriendshipStatus();
  // }, [currentUser, profileUser]);

  useEffect(() => {
    const fetchFriendshipStatus = async () => {
      if (currentUser && profileUser) {
        try {
          // Fetch user IDs
          const response1 = await fetch(`http://localhost:5000/api/users/${currentUser}`);
          const data1 = await response1.json(); 
          const { user_id: user1Id } = data1;
  
          const response2 = await fetch(`http://localhost:5000/api/users/${profileUser}`);
          const data2 = await response2.json();
          const { user_id: user2Id } = data2;
  
          // Check friendship status
          const url = `http://localhost:5000/api/friends/status/${user1Id}/${user2Id}`;
          console.log('Fetching friendship status with URL:', url);
          const response = await fetch(url);
          const data = await response.json();
          console.log('fetchFriendshipStatus Response: ', data);
          setFriendshipStatus(data);
        } catch (error) {
          console.error('Error fetching friendship status:', error);
        }
      }
    };
    fetchFriendshipStatus();
  }, [currentUser, profileUser]);

  return (
    <div>
      {userData && (
        <>
          <h1>{userData.username}</h1>
          <div className='user-avatar'>
            <img src={userData.avatar || '/path/to/default/avatar.jpg'} alt={`${userData.username}'s avatar`} />
          </div>
          {/* <button onClick={toggleModal}>{isModalOpen ? 'Cancel' : 'Interact'}</button> */}
          {/* <InteractionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onBefriend={handleBefriend}
            friendshipStatus={friendshipStatus}
            setFriendshipStatus={setFriendshipStatus}
            onFollow={handleFollow}
            onBlock={handleBlock}
            onReport={handleReport}
            currentUser={currentUser}
            profileUser={profileUser}
          /> */}
            {currentUser !== profileUser && (
              <>
                <button onClick={toggleModal}>{isModalOpen ? 'Cancel' : 'Interact'}</button>
                <InteractionModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onBefriend={handleBefriend}
                  friendshipStatus={friendshipStatus}
                  setFriendshipStatus={setFriendshipStatus}
                  onFollow={handleFollow}
                  onBlock={handleBlock}
                  onReport={handleReport}
                  currentUser={currentUser}
                  profileUser={profileUser}
                />
              </>
            )}
          <p>{userData.bio}</p> 
        </>
      )}
    </div>
  );
}

export default PublicProfile;
 