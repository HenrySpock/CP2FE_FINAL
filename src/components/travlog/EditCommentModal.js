import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../user/UserContext';
 
function EditCommentModal({ show, handleClose, comment }) {
  const [updatedContent, setUpdatedContent] = useState(comment.content);
  const { user } = useContext(UserContext);  

  const handleUpdate = async () => {
    try {
      await axios.patch(`https://lgcbe.onrender.com/api/comments/${comment.comment_id}`, {
        content: updatedContent,
        user_id: user.user_id,
      });
      setUpdatedContent('');  // Clear the updatedContent state
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleModalClose = () => {
    setUpdatedContent('');  // Clear the updatedContent state
    handleClose();
  };

  return (
    <div> 
      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea 
            value={updatedContent} 
            onChange={(e) => setUpdatedContent(e.target.value)} 
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

}

export default EditCommentModal;
