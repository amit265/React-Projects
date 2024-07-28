// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import LogoutButton from './components/LogoutButton';
import './index.css';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-white text-lg font-bold">Chat App</Link>
            <div>
              {!user ? (
                <>
                  <Link to="/login" className="text-white mr-4">Login</Link>
                  <Link to="/register" className="text-white">Register</Link>
                </>
              ) : (
                <LogoutButton setUser={setUser} />
              )}
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/chat" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/chat" element={user ? <Chat user={user} setUser={setUser} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
