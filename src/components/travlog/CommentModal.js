import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { UserContext } from '../user/UserContext';
// COMMENTONCOMMENT 
import PostComment from './PostComment';

import checkForbiddenWords from './CheckForbiddenWords';

import './Comment.css'


function CommentModal({ onCommentSubmit, show, handleClose, travelog, comment_id, comments, setComments, trip  }) {
  // console.log('travelog on commentmodal: ', travelog)
  // console.log('trip on commentmodal: ', trip)
  const [commentText, setCommentText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useContext(UserContext); 
  if (!user) {
    return null; 
  } 
   
  const handleCancel = () => {
    setCommentText('');
    handleClose();
  }; 

const handleFormSubmit = (e) => {
  e.preventDefault();
  handleCommentSubmit();
};

const handleCommentSubmit = async () => {
  let entityId, entityType;

  if (travelog && travelog.travelog_id) {
      entityId = travelog.travelog_id;
      entityType = 'travelog_id';
  } else if (trip && trip.trip_id) {
      entityId = trip.trip_id;
      entityType = 'trip_id';
  } else {
      console.error('No travelog_id or trip_id provided');
      setErrorMessage('Error: No travelog or trip information provided.');
      return;
  }

  // console.log(`Parent ID: ${comment_id}, ${entityType}: `, entityId); 

  try {
      const forbiddenWordsFound = await checkForbiddenWords(commentText);
      if (forbiddenWordsFound.length > 0) {
          setErrorMessage('Let\'s change our message. Forbidden words found: ' + forbiddenWordsFound.join(', '));
          return;
      }

      await PostComment({ 
          user: user,
          user_id: user.user_id,  
          parentId: comment_id,
          [entityType]: entityId,
          content: commentText,
      });
      //this was originally set to a variable for console.logging
 
  } catch (error) {
      console.error('Error submitting comment:', error);
      setErrorMessage(`Error submitting comment: ${error.message}`);
  }
};


  return (
    
    <Modal className='modal-shrink' show={show} onHide={handleClose}>
      
      <Modal.Header>
        <Modal.Title>Enter your comment</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}  
        <form className='comment-texarea-button' onSubmit={handleFormSubmit}>
          <textarea className='comment-textarea' value={commentText} onChange={(e) => setCommentText(e.target.value)} /> 
          <button className='comment-modal-submit-btn submit-comment-margin' type="submit">Submit</button>
        </form>
      </Modal.Body>
      
      <Modal.Footer> 
        <Button className='cancel-comment-btn' variant="secondary" onClick={handleCancel}>Cancel</Button>
      </Modal.Footer>
      
    </Modal>
    
  );
}

export default CommentModal;


 