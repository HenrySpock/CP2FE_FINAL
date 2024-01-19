// PublicProfileLikes.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsClapping } from '@fortawesome/free-solid-svg-icons';
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

function CommentLikes({ currentUser, profileUser, userData, contextUser, comment_id, comment }) {

  const [likedComment, setLikedComment] = useState(false);
  const [commentLikers, setCommentLikers] = useState([]);
  const [showCommentLikers, setShowCommentLikers] = useState(false); 

  // console.log('On CommentLikes.js - currentUser: ', currentUser, 'profileUser: ', profileUser, 'userData: ', userData, 'contextUser: ', contextUser, 'comment_id: ', comment_id)
  const handleCommentLikersClick = () => {
    setShowCommentLikers(!showCommentLikers);
    // console.log('showCommentLikers: ', showCommentLikers)
    // console.log('commentLikers: ', commentLikers)
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
  
  useEffect(() => {
    // Fetch likers for a specific comment
    const fetchCommentLikers = async () => {
      try {
        const response = await fetch(`https://lgcbe.onrender.com/api/likers/comment?comment_id=${comment_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch comment likers');
        }
        const data = await response.json();
        // console.log('Comment Likers:', data);  
        setCommentLikers(data);
      } catch (error) {
        console.error('Error fetching comment likers:', error);
      }
    };
  
    if (comment_id) {
      fetchCommentLikers();
    }
  }, [comment_id]);


  useEffect(() => {
    // Define an async function inside useEffect
    const fetchLikeStatus = async () => {
      if (userData && contextUser && comment_id) {
        // console.log('fetch like status comment_id: ', comment_id);
        try {
          const response = await fetch(`https://lgcbe.onrender.com/api/likes/comment/check?user_id=${userData.user_id}&liker_id=${contextUser.user_id}&comment_id=${comment_id}`);
          if (!response.ok) {
            throw new Error('Failed to check like status');
          }
          const likeStatus = await response.json();
          setLikedComment(likeStatus.comment); 
          // console.log('LIKESTATUS: ', likeStatus)
          // console.log('CommentLikes - userData.user_id: ', userData.user_id, 'contextUser.user_id: ', contextUser.user_id, 'comment_id: ', comment_id)
        } catch (error) {
          console.error('Error fetching like status:', error);
        }
      }
    };
  
    // Always call the function unconditionally
    fetchLikeStatus();
  }, [userData, contextUser, comment_id, setLikedComment, ]);

  const toggleLikedComment = async () => {
    try {
      await toggleLike(userData.user_id, contextUser.user_id, 'comment');
      setLikedComment(prevState => !prevState);
    } catch (error) {
      console.error('Error toggling comment like:', error);
    }
  }; 

  // POST fetch for likes 
  const toggleLike = async (user_id, liker_id, liketype) => {
    // console.log('api/likes/comment POST comment: ', comment.comment_id)
    const comment_id = comment.comment_id
    try {
      const response = await fetch('https://lgcbe.onrender.com/api/likes/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, liker_id, liketype, comment_id })
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
          <div className="comment-like-buttons"> 
            <div className="tooltip">
              <button onClick={toggleLikedComment}>
                <FontAwesomeIcon icon={faHandsClapping} color={likedComment ? 'rgb(255, 170, 100)' : "black"} />
              </button>
              { contextUser.tooltips === true &&
                <span className="tooltip-text">Well said!</span>                 
              }
            </div>
          </div>
        )} 

        <div>
          {currentUser === profileUser && (
            <div className=""> 
                {commentLikers.length > 0 && (
                  <div className="like-badge">
                    <button disabled>
                      <FontAwesomeIcon icon={faHandsClapping} color={'gray'} />
                    </button> 


                      <span onClick={handleCommentLikersClick} className={`like-count ${showCommentLikers ? 'active' : ''}`}> 
                        <div className='likers-div tooltip'>
                          <span>{commentLikers.length}</span>&nbsp;<span>Liker(s)</span>
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
            isOpen={showCommentLikers}
            onClose={() => setShowCommentLikers(false)}
            title="People Who Found Your Writing Educational" 
          >
            <LikedUsersList likers={commentLikers} />
          </LikersModal>
        </div>
    </div>
  );
}

export default CommentLikes;

