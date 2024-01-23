import React, { useState, useEffect } from 'react';
import './ReportModal.css'

function ReportUserModal({ isOpen, onClose, onSubmit }) {
  const [complaint_text, setComplaint_text] = useState('');

  const handleInputChange = (e) => {
    setComplaint_text(e.target.value);
  };

  const handleSubmit = () => {
    // Perform validation on complaint_text here if needed
    onSubmit(complaint_text);
    setComplaint_text(''); // Clear the input field
    onClose();
  };

    // Close the modal if isOpen changes to false
    useEffect(() => {
      if (!isOpen) {
        setComplaint_text('');
      }
    }, [isOpen]);
  
    if (!isOpen) {
      return null; // Do not render the modal if it is not open
    }

  return (
    <div className={`reporting-user-modal ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <div className="reporting-modal-content">
          <h2>Report</h2>
          <textarea
            placeholder="Please describe your complaint in 500 characters or less."
            value={complaint_text}
            onChange={handleInputChange}
            maxLength={500}
          />
          <div className="modal-buttons">
            <button className='reporting-modal-btn' onClick={handleSubmit}>Submit</button>
            <button className='reporting-modal-btn' onClick={onClose}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportUserModal;
