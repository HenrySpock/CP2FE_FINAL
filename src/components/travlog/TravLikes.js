// TripLikes.js
import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
// ADDING LIKE 01
import { faPlane, faHeart, faSync, faPen, faBook } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 
import { UserContext } from '../user/UserContext';

import './TravDet.css'
import '../interactions/LikersModal.css'

function LikedUsersList({ likers }) {
  return (
    <div >
      {likers.map((liker) => (
        <div className='modal-div-center' key={liker.id}>
          <Link to={`/public_profile/${liker.Liker.username}`}>
            {liker.Liker.username}
          </Link>
        </div>
      ))}
    </div>
  );
}

function TravLikes({  
  userData, 
  profileUser, 
  contextUser, travelog_id }) { 

  const { user: currentUser } = useContext(UserContext); 

  // ADDING LIKE BADGE 02
  const [likedWantToTravel, setLikedWantToTravel] = useState(false);
  const [likedTraveled, setLikedTraveled] = useState(false);
  const [likedRetraveled, setLikedRetraveled] = useState(false);
  const [likedWriting, setLikedWriting] = useState(false);
  const [likedInformative, setLikedInformative] = useState(false);


  const [wantToTravelLikers, setWantToTravelLikers] = useState([]);
  const [traveledLikers, setTraveledLikers] = useState([]);
  const [retraveledLikers, setRetraveledLikers] = useState([]);
  const [writingLikers, setWritingLikers] = useState([]);
  const [informativeLikers, setInformativeLikers] = useState([]);


  const [showWantToTravelLikers, setShowWantToTravelLikers] = useState(false); 
  const [showTraveledLikers, setShowTraveledLikers] = useState(false); 
  const [showRetraveledLikers, setShowRetraveledLikers] = useState(false); 
  const [showWritingLikers, setShowWritingLikers] = useState(false); 
  const [showInformativeLikers, setShowInformativeLikers] = useState(false); 

  // console.log('on TravLikes.js: currentUser: ', currentUser, 'profileUser: ', profileUser, 'userData: ', userData, 'contextUser: ', contextUser, 'travelog_id: ', travelog_id)

  // LIKE BADGE PROCESS 03
  const handleWantToTravelLikersClick = () => {
    setShowWantToTravelLikers(!showWantToTravelLikers); 
  }; 

  const handleTraveledLikersClick = () => {
    setShowTraveledLikers(!showTraveledLikers); 
  }; 

  const handleRetraveledLikersClick = () => {
    setShowRetraveledLikers(!showRetraveledLikers); 
  }; 

  const handleWritingLikersClick = () => {
    setShowWritingLikers(!showWritingLikers);
    // console.log('showRetraveledLikers: ', showRetraveledLikers)
    // console.log('retraveledLikers: ', retraveledLikers)
  }; 

  const handleInformativeLikersClick = () => {
    setShowInformativeLikers(!showInformativeLikers); 
  }; 

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

  // LIKE BADGE PROCESS 04
  useEffect(() => {
    // Fetch likers for a specific travelog
    const travelogId = travelog_id;  
    fetch(`http://localhost:5000/api/likers/want-to-travel?travelog_id=${travelogId}`)
      .then((response) => response.json())
      .then((data) => {
        setWantToTravelLikers(data);
      })
      .catch((error) => {
        console.error(error);
      }); 
  }, [travelog_id]); 

useEffect(() => {
  // Fetch likers for a specific travelog
  const travelogId = travelog_id; 
  fetch(`http://localhost:5000/api/likers/traveled?travelog_id=${travelogId}`)
    .then((response) => response.json())
    .then((data) => {
      setTraveledLikers(data);
    })
    .catch((error) => {
      console.error(error);
    }); 
}, [travelog_id]); 

  useEffect(() => {
    // Fetch likers for trip
    const travelogId = travelog_id;
    fetch(`http://localhost:5000/api/likers/retraveled?travelog_id=${travelogId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log('Retraveled Likers:', data);  
        setRetraveledLikers(data);
      })
      .catch((error) => {
        console.error(error);
      }); 
  }, [travelog_id]);

  useEffect(() => {
    // Fetch likers for trip
    const travelogId = travelog_id;
    fetch(`http://localhost:5000/api/travelog/likers/writing?travelog_id=${travelogId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log('Retraveled Likers:', data);  
        setWritingLikers(data);
      })
      .catch((error) => {
        console.error(error);
      }); 
  }, [travelog_id]);
 
  useEffect(() => {
    // Fetch likers for trip
    const travelogId = travelog_id;
    fetch(`http://localhost:5000/api/likers/informative?travelog_id=${travelogId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log('Retraveled Likers:', data);  
        setInformativeLikers(data);
      })
      .catch((error) => {
        console.error(error);
      }); 
  }, [travelog_id]);

  // LIKE BADGE PROCESS 05
  useEffect(() => { 
    const fetchLikeStatus = async () => {
      if (userData && contextUser && travelog_id) {
        try {
          const response = await fetch(`http://localhost:5000/api/likes/travelog/check?user_id=${userData.user_id}&liker_id=${contextUser.user_id}&travelog_id=${travelog_id}`);
          if (!response.ok) {
            throw new Error('Failed to check like status');
          }
          const likeStatus = await response.json();
          // console.log('TRAVLIKES LIKESTATUS: ', likeStatus)
          setLikedWantToTravel(likeStatus.wantToTravel); 
          setLikedTraveled(likeStatus.traveled); 
          setLikedRetraveled(likeStatus.retraveled); 
          setLikedWriting(likeStatus.writing); 
          setLikedInformative(likeStatus.informative)
          // console.log('LIKESTATUS: ', likeStatus)
        } catch (error) {
          console.error('Error fetching like status:', error);
        }
      }
    };
  
    // Always call the function unconditionally
    fetchLikeStatus();
  }, [userData, contextUser, travelog_id, setLikedWantToTravel, setLikedTraveled, setLikedRetraveled, setLikedInformative ]);

  // console.log('likedWantToTravel: ////////////', likedWantToTravel)

  // LIKE BADGE PROCESS 05
  const toggleLikedWantToTravel = async () => {
    try {
      await toggleLike(userData.user_id, contextUser.user_id, 'want-to-travel', travelog_id);
      setLikedWantToTravel(prevState => !prevState);
    } catch (error) {
      console.error('Error toggling want-to-travel like:', error);
    }
  }; 

  const toggleLikedTraveled = async () => {
    try {
      await toggleLike(userData.user_id, contextUser.user_id, 'traveled', travelog_id);
      setLikedTraveled(prevState => !prevState);
    } catch (error) {
      console.error('Error toggling traveled like:', error);
    }
  }; 

  const toggleLikedRetraveled = async () => {
    try {
      await toggleLike(userData.user_id, contextUser.user_id, 'retraveled', travelog_id);
      setLikedRetraveled(prevState => !prevState);
    } catch (error) {
      console.error('Error toggling retraveled like:', error);
    }
  }; 

  const toggleLikedWriting = async () => {
    try {
      await toggleLike(userData.user_id, contextUser.user_id, 'writing', travelog_id);
      setLikedWriting(prevState => !prevState);
    } catch (error) {
      console.error('Error toggling writing like:', error);
    }
  }; 

  const toggleLikedInformative = async () => {
    try {
      await toggleLike(userData.user_id, contextUser.user_id, 'informative', travelog_id);
      setLikedInformative(prevState => !prevState);
    } catch (error) {
      console.error('Error toggling informative like:', error);
    }
  }; 

  // POST fetch for likes 
  const toggleLike = async (user_id, liker_id, liketype, travelog_id) => { 
    // console.log('POST trav_like fetch travelog_id: ', travelog_id);
    try {
      const response = await fetch('http://localhost:5000/api/likes/travelog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, liker_id, liketype, travelog_id })
      });
  
      if (!response.ok) {
        throw new Error('Failed to toggle like');
      }
  
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  }; 

    // Conditional rendering to check if currentUser is not null
    if (!currentUser) {
      return <div>Loading...</div>; 
    }
  // console.log('currentUser, currentUser.username, profileUser on TravLikes: ', currentUser, currentUser.username, profileUser)

  if (!contextUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        {currentUser.username !== profileUser && (
          <div className="trav-like-buttons"> 

            {/* LIKE BADGE PROCESS 06*/}
            <div className="tooltip">
              <button onClick={toggleLikedWantToTravel}>
                <FontAwesomeIcon icon={faPlane} color={likedWantToTravel ? 'rgb(255, 13, 0)' : "black"} />
              </button>
              {contextUser.tooltips && (
                <span className="tooltip-text">I really want to go!</span>
              )}
            </div>
            
            <div className="tooltip">
              <button onClick={toggleLikedTraveled}>
                <FontAwesomeIcon icon={faHeart} color={likedTraveled ? 'rgb(83, 146, 255)' : "black"} />
              </button>
              {contextUser.tooltips && (
                <span className="tooltip-text">I love this place too!</span>
              )}
            </div>
            
            <div className="tooltip">
              <button onClick={toggleLikedRetraveled}>
                <FontAwesomeIcon icon={faSync} color={likedRetraveled ? 'rgb(226, 226, 43)' : "black"} />
              </button>
              {contextUser.tooltips && (
                <span className="tooltip-text">I went more than once!</span>
              )}
            </div>

            <div className="tooltip">
              <button onClick={toggleLikedWriting}>
                <FontAwesomeIcon icon={faPen} color={likedWriting ? 'rgb(38, 139, 110)' : "black"} />
              </button>
              {contextUser.tooltips && (
                <span className="tooltip-text">Great writing!</span>
              )}
            </div>

            <div className="tooltip">
              <button onClick={toggleLikedInformative}>
                <FontAwesomeIcon icon={faBook} color={likedInformative ? 'rgb(102, 80, 51)' : "black"} />
              </button>
              {contextUser.tooltips && (
                <span className="tooltip-text">This taught me something new!</span>
              )}
            </div>

          </div>
        )} 

        <div>
          {currentUser.username === profileUser && (
            <div className="trav-like-buttons"> 

              
                {wantToTravelLikers.length > 0 && ( 
                  <div className="like-badge">
                    <button disabled>
                      <FontAwesomeIcon icon={faPlane} color={'gray'} />
                    </button>



                      <span
                        onClick={handleWantToTravelLikersClick}
                        className={`like-count ${showWantToTravelLikers ? 'active' : ''}`}
                      > 
                        <div className='likers-div tooltip'>
                          <span>{wantToTravelLikers.length}</span>&nbsp;<span>Liker(s)</span>
                          {contextUser.tooltips && (
                            <span className="tooltip-text">Click to see full list of likers.</span>
                          )}
                        </div> 
                      </span> 
                  </div>
                )} 




                  {traveledLikers.length > 0 && ( 
                    <div className="like-badge">
                      <button disabled>
                        <FontAwesomeIcon icon={faHeart} color={'gray'} />
                      </button>



                        <span
                          onClick={handleTraveledLikersClick}
                          className={`like-count ${showTraveledLikers ? 'active' : ''}`}
                        > 
                          <div className='likers-div tooltip'>
                            <span>{traveledLikers.length}</span>&nbsp;<span>Liker(s)</span>
                            {contextUser.tooltips && (
                              <span className="tooltip-text">Click to see full list of likers.</span>
                            )}
                          </div> 
                        </span> 
                    </div>
                  )}



                  {retraveledLikers.length > 0 && ( 
                    <div className="like-badge">
                      <button disabled>
                        <FontAwesomeIcon icon={faSync} color={'gray'} />
                      </button> 

                      <span
                        onClick={handleRetraveledLikersClick}
                        className={`like-count ${showRetraveledLikers ? 'active' : ''}`}
                      > 
                        <div className='likers-div tooltip'>
                          <span>{retraveledLikers.length}</span>&nbsp;<span>Liker(s)</span>
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


                  {informativeLikers.length > 0 && ( 
                    <div className="like-badge">
                      <button disabled>
                        <FontAwesomeIcon icon={faBook} color={'gray'} />
                      </button>



                        <span
                          onClick={handleInformativeLikersClick}
                          className={`like-count ${showInformativeLikers ? 'active' : ''}`}
                        > 
                          <div className='likers-div tooltip'>
                            <span>{informativeLikers.length}</span>&nbsp;<span>Liker(s)</span>
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
          isOpen={showWantToTravelLikers}
          onClose={() => setShowWantToTravelLikers(false)}
          title="People Who Want To Go Here"  
          >
          <LikedUsersList likers={wantToTravelLikers} />
          </LikersModal>

          <LikersModal
          isOpen={showTraveledLikers}
          onClose={() => setShowTraveledLikers(false)}
          title="People Who Have Been Here"  
          >
          <LikedUsersList likers={traveledLikers} />
          </LikersModal>

          <LikersModal
          isOpen={showRetraveledLikers}
          onClose={() => setShowRetraveledLikers(false)}
          title="People Who Have Been Here More Than Once"  
          >
          <LikedUsersList likers={retraveledLikers} />
          </LikersModal>

          <LikersModal
          isOpen={showWritingLikers}
          onClose={() => setShowWritingLikers(false)}
          title="People Who Like Your Writing"  
          >
          <LikedUsersList likers={writingLikers} />
          </LikersModal>

          <LikersModal
          isOpen={showInformativeLikers}
          onClose={() => setShowInformativeLikers(false)}
          title="People Who Found This Educational"  
          >
          <LikedUsersList likers={informativeLikers} />
          </LikersModal>
        </div>
    </div>
  );
}

export default TravLikes;





 