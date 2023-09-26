import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ allowedRoles, children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  if (isAuthenticated && allowedRoles.includes(userRole)) {
    return children;
  } else {
    
    navigate('/'); //might replace with login in the future
    return null; 
  }
};

export default PrivateRoute;
