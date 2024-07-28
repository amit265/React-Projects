// src/components/Login.jsx
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/chat');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-center mb-5">Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          className="w-full px-3 py-2 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login
        </button>
        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        {loading && <Spinner />}
      </form>
    </div>
  );
};

export default Login;
