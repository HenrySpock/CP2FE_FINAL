// PublicProfileLikes.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faPen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import './PublicProfile.css'
import './LikersModal.css' 

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

function PublicProfileLikes({ currentUser, profileUser, userData, contextUser }) {
  const [likedPhotographer, setLikedPhotographer] = useState(false);
  const [likedWriter, setLikedWriter] = useState(false);
  const [photographyLikers, setPhotographyLikers] = useState([]);
  const [writingLikers, setWritingLikers] = useState([]);
  const [showPhotographyLikers, setShowPhotographyLikers] = useState(false);
  const [showWritingLikers, setShowWritingLikers] = useState(false);

  const handlePhotographyLikersClick = () => {
    setShowPhotographyLikers(!showPhotographyLikers);
    // console.log('showPhotographyLikers: ', showPhotographyLikers)
    // console.log('photographyLikers: ', photographyLikers)
  };

  const handleWritingLikersClick = () => {
    setShowWritingLikers(!showWritingLikers);
    // console.log('showWritingLikers: ', showWritingLikers)
    // console.log('writingLikers: ', writingLikers)
  }; 

  // console.log('on publicprofilelikes currentUser, profileUser, userData, contextUser', currentUser, profileUser, userData, contextUser)

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

  useEffect(() => {
    // Fetch likers for photography for the specific profile user
    fetch(`https://lgcbe.onrender.com/api/likers/photography?user_id=${userData.user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setPhotographyLikers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  
    // Fetch likers for writing for the specific profile user
    fetch(`https://lgcbe.onrender.com/api/likers/writing?user_id=${userData.user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setWritingLikers(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userData.user_id]);


  useEffect(() => {
    // Define an async function inside useEffect
    const fetchLikeStatus = async () => {
      if (userData && contextUser) {
        try {
          const response = await fetch(`https://lgcbe.onrender.com/api/likes/profile/check?user_id=${userData.user_id}&liker_id=${contextUser.user_id}`);
          if (!response.ok) {
            throw new Error('Failed to check like status');
          }
          const likeStatus = await response.json();
          setLikedPhotographer(likeStatus.photography);
          setLikedWriter(likeStatus.writing);
          // console.log('LIKESTATUS: ', likeStatus)
        } catch (error) {
          console.error('Error fetching like status:', error);
        }
      }
    };
  
    // Always call the function unconditionally
    fetchLikeStatus();
  }, [userData, contextUser, setLikedPhotographer, setLikedWriter]);

  const toggleLikedPhotographer = async () => {
    try {
      await toggleLike(userData.user_id, contextUser.user_id, 'photography');
      setLikedPhotographer(prevState => !prevState);
    } catch (error) {
      console.error('Error toggling photographer like:', error);
    }
  };

  const toggleLikedWriter = async () => {
    try {
      await toggleLike(userData.user_id, contextUser.user_id, 'writing');
      setLikedWriter(prevState => !prevState);
    } catch (error) {
      console.error('Error toggling writer like:', error);
    }
  };

  // POST fetch for likes 
  const toggleLike = async (user_id, liker_id, liketype) => {
    try {
      const response = await fetch('https://lgcbe.onrender.com/api/likes/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, liker_id, liketype })
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

 

  return (
    <div>
        {currentUser !== profileUser && (
          <div className="profile-like-buttons">

            <div className="tooltip">
              <button onClick={toggleLikedPhotographer} >
                <FontAwesomeIcon icon={faCamera} color={likedPhotographer ? 'rgb(83, 146, 255)' : "black"} />
              </button>
              {contextUser.tooltips && (
              <span className="tooltip-text">You're a great photographer!</span>
              )}
            </div>

            <div className="tooltip">
              <button onClick={toggleLikedWriter}>
                <FontAwesomeIcon icon={faPen} color={likedWriter ? 'rgb(38, 139, 110)' : "black"} />
              </button>
              {contextUser.tooltips && (
                <span className="tooltip-text">You're a great writer!</span>
              )}
            </div>

          </div>
        )}
          

        <div>
          {currentUser === profileUser && (
            <div className="profile-like-buttons">
                {photographyLikers.length > 0 && ( 
                  <div className="like-badge">
                    <button disabled>
                      <FontAwesomeIcon icon={faCamera} color={'gray'} />
                    </button>



                    <span
                      onClick={handlePhotographyLikersClick}
                      className={`like-count ${showPhotographyLikers ? 'active' : ''}`}
                    >
                      <div className='likers-div tooltip'>
                        <span>{photographyLikers.length}</span>&nbsp;<span>Liker(s)</span>
                        {contextUser.tooltips && (
                          <span className="tooltip-text">Click to see full list of likers.</span>
                        )}
                      </div>
                    </span>
                  </div>
                )}
                
                {writingLikers.length > 0 && ( 
                  <div className="like-badge">
                    <button disabled>
                      <FontAwesomeIcon icon={faPen} color={'gray'} />
                    </button>



                    <span
                      onClick={handleWritingLikersClick}
                      className={`like-count ${showWritingLikers ? 'active' : ''}`}
                    >
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
          <LikersModal
            isOpen={showPhotographyLikers}
            onClose={() => setShowPhotographyLikers(false)}
            title="Likers for Photography" // Pass title for photography likers
          >
            <LikedUsersList likers={photographyLikers} />
          </LikersModal>

          <LikersModal
            isOpen={showWritingLikers}
            onClose={() => setShowWritingLikers(false)}
            title="Likers for Writing" // Pass title for writing likers
          >
            <LikedUsersList likers={writingLikers} />
          </LikersModal>
        </div>
    </div>
  );
}

export default PublicProfileLikes;




