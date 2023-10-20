import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

function Logout() {
  const { logout } = useContext(UserContext);  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
 
  return (
    <div>
      <p>Are you sure you want to log out?</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
