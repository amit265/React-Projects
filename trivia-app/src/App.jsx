// App.jsx

import React, { useEffect, useState } from 'react';
import { auth } from './services/firebase';
import Login from './components/Login';
import Game from './pages/Game'; // Assuming you have a Game component
import Category from './pages/Category';
import Header from './components/Header';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {/* {user ? <Category user={user} /> : <Login />} */}
      <Category user={user} />
    
    </div>
  );
};

export default App;
