import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from '../components/ProtectedRoute';
import { asyncPreloadProcess } from '../states/preload/thunk';

// Import page components
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import ThreadDetailPage from '../pages/ThreadDetailPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import AddThreadPage from '../pages/AddThreadPage';

// Import Navigation component
import Navigation from '../components/Navigation';

const AppRoute = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth || {});

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to="/" replace />}
            />
            <Route
              path="/register"
              element={
                !authUser ? <RegisterPage /> : <Navigate to="/" replace />
              }
            />

            {/* Protected routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/threads/:id"
              element={
                <ProtectedRoute>
                  <ThreadDetailPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/new"
              element={
                <ProtectedRoute>
                  <AddThreadPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <LeaderboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default AppRoute;
