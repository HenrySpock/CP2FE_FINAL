
import axios from 'axios';

async function PostComment({ handleClose, onCommentSubmit, content, user, user_id, travelog_id, parentId, trip_id }) {
  try {

    const postData = {
        user_id: user_id,
        username: user.username,
        content: content,
    };
    
    if (travelog_id) {
        postData.travelog_id = travelog_id;
    } else if (trip_id) {
        postData.trip_id = trip_id;
    } else if (parentId) {
        postData.parent_id = parentId;
    } else {
        throw new Error('Invalid parent type');
    }
    
    const response = await axios.post('http://localhost:5000/api/comment', postData);

    if (response.data.success) {  
      // console.log('Comment submitted successfully:', response.data.comment); 
      // console.log('response.data.comment from commentmodal: ', response.data.comment) 
      window.location.reload();
    } else {
      console.error('Failed to submit comment:', response.data.error);
    }
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
}

export default PostComment;
 
