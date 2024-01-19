import React, { useState, useEffect, useContext } from 'react';
import CommentModal from './CommentModal'; 
import CommentsList from './CommentsList';
import { UserContext } from '../user/UserContext';
import { useNavigate } from 'react-router-dom'; 
import './Comment.css'

const Comments = ({ travelog, setTravelog, trip, setTrip, profileUser, userData, contextUser, }) => { 
  const [modalShow, setModalShow] = useState(false);
  const [comments, setComments] = useState([]);
  const { user: currentUser } = useContext(UserContext);   
  const navigate = useNavigate(); 

  useEffect(() => {
    if (currentUser) {
      // console.log('Checking block status...');
      const checkBlockStatus = async () => {
        // console.log('trip.user_id: ', trip.user_id)
        try {
          // Determine the authorId based on whether it's a travelog or trip
          const authorId = travelog ? travelog.user_id : trip ? trip.user_id : null; 
          if (!authorId) throw new Error('No author ID provided');
  
          const response = await fetch(`${API_BASE_URL}/travelog/api/users/${authorId}/block-status/${currentUser.user_id}`);
          if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);
          const data = await response.json();
          if (data.isBlocked) {
            navigate('/');
          }  
        } catch (error) {
          console.error('Error checking block status:', error);
        }
      };
      checkBlockStatus();
    }
  }, [travelog, trip, currentUser, navigate]); 

  function onCommentSubmit(newComment) {
    // console.log('onCommentSubmitfiring with: ', newComment)
    setComments((prevComments) => [newComment, ...prevComments]);
  }

 const handleClose = (callback) => {
    setModalShow(false);
    callback && callback();
  }; 

  return (
    <>
      <CommentModal 
        show={modalShow} 
        handleClose={handleClose} 
        travelog={travelog} 
        trip={trip} 
        onCommentSubmit={onCommentSubmit}
        comments={comments} 
        setComments={setComments}
      /> 
      <button className='comment-btn' onClick={() => setModalShow(true)}>Comment</button>
      <CommentsList 
      travelog={travelog} 
      comments={comments} 
      setComments={setComments} 
      trip={trip}                         
      profileUser={profileUser}                        
      userData={userData}                        
      contextUser={currentUser}/>
    </>
  );
};

export default Comments;
