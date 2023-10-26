// src/utils/postComment.js
import axios from 'axios';

// user_id: user.user_id,  
// parentId: comment_id,
// travelog_id: travelog.travelog_id,
// content: commentText,

async function postComment({ handleClose, onCommentSubmit, content, user, user_id, travelog_id, parentId }) {
  try {
    const postData = {
      user_id: user_id,
      content: content,
    };

    if (travelog_id) {
      postData.travelog_id = travelog_id;
    } else if (parentId) {
      postData.parent_id = parentId;
    } else {
      throw new Error('Invalid parent type');
    }
    
    const response = await axios.post('http://localhost:5000/api/comment', postData);

    if (response.data.success) { 
      // return response.data.comment;
      console.log('Comment submitted successfully:', response.data.comment);
      // onCommentSubmit(response.data.comment);   
      console.log('response.data.comment from commentmodal: ', response.data.comment)
      // onCommentSubmit(response.data.comment); 
      // handleClose();  // Close the modal upon successful submission
      window.location.reload();
    } else {
      console.error('Failed to submit comment:', response.data.error);
    }
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
}

export default postComment;
 

  //     // Determine the key (travelog_id or parent_id) based on parentType
  //     if (travelog.travelogId) {
  //       postData.travelog_id = travelog.travelogId
  //     } else if (comment_id) {
  //       postData.parent_id = comment_id
  //     } else {
  //       throw new Error('Invalid parent type');
  //     }
      
  //     const response = await axios.post('http://localhost:5000/api/comment', postData);

  //     if (response.data.success) {
  //       console.log('Comment submitted successfully:', response.data.comment);
  //       // onCommentSubmit(response.data.comment);   
  //       console.log('response.data.comment from commentmodal: ', response.data.comment)
  //       onCommentSubmit(response.data.comment); 
  //       handleClose();  // Close the modal upon successful submission
  //       window.location.reload();
  //     } else {
  //       console.error('Failed to submit comment:', response.data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error submitting comment:', error);
  //   }
  // };
