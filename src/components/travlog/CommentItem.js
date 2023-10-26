// src/components/Comment.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import EditCommentModal from './EditCommentModal';
import { UserContext } from '../user/UserContext';
import { Modal, Button } from 'react-bootstrap';
 

function CommentItem({ comment, travelogAuthor, content, user_id, travelog_id}) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalShow, setEditModalShow] = useState(false); 

  const { user } = useContext(UserContext);
  
  const [newCommentContent, setNewCommentContent] = useState('');
  const [commentModalShow, setCommentModalShow] = useState(false);

  // COMMENTONCOMMENT 
  // const handleCommentButtonClick = () => {
    const handleCommentSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/comment', {
          travelog_id: comment.travelog_id,  
          parent_id: comment.comment_id,
          user_id: user.user_id,
          content: newCommentContent,
        });
    
        if (response.data.success) {
          console.log('Comment submitted successfully:', response.data.comment);
          setNewCommentContent('');  // Clear the new comment content
          setCommentModalShow(false);  // Hide the comment modal
          // Optionally, update the state or handle the new comment in some other way
          window.location.reload();
        }
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    };
    
  // COMMENTONCOMMENT
  // const handleCommentSubmit = async () => {
  //   console.log('Parent ID: ', comment_id, 'Travelog ID: ', travelog.travelogId);
  //   const newComment = await postComment({ 
  //     user: user,
  //     user_id: user.user_id,  
  //     parentId: comment_id,
  //     travelog_id: travelog.travelogId,
  //     content: commentText,
  //   });
  // };

  // const handleCommentButtonClick = () => {
  //   console.log('Parent ID:', comment.comment_id);
  //   const newCommentContent = 'This is a reply to the comment';  // Replace with the actual content of the new comment
  //   handleCommentSubmit(comment.comment_id, newCommentContent);
  // };

  const handleCommentButtonClick = () => {
    console.log('Parent ID:', comment.comment_id);
    setCommentModalShow(true);
  };

  useEffect(() => {
    const fetchReplies = async () => { 
      try {
        // const response = await axios.get(`http://localhost:5000/api/comments?parent_id=${comment.comment_id}`);
        const response = await axios.get(`http://localhost:5000/api/comments`);
        setReplies(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching replies:', error);
        setLoading(false);
      }
    };

    fetchReplies();
  }, [comment.comment_id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/comments/${comment.comment_id}`);
      if (response.data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (loading) {
    return <p>Loading replies...</p>;
  }
 
  return (
    <div className="comment">
      <div className="comment-header">
        {/* Wrap the username in a Link component */}
        <span className="comment-author">
          <Link to={`/public_profile/${comment.user.username}`}>
            {comment.user.username}
          </Link>
        </span>
        <span className="replying-to"> replying to </span>
        {/* Wrap the travelogAuthor in a Link component */}
        <span className="parent-author">
          <Link to={`/public_profile/${travelogAuthor}`}>
            {travelogAuthor}
          </Link>
        </span>
      </div>
      <div className="comment-body">
        {comment.content}
      </div>
      <button onClick={handleCommentButtonClick}>Comment</button>
      {user && user.user_id === comment.user_id && (
        <div>
          <button onClick={() => setEditModalShow(true)}>Edit</button>
          <button onClick={() => handleDelete(true)}>Delete</button> 
        </div>
      )}
      {/* <button onClick={() => setEditModalShow(true)}>Edit</button> */}
      <EditCommentModal 
        show={editModalShow} 
        handleClose={() => setEditModalShow(false)} 
        comment={comment}
      />

      <Modal show={commentModalShow} onHide={() => setCommentModalShow(false)}>
        <Modal.Header>
          <Modal.Title>Enter your comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            placeholder="Enter your comment here"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setCommentModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCommentSubmit}>
            Submit Comment
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default CommentItem;
