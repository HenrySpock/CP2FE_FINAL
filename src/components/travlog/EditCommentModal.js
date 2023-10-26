import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

// src/components/EditCommentModal.js
function EditCommentModal({ show, handleClose, comment }) {
  const [updatedContent, setUpdatedContent] = useState(comment.content);

  const handleUpdate = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/comments/${comment.comment_id}`, {
        content: updatedContent,
      });
      setUpdatedContent('');  // Clear the updatedContent state
      handleClose();
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleModalClose = () => {
    setUpdatedContent('');  // Clear the updatedContent state
    handleClose();
  };

  return (
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
  );

}

export default EditCommentModal;
