import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../user/UserContext';

import './Permissions.css'

function Permissions() { 
  const [grantAccess, setGrantAccess] = useState([]);
  const [revokeAccess, setRevokeAccess] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const entityId = queryParams.get('id');
  const entityType = queryParams.get('entity');


  useEffect(() => {
    const fetchFriendsAndPermissions = async () => {
      try {
        const friendsResponse = await axios.get(`https://lgcbe.onrender.com/api/friends/${user.user_id}`);
        const friendsList = friendsResponse.data;

        const grantAccessList = [];
        const revokeAccessList = [];

        for (const friend of friendsList) {
          // Updated endpoint to check permissions for specific entityId and entityType
          const permissionResponse = await axios.get(`https://lgcbe.onrender.com/api/permissions/specific/${friend.user_id}`, {
            params: { entityId: entityId, entityType: entityType }
          });
          const hasSpecificAccess = permissionResponse.data.hasAccess;
          // console.log('hasSpecificAccess: ', hasSpecificAccess)
          if (hasSpecificAccess) {
            revokeAccessList.push(friend);
          } else {
            grantAccessList.push(friend);
          }
        }

        setGrantAccess(grantAccessList);
        setRevokeAccess(revokeAccessList);
      } catch (error) {
        console.error('Error fetching friends or permissions:', error);
      }
    };

    if (user && entityId && entityType) {
      fetchFriendsAndPermissions();
    }
  }, [user, entityId, entityType]);
  



  const handleToggleAccess = (friendId) => {
    const friendInGrant = grantAccess.find(f => f.user_id === friendId);
    const friendInRevoke = revokeAccess.find(f => f.user_id === friendId);

    if (friendInGrant) {
      // Move from Grant to Revoke
      setGrantAccess(prev => prev.filter(f => f.user_id !== friendId));
      setRevokeAccess(prev => [...prev, friendInGrant]);
    } else if (friendInRevoke) {
      // Move from Revoke to Grant
      setRevokeAccess(prev => prev.filter(f => f.user_id !== friendId));
      setGrantAccess(prev => [...prev, friendInRevoke]);
    }
  };

  const handleGrant = async () => {
    // Update permissions in the database
    const updatedPermissions = [...grantAccess, ...revokeAccess].map(friend => ({
      granter_id: user.user_id,
      grantee_id: friend.user_id,
      [`${entityType}_id`]: entityId,
      action: revokeAccess.includes(friend) ? 'grant' : 'revoke'
    }));

    try {
      await axios.patch('https://lgcbe.onrender.com/permissions/update', updatedPermissions);
      const detailPage = entityType === 'travelog' ? 'trav_det' : 'trip_det';
      navigate(`/${detailPage}/${entityId}`); // Navigate back to the relevant page
    } catch (error) {
      console.error('Error updating permissions:', error);
    }
  };

  const handleCancel = () => {
    if (entityType === 'travelog') {
      navigate(`/trav_det/${entityId}`);
    } else {
      navigate(`/${entityType}_det/${entityId}`);
    }
  };


  return (
    <div className='permissions-slate'>
      <h2>Grant Access</h2>
      <div className='permissions-selectable'>
        {grantAccess.map(friend => (
          
            <div className='permissions-card' key={friend.user_id} onClick={() => handleToggleAccess(friend.user_id)}>
              <img src={friend.avatar} alt={`${friend.username}'s avatar`} />
              <Link to={`/public_profile/${friend.username}`} className="friend-username-link">
                <p className='friend-username-text'>{friend.username}</p>
              </Link>
            </div> 
          
        ))}
      </div>
      
      <h2>Revoke Access</h2>
      <div className='permissions-selectable'>
        {revokeAccess.map(friend => (
          
            <div className='permissions-card' key={friend.user_id} onClick={() => handleToggleAccess(friend.user_id)}>
              <img src={friend.avatar} alt={`${friend.username}'s avatar`} />
              <Link to={`/public_profile/${friend.username}`} className="friend-username-link">
                <p className='friend-username-text'>{friend.username}</p>
              </Link>
            </div> 
          
        ))}
      </div>

      <button onClick={handleGrant}>Grant / Revoke</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default Permissions;
