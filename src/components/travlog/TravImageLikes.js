import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faFire } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 

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

function ImageLikes({ currentUser, profileUser, userData, contextUser, travelog_id, image_id }) {
    // State to track if the image is liked
    const [isLiked, setIsLiked] = useState(false);
    const [likers, setLikers] = useState([]);
    const [showLikers, setShowLikers] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 

    // console.log('from image likes - currentUser, profileUser, userData, contextUser, travelog_id, image_id: ', currentUser, profileUser, userData, contextUser, travelog_id, image_id);
    
    const isCurrentUserProfileUser = currentUser === profileUser;

    // Fetch Likers
    const fetchLikers = useCallback(async () => {
      const response = await fetch(`http://localhost:5000/api/likers/image?image_id=${image_id}`);
      const data = await response.json();
      setLikers(data);
    }, [image_id]);

    function LikersModal({ isOpen, onClose, children, title }) {
      if (!isOpen) return null;
    
      return (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content modal-div-center" onClick={(e) => e.stopPropagation()}>
            <h2>{title}</h2> 
            {children}
            <button className="modal-close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
      );
    }

    // Fetch Like Status and Likers
    useEffect(() => {
      const fetchData = async () => {
          if (!currentUser || !profileUser || !userData || !contextUser) {
              setIsLoading(true);

              return;
          }

          // Fetch Like Status
          const response = await fetch(`http://localhost:5000/api/likes/image/check?user_id=${userData.user_id}&liker_id=${contextUser.user_id}&image_id=${image_id}`);
          const data = await response.json();
          setIsLiked(data.image);

          // Fetch Likers
          await fetchLikers();

          setIsLoading(false);
      };

      fetchData();
    }, [userData, contextUser, image_id, currentUser, profileUser, fetchLikers]);

    const handleLikeClick = async () => {
        if (isCurrentUserProfileUser) return;

        const response = await fetch('http://localhost:5000/api/likes/image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: userData.user_id, 
                liker_id: contextUser.user_id, 
                liketype: 'image', 
                image_id: image_id
            })
        });

        if (response.ok) {
            setIsLiked(!isLiked); // Toggle the local like state
            // Refetch likers to update the likers list
            await fetchLikers();
        }
    };

    const toggleLikersList = () => {
      // console.log("Toggling likers list");
      setShowLikers(!showLikers);
    };
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    return (
        <div className="fire">
          {!isCurrentUserProfileUser ? ( 
            <div className="like-buttons gallery-image-badge"> 
                <div className="tooltip">
                    <button onClick={handleLikeClick}>
                        <FontAwesomeIcon icon={faFire} color={isLiked ? 'rgb(255, 180, 50)' : 'black'} />
                    </button>
                    { contextUser.tooltips === true &&
                      <span className="tooltip-text">Great image!</span>
                    }

                </div>
            </div>
          ) : (   
            <div className="like-buttons gallery-image-badge ember">  
              {likers.length > 0 && (
                <div className="like-badge fire-badge">
                    <button disabled>
                        <FontAwesomeIcon icon={faFire} color={'gray'} />
                    </button> 


                      <span onClick={toggleLikersList} className={`like-count ${showLikers ? 'active' : ''}`}> 
                        <div className='likers-div tooltip'>
                          <span>{likers.length}</span>&nbsp;<span>Liker(s)</span>
                          { contextUser.tooltips === true &&
                            <span className="tooltip-text">Click to see full list of likers.</span>
                          }
                        </div> 
                      </span>

                </div> 
              )} 
            </div>
          )}
          <LikersModal
            isOpen={showLikers}
            onClose={() => setShowLikers(false)}
            title="People Who Found Your Writing Educational" // Pass title for writing likers
          >
            <LikedUsersList likers={likers} />
          </LikersModal>
        </div>
    );
}

export default ImageLikes;


