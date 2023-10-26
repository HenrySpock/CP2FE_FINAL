// src/components/CommentsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentItem from './CommentItem';

// COMMENTONCOMMENT 
// import { io } from 'socket.io-client';

function CommentsList({ travelog }) {
  const [comments, setComments] = useState([]);
  // console.log('comments on CommentsList: ', comments);
  const [loading, setLoading] = useState(true);

  // const travelogId = travelog.travelogId;
  // useEffect(() => {
  //   const socket = io('http://localhost:5000');  // replace with your server URL
  
  //   // Optionally, join a room for the current travelog if your server is set up this way
  //   socket.emit('join', { room: travelogId });
  
  //   // Listen for new comment notifications
  //   socket.on('new-notification', (notification) => {
  //     console.log('New notification received:', notification);
  //     // Assuming the notification contains the new comment data...
  //     setComments(prevComments => [notification.comment, ...prevComments]);
  //   });
  
  //   return () => {
  //     socket.disconnect();  // Clean up the socket connection on component unmount
  //   };
  // }, [travelogId]);
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Adjusted the URL to match the server endpoint
        const response = await axios.get(`http://localhost:5000/api/travelog/${travelog.travelogId}/comments`);
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [travelog.travelogId]);

  if (loading) {
    return <p>Loading comments...</p>;
  }

  return (
    <div>
      <h3>Comments:</h3>
      {comments.length > 0 ? (
        <ul className="comment-list">
          {comments.map(comment => (
            <li key={comment.comment_id}>
              <CommentItem comment={comment} travelogAuthor={travelog.User.username} />
            </li>
          ))}
 

        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}

export default CommentsList;
 
