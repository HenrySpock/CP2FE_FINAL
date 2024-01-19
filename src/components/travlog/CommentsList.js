import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentItem from './CommentItem';
import './Comment.css'

// COMMENTONCOMMENT  

function CommentsList({ travelog, trip, profileUser, userData, contextUser, }) {
  const [comments, setComments] = useState([]);
  // console.log('comments on CommentsList: ', comments);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      let url = 'https://lgcbe.onrender.com/api/comments';
      let entityId, entityType;
  
      if (travelog && travelog.travelogId) {
        entityId = travelog.travelogId;
        entityType = 'travelogId';
        url += `?travelogId=${entityId}`;
      } else if (trip && trip.trip_id) {
        entityId = trip.trip_id;
        entityType = 'tripId';
        url += `?tripId=${entityId}`;
      } else {
        console.error('No travelogId or tripId provided');
        return;
      }
  
      try {
        const response = await axios.get(url);
        let comments = response.data;
  
        // Check block status for each comment author
        const fetchBlockStatusPromises = comments.map(async (comment) => {
          const blockResponse = await axios.get(`https://lgcbe.onrender.com/api/users/${comment.username}/block-status/${contextUser.username}`);
          return blockResponse.data.isBlocked ? null : comment;
        });
  
        const commentsWithBlockStatus = await Promise.all(fetchBlockStatusPromises);
  
        // Filter out null values (blocked comments)
        const filteredComments = commentsWithBlockStatus.filter(comment => comment !== null);
  
        setComments(filteredComments);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching comments for ${entityType}:`, error);
        setLoading(false);
      }
    };
  
    fetchComments();
  }, [travelog?.travelogId, trip?.tripId, travelog, trip, contextUser.username]);




  if (loading) {
    return <p>Loading comments...</p>;
  }
 
return (
  <div>
    
    {comments.length > 0 ? (
      <ul className="comment-list"> 
        {comments.map(comment => (
          <li key={comment.comment_id}>
            {/* Pass either travelogAuthor or tripAuthor depending on the context */}
            <CommentItem 
              comment={comment} 
              author={travelog ? travelog.User.username : trip ? trip.username : ''} 
              profileUser={profileUser}                        
              userData={userData}                        
              contextUser={contextUser}
            />
          </li>
        ))}
      </ul>
    ) : (
      <p className='uncommented' >No comments yet.</p>
    )}
  </div>
);
}

export default CommentsList;