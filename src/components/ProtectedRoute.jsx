import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { asyncCheckAuthUser } from '../states/auth/thunk';
import Loading from './Loading';
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isChecking, setIsChecking] = React.useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(asyncCheckAuthUser());
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  if (isChecking) {
    return <Loading />;
  }

  if (!user) {
    // Redirect to login page if not authenticated
    // Store the path they were trying to access for redirect after login
    return <Navigate to='/login' state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
