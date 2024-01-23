import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import InteractionModal from './InteractionModal';
import { UserContext } from '../user/UserContext';

import ProfileMap from './ProfileMap';

import PublicProfileLikes from './PublicProfileLikes'

import './PublicProfile.css'

import MapSorting from '../user/MapSorting'

function PublicProfile() {
  const { username: profileUser } = useParams(); // username for profile user from url
  const { user: contextUser } = useContext(UserContext); // user data for current user
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null); // username for current user
  const [isBlocked, setIsBlocked] = useState(null);  
  const [userData, setUserData] = useState(null); //User Data for Profile User
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friendshipStatus, setFriendshipStatus] = useState(null);

  const [profileMapCenter, setProfileMapCenter] = useState([0, 0]); // Default center 
  const [profileTravelogs, setProfileTravelogs] = useState([]);
  const [profileTrips, setProfileTrips] = useState([]); 

  const [filteredTravelogs, setFilteredTravelogs] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [lastActiveTime, setLastActiveTime] = useState(null);

  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
 
  const handleVisibilityChange = useCallback((newFilteredTravelogs, newFilteredTrips) => {
    setFilteredTravelogs(newFilteredTravelogs);
    setFilteredTrips(newFilteredTrips);
  }, []);

  const toggleBioModal = () => {
    setIsBioModalOpen(prev => !prev);
  };

  function BioModal({ isOpen, onClose, bio }) {
    if (!isOpen) return null;
  
    return (
      <div className="overlay" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <p>{bio}</p>
          <button className='close-bio-btn' onClick={onClose}><p>Close</p></button>
        </div>
      </div>
    );
  } 

