import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../user/UserContext';  
import io from 'socket.io-client'; 

function MessageModal({ activeConversation, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(''); 
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    const socket = io('http://localhost:5000', { query: { userId: user.user_id }});  

    socket.on('new-message', (message) => {  
      console.log('Received new message:', message);
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => socket.disconnect();   

  }, [user]);

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        // const response = await fetch(`http://localhost:5000/api/conversations/${activeConversation.user_id}/${activeConversation.friend_id}`);
        const response = await fetch(`http://localhost:5000/api/conversations/${user.user_id}/${activeConversation.user_id}`);

        const data = await response.json();
        if (data.success) {
          setMessages(data.messages);
        } else {
          console.error('Error fetching conversation:', data.error);
        }
      } catch (error) {
        console.error('Error fetching conversation:', error);
      }
    };

    fetchConversation();
  }, [activeConversation]);

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      try {
        const response = await fetch('http://localhost:5000/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // body: JSON.stringify({
          //   caller_Id: activeConversation.user_id,
          //   receiver_Id: activeConversation.friend_id,
          //   content: newMessage,
          // }),
          body: JSON.stringify({
            caller_id: user.user_id,  // assuming user is the currently logged-in user
            receiver_id: activeConversation.user_id,  // use user_id from the friend object
            content: newMessage,
          }),
        });
        console.log('caller_id (user.user_id): ', user.user_id, 'receiver_id (activeConversation.user_id): ', activeConversation.user_id)
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

  return (
    <div className="message-modal">
      <div className="header">
        <span>Conversation with {activeConversation.username}</span>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="message-thread">
        {messages.map(message => (
          <div key={message.message_id} className={`message ${message.caller_id === activeConversation.user_id ? 'sent' : 'received'}`}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input 
          type="text" 
          placeholder="Type a message..." 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}  // Update the state with the input value
        />
        <button onClick={handleSendMessage}>Send</button>  {/* Trigger message sending */}
      </div>
    </div>
  );
}

export default MessageModal;
