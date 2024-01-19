// Import necessary dependencies
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './TravDet.css'

// Define the AdminDelete component
function AdminDelete({ travelogId, navigate }) {
  // State to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // Function to handle admin deletion button click
  const handleAdminDeletion = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setShowModal(false);
  };

  // Function to handle confirmation of deletion
  const handleConfirmDeletion = async () => {
    try {
      const response = await fetch(`https://lgcbe.onrender.com/travelog/api/travelog/${travelogId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If the deletion is successful, navigate back to the admin panel
        navigate('/admin');  
      } else {
        // Handle error (e.g., show an error message)
        console.error('Error deleting travelog:', await response.text());
      }
    } catch (error) {
      console.error('Error deleting travelog:', error);
    }

    setShowModal(false);  // Close the modal after deletion (or error)
  };

  // Render the component
  return (
    <div>
      <button className="trav-det-btn non-user" onClick={handleAdminDeletion}>Admin Delete</button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Only do this after communicating with the author. Are you sure you want to delete this travelog?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDeletion}>
            Confirm Deletion
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
 
export default AdminDelete;