useEffect(() => {
  const incrementViewCount = async () => { 
    try {
      const response = await fetch(`https://lgcbe.onrender.com/viewcount/api/public_profile/increment-view-count/${profileUser}`, {
        method: 'PATCH',
      });

      if (response.ok) {
        // console.log('View count incremented for user:', profileUser);
      } else {
        throw new Error('Failed to increment view count');
      }
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };
  let username = String(contextUser?.username);
  if (contextUser && profileUser && username !== profileUser) { 
    
    // console.log('currentUser && profileUser && username !== profileUser)', contextUser, profileUser, username)
    incrementViewCount();
  } else {
    // console.log('Condition not met, not incrementing view count.'); 
  }
}, [profileUser, contextUser]); 


  useEffect(() => {
    // Existing fetch logic
    setFilteredTravelogs(profileTravelogs); 
    setFilteredTrips(profileTrips); 
  }, [userData, profileTravelogs, profileTrips]);

  useEffect(() => {
    const checkBlockStatus = async () => {
      try {
        const response = await fetch(`https://lgcbe.onrender.com/api/users/${profileUser}/block-status/${currentUser}`);
        if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
        const data = await response.json();
        if (data.isBlocked) {
          navigate('/');
        } else {
          setIsBlocked(false);  
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
  // console.log('currentUser: ', currentUser, 'profileUser: ', profileUser, 'userData: ', userData, 'contextUser: ', contextUser) 

  const handleBefriend = () => { /*...*/ };
  const handleFollow = () => { /*...*/ };
  const handleBlock = () => { /*...*/ }; 
  const toggleModal = () => { setIsModalOpen(prevIsModalOpen => !prevIsModalOpen); };



  const getActivityIndicator = () => {
    if (!lastActiveTime) return 'red';  
  
    const currentTime = new Date();
    const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000); // 1 hour ago
    const twelveHoursAgo = new Date(currentTime.getTime() - 12 * 60 * 60 * 1000); // 12 hours ago
    const lastActiveDate = new Date(lastActiveTime);
  
    if (lastActiveDate >= oneHourAgo) {
      return 'green'; // Active within the last hour
    } else if (lastActiveDate >= twelveHoursAgo) {
      return 'yellow'; // Active within the last 12 hours but not the last hour
    } else {
      return 'red'; // Not active in the last 12 hours
    }
  };
  
  
  const activityIndicatorColor = getActivityIndicator();

  useEffect(() => {

    const fetchUserProfile = async (profileUser) => {
      try {
        const response = await fetch(`https://lgcbe.onrender.com/user/api/users-last-active/${profileUser}`);
        if (response.ok) {
          const userData = await response.json();
          // console.log('profile user (userData): ', userData)
          setUserData(userData);
          setLastActiveTime(userData.last_active);
          // console.log("Last Active Time: ", lastActiveTime);
          return userData;
        } else if (response.status === 404) {
          // console.log('User not found, redirecting...');
          navigate('/');
        } else {
          throw new Error('Server error');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    
    fetchUserProfile(profileUser)
      .then(data => {
        if (data) {
          setUserData(data);
        }
      })
      .catch(error => {
        console.error('Error in user profile fetch:', error);
      });
  }, [profileUser, navigate]);

  useEffect(() => {
    const fetchFriendshipStatus = async () => {
      if (currentUser && profileUser) {
        try {
          // Fetch user IDs
          const response1 = await fetch(`https://lgcbe.onrender.com/user/api/users/${currentUser}`);
          const data1 = await response1.json(); 
          const { user_id: user1Id } = data1;
  
          const response2 = await fetch(`https://lgcbe.onrender.com/user/api/users/${profileUser}`);
          const data2 = await response2.json();
          const { user_id: user2Id } = data2;
  
          // Check friendship status
          const url = `https://lgcbe.onrender.com/api/friends/status/${user1Id}/${user2Id}`;
          // console.log('Fetching friendship status with URL:', url);
          const response = await fetch(url);
          const data = await response.json();
          // console.log('fetchFriendshipStatus Response: ', data);
          setFriendshipStatus(data);
        } catch (error) {
          console.error('Error fetching friendship status:', error);
        }
      }
    };
    fetchFriendshipStatus();
  }, [currentUser, profileUser]);

  // Fetch profile user's travelogs and trips
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch travelogs
        const travelogsResponse = await fetch(`https://lgcbe.onrender.com/travelog/api/user/${userData.user_id}/travelogs`);
        const travelogsData = await travelogsResponse.json();
        const publicTravelogs = travelogsData.filter(travelog => !travelog.is_private); 

        
        setProfileTravelogs(publicTravelogs);
        
        // Fetch trips
        const tripsResponse = await fetch(`https://lgcbe.onrender.com/trip/api/trips/${userData.user_id}`);
        const tripsData = await tripsResponse.json();
        // console.log('publicprofile tripsData: ', tripsData, 'publicprofile travelogsData: ', travelogsData)
        const publicTrips = tripsData.filter(trip => !trip.is_private); 
        setProfileTrips(publicTrips); 

        // Set the map center to the profile user's mapCenter if available
        if (userData.map_center) {
          setProfileMapCenter(userData.map_center);
        }
 

      } catch (error) {
        console.error('Error fetching profile user data:', error);
      }
    };

    if (userData && userData.user_id) {
      fetchProfileData();
    }
  }, [userData]);

  if (isBlocked === null) {
    return null;  // Don't render anything until block status is determined
  }

  return (
    <div>
      {userData && (
        <>
          <div className='home-center'>
            <h1>Public Profile for {userData.username}</h1>
          </div>

          <div className="home-map-row">

            <div className="home-map-col hmcl">
              <div className='public-profile-avatar'>
                <img src={userData.avatar || '/path/to/default/avatar.jpg'} alt={`${userData.username}'s avatar`} />
              </div> 

              {currentUser !== profileUser && (
                <>
                  <button className='interaction-mini-btn green-button' onClick={toggleModal}>{isModalOpen ? 'Cancel' : 'Interact'}</button>
                  <InteractionModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onBefriend={handleBefriend}
                    friendshipStatus={friendshipStatus}
                    setFriendshipStatus={setFriendshipStatus}
                    onFollow={handleFollow}
                    onBlock={handleBlock} 
                    currentUser={currentUser}
                    profileUser={profileUser}
                    contextUser={contextUser}
                    userData={userData} 
                  />
                </>
              )}

              <div className='likes'>
                <PublicProfileLikes
                  currentUser={currentUser}
                  profileUser={profileUser}
                  userData={userData}
                  contextUser={contextUser}
                />
              </div>
 
              <h2 className='sort'>Sort Map:</h2>

              <div> 
                <MapSorting 
                  travelogs={profileTravelogs} // Original, unfiltered travelogs
                  trips={profileTrips}         // Original, unfiltered trips
                  onVisibilityChange={handleVisibilityChange} // Function to handle visibility change
                />  
              </div>
              
            </div> 

              <ProfileMap
                map_center={profileMapCenter} 
                userZoom={userData.user_zoom}
                travelogs={filteredTravelogs} 
                trips={filteredTrips}       
              />

            
            <div className="home-map-col hmcr">
            <h2 className='online'>
              <span 
                className={`activity-indicator ${activityIndicatorColor}`}
                title={`Last active: ${lastActiveTime ? new Date(lastActiveTime).toLocaleString() : 'Unavailable'}`}
              ></span>
            </h2>

            <h2 className='profile-bio' >Bio</h2> 
            <p className='bio-text'>{userData.bio}</p>

            <button className='show-bio-btn' onClick={toggleBioModal}>Show Full Bio</button>

            <BioModal 
              isOpen={isBioModalOpen} 
              onClose={toggleBioModal} 
              bio={userData.bio}
            />

            </div> 


          </div> 
          
        <div className='profile-slate'>

          {/* Section for Trips */}
          <h2>Trips</h2>
          <div>
            {profileTrips.map(trip => (
              <Link key={trip.trip_id} to={`/trip_det/${trip.trip_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="prof-mini-card">
                  <div className="prof-mini-img-div">
                    {trip.image_url && (
                      <img 
                        className='prof-mini-img'
                        src={trip.image_url} 
                        alt="Trip"
                      />
                    )}
                  </div>
                  <div className='prof-mini-card-text'>
                    <h3>{trip.title}</h3>
                    <p>{trip.description}</p>
                    <p>From {new Date(trip.date_of_departure).toLocaleDateString('en-CA')} <span> </span>
                      to {new Date(trip.date_of_return).toLocaleDateString('en-CA')}</p> 
                  </div>
                </div>
              </Link>
            ))}
          </div>


          {/* Section for Travelogs */}
          <h2>Travelogs</h2>
          <div>
            {profileTravelogs.map(travelog => (   
              <Link key={travelog.travelogId} to={`/trav_det/${travelog.travelogId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="prof-mini-card">
                  <div className="prof-mini-img-div">
                    {travelog.Images[0] && (
                      <img 
                        className='prof-mini-img'
                        src={travelog.Images[0].image_url} 
                        alt="Travelog"
                      />
                    )}
                  </div>
                  <div className='prof-mini-card-text'>
                    <h3>{travelog.title}</h3>
                    <p>{travelog.site}</p>
                    <p>Visited On {new Date(travelog.date_visited).toLocaleDateString('en-CA')}</p> 
                  </div>
                </div>
              </Link>
            ))}
          </div>



        </div>

        </>
      )}
    </div>
  );
}

export default PublicProfile;
 