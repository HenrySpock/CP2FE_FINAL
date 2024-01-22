// TripLikes.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
// ADDING LIKE 01
import { faStar, faPen, faBook } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 

import './TripDet.css'
import '../interactions/LikersModal.css'

function LikedUsersList({ likers }) {
  return (
    <div>
      {likers.map((liker) => (
        <div key={liker.id}>
          <Link to={`/public_profile/${liker.Liker.username}`}>
            {liker.Liker.username}
          </Link>
        </div>
      ))}
    </div>
  );
}

function TripLikes({ currentUser, profileUser, userData, contextUser, trip_id }) { 

   // ADDING LIKE BADGE 02
  const [likedTrip, setLikedTrip] = useState(false);
  const [likedWriting, setLikedWriting] = useState(false);
  const [likedEducationalTrip, setLikedEducationalTrip] = useState(false);

  const [tripLikers, setTripLikers] = useState([]);
  const [writingLikers, setWritingLikers] = useState([]);
  const [educationalTripLikers, setEducationalTripLikers] = useState([]);

  const [showTripLikers, setShowTripLikers] = useState(false); 
  const [showWritingLikers, setShowWritingLikers] = useState(false); 
  const [showEducationalTripLikers, setShowEducationalTripLikers] = useState(false); 

  // console.log('tripdet trip_id: ', trip_id)

  // LIKE BADGE PROCESS 03
  const handleTripLikersClick = () => {
    setShowTripLikers(!showTripLikers); 
  }; 

  const handleWritingLikersClick = () => {
    setShowWritingLikers(!showWritingLikers);
    // console.log('showWritingLikers: ', showWritingLikers)
    // console.log('writingLikers: ', writingLikers)
  };

  const handleEducationalTripLikersClick = () => {
    setShowEducationalTripLikers(!showEducationalTripLikers); 
  };

  function LikersModal({ isOpen, onClose, children, title }) {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>{title}</h2> 
          {children}
          <button className="modal-close-btn" onClick={onClose}>Close</button>
          </div>
      </div>
    );
  }

  const toggleLikedTrip = async () => {
    try {
      await toggleLike(userData.user_id, contextUser.user_id, 'trip');
      setLikedTrip(prevState => !prevState);
    } catch (error) {
      console.error('Error toggling photographer like:', error);
    }
  }; 

  // Toggle liked status for writing
  const toggleLikedWriting = async () => {
    try {
      await toggleLike(userData.user_id, contextUser.user_id, 'writing');
      setLikedWriting(prevState => !prevState);
    } catch (error) {
      console.error('Error toggling writing like:', error);
    }
  };
  
  const toggleLikedEducationalTrip = async () => {
    try {
      await toggleLike(userData.user_id, contextUser.user_id, 'educational-trip');
      setLikedEducationalTrip(prevState => !prevState);
    } catch (error) {
      console.error('Error toggling educational trip like:', error);
    }
  }; 

  // LIKE BADGE PROCESS 04
  useEffect(() => {
    // Fetch likers for a specific trip
    if (trip_id) {
      // console.log('api/likers/trip trip_id: ', trip_id)
      const fetchLikers = async () => {
        try {
          const response = await fetch(`https://lgcbe.onrender.com/api/likers/trip?trip_id=${trip_id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch trip likers');
          }
          const likersData = await response.json();
          setTripLikers(likersData);
        } catch (error) {
          console.error('Error fetching trip likers:', error);
        }
      };
  
      fetchLikers();
    }
  }, [trip_id]);  

   useEffect(() => {
    // Fetch likers for a specific writing
    if (trip_id) {
      // console.log('api/likers/trip/writing trip_id: ', trip_id)
      const fetchWritingLikers = async () => {
        try {
          const response = await fetch(`https://lgcbe.onrender.com/api/likers/trip/writing?trip_id=${trip_id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch writing likers');
          }
          const likersData = await response.json();
          setWritingLikers(likersData);
        } catch (error) {
          console.error('Error fetching writing likers:', error);
        }
      };
  
      fetchWritingLikers();
    }
  }, [trip_id]);

  useEffect(() => {
    // Fetch likers for an educational trip
    if (trip_id) {
      const fetchEducationalLikers = async () => {
        try {
          const response = await fetch(`https://lgcbe.onrender.com/api/likers/educational-trip?trip_id=${trip_id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch educational trip likers');
          }
          const likersData = await response.json();
          setEducationalTripLikers(likersData);
        } catch (error) {
          console.error('Error fetching educational trip likers:', error);
        }
      };
  
      fetchEducationalLikers();
    }
  }, [trip_id]); 

  // Fetching status for trip like
  useEffect(() => { 
    const fetchLikeStatus = async () => {
      if (userData && contextUser && trip_id) {
        try {
          const response = await fetch(`https://lgcbe.onrender.com/api/likes/trip/check?user_id=${userData.user_id}&liker_id=${contextUser.user_id}&trip_id=${trip_id}`);
          if (!response.ok) {
            throw new Error('Failed to check like status');
          }
          const likeStatus = await response.json();
          setLikedTrip(likeStatus.trip); 
          // console.log('LIKESTATUS: ', likeStatus)
        } catch (error) {
          console.error('Error fetching like status:', error);
        }
      }
    };
   
    fetchLikeStatus();
  }, [userData, contextUser, trip_id, setLikedTrip]);

// Fetching status for writing like
useEffect(() => { 
  const fetchWritingLikeStatus = async () => {
    if (userData && contextUser && trip_id) {
      try {
        const response = await fetch(`https://lgcbe.onrender.com/api/likes/writing/check?user_id=${userData.user_id}&liker_id=${contextUser.user_id}&trip_id=${trip_id}`);
        if (!response.ok) {
          throw new Error('Failed to check writing like status');
        }
        const likeStatus = await response.json();
        setLikedWriting(likeStatus.writing);  
      } catch (error) {
        console.error('Error fetching writing like status:', error);
      }
    }
  };

  fetchWritingLikeStatus();
}, [userData, contextUser, trip_id, setLikedWriting]);


  
  // Fetching status for educational trip like
  useEffect(() => {
    // Fetch like status for educational trip
    const fetchEducationalLikeStatus = async () => {
      if (userData && contextUser && trip_id) {
        try {
          const response = await fetch(`https://lgcbe.onrender.com/api/likes/educational-trip/check?user_id=${userData.user_id}&liker_id=${contextUser.user_id}&trip_id=${trip_id}`);
          if (!response.ok) {
            throw new Error('Failed to check educational like status');
          }
          const likeStatus = await response.json();
          setLikedEducationalTrip(likeStatus.educationalTrip); 
        } catch (error) {
          console.error('Error fetching educational like status:', error);
        }
      }
    };
  
    fetchEducationalLikeStatus();
  }, [userData, contextUser, trip_id]);

  // POST fetch for likes 
  const toggleLike = async (user_id, liker_id, liketype) => { 
    // console.log('trip_likes trip_id: ', trip_id)
    
    try {
      const response = await fetch('https://lgcbe.onrender.com/api/likes/trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, liker_id, liketype, trip_id })
      });
  
      if (!response.ok) {
        throw new Error('Failed to toggle like');
      }
  
      // const data = await response.json();
      // console.log(data.message); 
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  }; 

  // console.log('On TripLikes - trip_id: ', trip_id)
  return (
    <div className='trip-like-buttons'>
        {currentUser !== profileUser && (
          <div className="trip-like-btn"> 
            <div className="tooltip">
              <button onClick={toggleLikedTrip}>
                <FontAwesomeIcon icon={faStar} color={likedTrip ? 'rgb(226, 226, 43)' : "black"} />
              </button>
              {contextUser.tooltips && (
                <span className="tooltip-text">What a fantastic trip!</span>
              )}
            </div>
          </div>
        )} 

        {currentUser === profileUser && (
          <div className="trip-like-btn"> 

            {tripLikers.length > 0 && ( 
              <div className="like-badge">
                <button disabled>
                  <FontAwesomeIcon icon={faStar} color={'gray'} />
                </button>

  

                  <span
                    onClick={handleTripLikersClick} className={`like-count ${showTripLikers ? 'active' : ''}`}> 
                    <div className='likers-div tooltip'>
                      <span>{tripLikers.length}</span>&nbsp;<span>Liker(s)</span>
                      {contextUser.tooltips && (
                        <span className="tooltip-text">Click to see full list of likers.</span>
                      )}
                    </div> 
                  </span> 

              </div>
            )}

          </div>
        )}

        {currentUser !== profileUser && (
          <div className="trip-like-btn">  
            <div className="tooltip">
              <button onClick={toggleLikedWriting}>
                <FontAwesomeIcon icon={faPen} color={likedWriting ? 'rgb(38, 139, 110)' : "black"} />
              </button>
              {contextUser.tooltips && (
                <span className="tooltip-text">Great writing!</span>
              )}
            </div> 
          </div>
        )}

        {currentUser === profileUser && (
          <div className="trip-like-btn">
            {writingLikers.length > 0 && (

              <div className="like-badge">
                <button disabled>
                  <FontAwesomeIcon icon={faPen} color={'gray'} />
                </button>


                  <span onClick={handleWritingLikersClick} className={`like-count ${showWritingLikers ? 'active' : ''}`}> 
                    <div className='likers-div tooltip'>
                      <span>{writingLikers.length}</span>&nbsp;<span>Liker(s)</span>
                      {contextUser.tooltips && (
                        <span className="tooltip-text">Click to see full list of likers.</span>
                      )}
                    </div> 
                  </span>

  
              </div>
            )}
          </div>
        )}

        {currentUser !== profileUser && (
          <div className="trip-like-btn"> 
            <div className="tooltip">
              <button onClick={toggleLikedEducationalTrip}>
                <FontAwesomeIcon icon={faBook} color={likedEducationalTrip ? 'rgb(102, 80, 51)' : "black"} />
              </button>
              {contextUser.tooltips && (
                <span className="tooltip-text">What an educational trip!</span>
              )}
            </div>
          </div>
        )} 

        {currentUser === profileUser && (
          <div className="trip-like-btn"> 
            {educationalTripLikers.length > 0 && (
              <div className="like-badge">
                <button disabled>
                  <FontAwesomeIcon icon={faBook} color={'gray'} />
                </button>


                  <span onClick={handleEducationalTripLikersClick} className={`like-count ${showEducationalTripLikers ? 'active' : ''}`}> 
                    <div className='likers-div tooltip'>
                      <span>{educationalTripLikers.length}</span>&nbsp;<span>Liker(s)</span>
                      {contextUser.tooltips && (
                        <span className="tooltip-text">Click to see full list of likers.</span>
                      )}
                    </div> 
                  </span>


              </div>
            )}

          </div>
        )}
        
        <LikersModal
          isOpen={showTripLikers}
          onClose={() => setShowTripLikers(false)}
          title="People Who Loved Your Trip" // Pass title for photography likers
        >
          <LikedUsersList likers={tripLikers} />
        </LikersModal>



        <LikersModal
          isOpen={showWritingLikers}
          onClose={() => setShowWritingLikers(false)}
          title="People Who Liked Your Writing" // Pass title for writing likers
        >
          <LikedUsersList likers={writingLikers} />
        </LikersModal>


        <LikersModal
          isOpen={showEducationalTripLikers}
          onClose={() => setShowEducationalTripLikers(false)}
          title="People Who Found Your Writing Educational" // Pass title for writing likers
        >
          <LikedUsersList likers={educationalTripLikers} />
        </LikersModal>
    </div>
  );
}

export default TripLikes;




 

