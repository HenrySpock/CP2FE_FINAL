// // 3. 
// MessageConversationModal.js 
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../user/UserContext';
import io from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize, faWindowMaximize, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';

import './Messaging.css'
 
function MessageConversationModal({ activeConversation, onClose, friends, isAdmin 
 }) { 
  // console.log('activeConversation on MessageConversationModal: ', activeConversation)
  // console.log('isAdmin: ', isAdmin)
  const [messages, setMessages] = useState([]); // Store messages of the active conversation
  const [newMessage, setNewMessage] = useState(''); // New message input

  const [isConversationMinimized, setIsConversationMinimized] = useState({}); // Track minimized state of each conversation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for showing delete confirmation modal
  const { user } = useContext(UserContext);
   
  // console.log('friends: ', friends)

  const markMessagesAsRead = (conversationId) => {
    // console.log('conversationId: ', conversationId)
    fetch(`http://localhost:5000/tally/mark-messages-as-read`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // if using token-based auth
      },
      body: JSON.stringify({
        userId: user.user_id,
        conversationId: conversationId
      }),
    })
    .then(response => response.json())
    .then(data => {
      // console.log('Messages marked as read:', data);
    })
    .catch(error => console.error('Error marking messages as read:', error));
  };

  const toggleConversationMinimize = (index) => {
    setIsConversationMinimized(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  }; 

  useEffect(() => {
    const socket = io('http://localhost:5000', { query: { userId: user.user_id }});  

    socket.on('new-message', (message) => {  
      // console.log('Received new message:', message);
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => socket.disconnect();   

  }, [user]);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/conversations/${user.user_id}/${activeConversation.user_id}`);

        const data = await response.json();
        if (data.success) {
          setMessages(data.messages);
          // console.log('data.messages: ', data.messages) 
        } else {
          console.error('Error fetching conversation:', data.error);
        }
      } catch (error) {
        console.error('Error fetching conversation:', error);
      }
    };
    
    fetchConversation();
  }, [activeConversation, user.user_id]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevents adding a new line in textarea
      if (newMessage.trim() !== '') {
        handleSendMessage();
        setNewMessage('');  
      }
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      markMessagesAsRead(activeConversation.user_id);
      try {
        // console.log('isWarning on POST request: ', activeConversation.isWarning)
        const response = await fetch('http://localhost:5000/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({
            caller_id: user.user_id,  
            receiver_id: activeConversation.user_id,  // use user_id from the friend object
            content: newMessage,
            warning: activeConversation.isWarning || false,
          }),
        });
        // console.log('caller_id (user.user_id): ', user.user_id, 'receiver_id (activeConversation.user_id): ', activeConversation.user_id)
        const data = await response.json();
        if (data.success) {
          setMessages(prevMessages => [...prevMessages, data.message]);
          setNewMessage('');  // Clear the message input
        } else {
          console.error('Error sending message:', data.error);
        }
        
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleDeleteConversation = async () => {
    try {
        const response = await fetch(`http://localhost:5000/api/conversations/${user.user_id}/${activeConversation.user_id}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        if (data.success) {
            setShowDeleteConfirm(false);  // Close the confirmation modal
            setMessages([]);  // Clear the messages
        } else {
            console.error('Error deleting conversation:', data.error);
        }
    } catch (error) {
        console.error('Error deleting conversation:', error);
    }
  }; 

  const renderDeleteConfirmationModal = () => {
    return (
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header>
          <Modal.Title>Delete Conversation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this conversation?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConversation}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div>
      {activeConversation && (
        <div className={`conversation-box ${isConversationMinimized['active'] ? 'minimized' : ''}`}>
          <div className="header">
            <span>Conversation with {activeConversation.username}</span>
            <button onClick={() => toggleConversationMinimize('active')}>
              <FontAwesomeIcon icon={isConversationMinimized['active'] ? faWindowMaximize : faWindowMinimize} />
            </button> 
            <button onClick={onClose}><FontAwesomeIcon icon={faWindowClose} /></button>
          </div>

          {!isConversationMinimized['active'] && (
            <div>
              <div className="message-thread">
                {messages.map(message => (
                  <div key={message.message_id} className={`message ${message.caller_id === user.user_id ? 'sent' : 'received'}`}>
                    {message.content}
                  </div>
                ))}
              </div>
              <div className="message-input-container"> 
                <div className="messaging-input">
                  <textarea
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onFocus={() => markMessagesAsRead(activeConversation.user_id)}
                      onKeyPress={handleKeyPress}
                      rows="2" 
                  ></textarea>                  
                </div> 
              </div>
              <button className='messaging-btn' onClick={handleSendMessage}>Send</button>  
 
              {!isAdmin === true && (
                <button className='messaging-btn' onClick={() => setShowDeleteConfirm(true)}>Delete Conversation</button>
              )}
 
              {renderDeleteConfirmationModal()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MessageConversationModal;