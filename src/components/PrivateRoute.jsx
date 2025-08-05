import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/Auth/AuthContext';

const PrivateRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/auth" />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} />;
  }

  return children;
};

export default PrivateRoute;
