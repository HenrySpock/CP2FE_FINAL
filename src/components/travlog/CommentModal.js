import axios from 'axios';  // Ensure you have imported axios
import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { UserContext } from '../user/UserContext';
// COMMENTONCOMMENT 
import postComment from './postComment';

function CommentModal({ onCommentSubmit, show, handleClose, travelog, comment_id, comments, setComments,  }) {
  console.log('travelog on commentmodal: ', travelog)
  const [commentText, setCommentText] = useState('');

  const { user } = useContext(UserContext); 
  if (!user) {
    return null; 
  }
  
  console.log('travelog_id: ', travelog.travelogId, 'comment_id: ', comment_id, 'user_id: ', user.user_id)
   
  const handleCancel = () => {
    setCommentText('');
    handleClose();
  };


  // COMMENTONCOMMENT
  const handleCommentSubmit = async () => {
    console.log('Parent ID: ', comment_id, 'Travelog ID: ', travelog.travelogId);
    const newComment = await postComment({ 
      user: user,
      user_id: user.user_id,  
      parentId: comment_id,
      travelog_id: travelog.travelogId,
      content: commentText,
    });
  };

const handleFormSubmit = (e) => {
  e.preventDefault();
  handleCommentSubmit();
};

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleFormSubmit}>
          <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} />
          <button type="submit">Submit Comment</button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        {/* <button onClick={handleCommentSubmit}>Submit Comment</button>  */}
        {/* <Button variant="secondary" onClick={handleClose}>Cancel</Button> */}
        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CommentModal;




  // const handleCommentSubmit = async () => {
  //   try {
  //     const postData = {
  //       user_id: user.user_id,
  //       content: commentText,
  //     };

  //     // Determine the key (travelog_id or parent_id) based on parentType
  //     if (travelog.travelogId) {
  //       postData.travelog_id = travelog.travelogId
  //     } else if (comment_id) {
  //       postData.parent_id = comment_id
  //     } else {
  //       throw new Error('Invalid parent type');
  //     }
      
  //     const response = await axios.post('http://localhost:5000/api/comment', postData);

  //     if (response.data.success) {
  //       console.log('Comment submitted successfully:', response.data.comment);
  //       // onCommentSubmit(response.data.comment);   
  //       console.log('response.data.comment from commentmodal: ', response.data.comment)
  //       onCommentSubmit(response.data.comment); 
  //       handleClose();  // Close the modal upon successful submission
  //       window.location.reload();
  //     } else {
  //       console.error('Failed to submit comment:', response.data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error submitting comment:', error);
  //   }
  // };