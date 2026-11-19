import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Profile from './pages/Profile';
import Workspace from './pages/Workspace';
import Messages from './pages/Messages';
import NotFound from './pages/NotFound';

function ProtectedRoute({ children, isAuth }) {
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  const [isAuth, setIsAuth] = useState(() => localStorage.getItem('teamsync_auth') === 'true');

  useEffect(() => {
    if (isAuth) {
      localStorage.setItem('teamsync_auth', 'true');
    } else {
      localStorage.removeItem('teamsync_auth');
    }
  }, [isAuth]);

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={isAuth ? <Navigate to="/dashboard" replace /> : <Landing />} />
          <Route path="/login" element={isAuth ? <Navigate to="/dashboard" replace /> : <Login setAuth={setIsAuth} />} />

          {/* Protected routes with Layout */}
          <Route element={
            <ProtectedRoute isAuth={isAuth}>
              <Layout setAuth={setIsAuth} />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/messages" element={<Messages />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
