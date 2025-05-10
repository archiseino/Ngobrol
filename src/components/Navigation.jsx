import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncLogoutUser } from '../states/auth/thunk';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: authUser } = useSelector((state) => state.auth || {});

  const handleLogout = () => {
    dispatch(asyncLogoutUser());
    navigate('/login');
  };

  return (
    <nav className='bg-blue-600 text-white shadow-lg'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        <Link to={authUser ? '/home' : '/'} className='text-2xl font-bold'>
          Discussion App
        </Link>

        <div className='flex items-center space-x-4'>
          {authUser ? (
            <>
              <Link to='/new' className='hover:bg-blue-700 px-3 py-2 rounded'>
                Create Thread
              </Link>
              <Link
                to='/leaderboard'
                className='hover:bg-blue-700 px-3 py-2 rounded'
              >
                Leaderboard
              </Link>
              <div className='flex items-center space-x-2'>
                <span className='font-medium'>{authUser?.name}</span>
                <button
                  onClick={handleLogout}
                  className='bg-red-500 hover:bg-red-600 px-3 py-1 rounded'
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to='/login' className='hover:bg-blue-700 px-3 py-2 rounded'>
                Login
              </Link>
              <Link
                to='/register'
                className='hover:bg-blue-700 px-3 py-2 rounded'
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
