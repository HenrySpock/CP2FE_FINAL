// src/components/Comment.jsprofileUser
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import EditCommentModal from './EditCommentModal';
import { UserContext } from '../user/UserContext';
import { Modal, Button } from 'react-bootstrap';

import checkForbiddenWords from './CheckForbiddenWords';

import ReportModal from '../interactions/ReportModal'

import CommentLikes from './CommentLikes'

import './Comment.css'

function CommentItem({ comment, contextUser,}) { 
  const [loading, setLoading] = useState(true);
  const [editModalShow, setEditModalShow] = useState(false); 

  const { user } = useContext(UserContext);
  
  const [newCommentContent, setNewCommentContent] = useState('');
  const [commentModalShow, setCommentModalShow] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const username = user?.username || ''; 

  const profileUser = comment.username;

  const userData = comment.comment;
 
  // console.log('On CommentItem.js - comment object: ', comment, 'comment.username: ', comment.username, 'comment_id: ', comment.comment_id, 'parent.username: ', comment.parent.username);
  
  // console.log('On CommentItem.js - contextUser: ', contextUser, 'username, which will be passed as currentUser: ', username, 'profileUser: ', profileUser, 'userData: ', userData)
  // Function to handle opening the report modal
  const openReportModal = () => {
    setIsReportModalOpen(true);
  };

  // COMMENTONCOMMENT 
  const handleCommentButtonClick = () => {
    // console.log('Parent ID:', comment.comment_id);
    setCommentModalShow(true);
  }; 

    const handleCommentSubmit = async () => {
      // console.log('From CommentItem - comment: ', comment, 'comment.comment.username: ', comment.comment.username);
    
      try {
        const forbiddenWordsFound = await checkForbiddenWords(newCommentContent);  
        if (forbiddenWordsFound.length > 0) {
          setErrorMessage('Let\'s change our message. Forbidden words found: ' + forbiddenWordsFound.join(', '));  
          return;
        }
    
        const postData = {
          parent_id: comment.comment_id,
          user_id: user.user_id,
          content: newCommentContent,
          username: user.username,
        };
    
        if (comment.comment.travelog_id) {
          postData.travelog_id = comment.comment.travelog_id;
        } else if (comment.comment.trip_id) {
          postData.trip_id = comment.comment.trip_id;
        }
    
        const response = await axios.post('https://lgcbe.onrender.com/api/comment', postData);
    
        if (response.data.success) {
          // console.log('Comment submitted successfully:', response.data.comment);
          setNewCommentContent('');  // Clear the new comment content
          setCommentModalShow(false);  // Hide the comment modal
          window.location.reload();
        }
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    };
    
  
    // submitreport
  const submitReport = async (complaint) => {

    try { 
      const reportPayload = { 
        user_id: user.user_id,
        complaint_text: complaint,
        reported_comment_id: comment.comment_id,
        username: user.username,  
        email: user.email,  
      };

      const response = await fetch(`https://lgcbe.onrender.com/feedback/api/comment/${comment.comment_id}/report`, { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportPayload),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      // console.log('Comment reported successfully');
    } catch (error) {
      console.error('Error reporting comment:', error);
    }
  };
 
  useEffect(() => {
    const fetchReplies = async () => { 
      try { 
        // Determine the URL based on whether the comment is related to a travelog or a trip
        let url = 'https://lgcbe.onrender.com/api/comments';
        if (comment.comment.travelog_id) {
          url += `?travelogId=${comment.comment.travelog_id}`;
        } else if (comment.comment.trip_id) {
          url += `?tripId=${comment.comment.trip_id}`;
        } else {
          console.error('No travelogId or tripId provided in the comment');
          return;
        }
  
        // const response = await axios.get(url);
        // console.log('Response from fetch: ', response.data); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching replies:', error);
        setLoading(false);
      }
    };
  
    fetchReplies();
  }, [comment.comment_id, comment.comment.travelog_id, comment.comment.trip_id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://lgcbe.onrender.com/api/comments/${comment.comment_id}?user_id=${user.user_id}`);
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
 
  const commentId = comment.comment_id
  
  return ( 
    <div className="comment" style={{ marginLeft: `${comment.comment.depth * 30}px` }}  id={`comment: ${commentId}`}>
      <div className="comment-header"> 

        <div className="comment-header">
            <span className="comment-author">
                <Link to={`/public_profile/${comment.username}`}>
                    {comment.username}
                </Link>
            </span>

            {comment.parent && comment.parent.username ? (
                <>
                    <span className="replying-to"> replying to </span> 
                    <span className="parent-author">
                        <Link to={`/public_profile/${comment.parent.username}`}>
                            {comment.parent.username}
                        </Link>
                    </span>
                    <span id='comment_parents' className='comment-id'>{comment.comment_id}</span>
                </>
            ) : (
              <>
                <span className="replying-to"> replying to </span> 
                <span className="parent-author">
                    <Link to={`/public_profile/${comment.comment.trip.username}`}>
                        {comment.comment.trip.username}
                    </Link>
                </span>
                <span id='comment_children' className='comment-id'>{comment.comment_id}</span>
              </>
            )}
        </div>


      </div>
      <div className="comment-body">
        {comment.content}
      </div>


      <CommentLikes
        currentUser={username}

        profileUser={profileUser}
        userData={userData}

        contextUser={contextUser}
        comment_id={comment.comment_id}
        comment={comment}
      />

      <div className='comment-item-row'>
            <button className='comment-item-btn margin-top' onClick={handleCommentButtonClick}>Comment</button>
            {user && user.user_id === comment.comment.user_id && (
              <div className='profile-user-comment-btn'>
                <button className='comment-item-btn' onClick={() => setEditModalShow(true)}>Edit</button>
                <button className='comment-item-btn' onClick={() => handleDelete(true)}>Delete</button> 
              </div>
            )} 

            {/* open report modal from report button: */}
            {user && (username !== profileUser) &&
              <button className='comment-item-btn margin-top' onClick={openReportModal}>Report Comment</button>
            }
            {/* ReportModal is now controlled by isReportModalOpen */}
            <ReportModal
              isOpen={isReportModalOpen}
              onClose={() => setIsReportModalOpen(false)}
              onSubmit={submitReport}
            />
 
            <EditCommentModal 
              show={editModalShow} 
              handleClose={() => setEditModalShow(false)} 
              comment={comment}
            />

            <Modal className='modal-shrink' show={commentModalShow} onHide={() => setCommentModalShow(false)}>
              <Modal.Header>
                <Modal.Title>Enter your comment</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} 
                <form className='comment-texarea-button'>
                  <textarea className='comment-textarea'
                    value={newCommentContent}
                    onChange={(e) => setNewCommentContent(e.target.value)} 
                  />
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button className='child-cancel-comment-btn' variant="secondary" onClick={() => setCommentModalShow(false)}>
                  Close
                </Button>
                <Button className='child-comment-submit-btn' variant="primary" onClick={handleCommentSubmit}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
      </div>

    </div>
  );
}

export default CommentItem;