// App.jsx

import { useEffect, useState } from 'react';
import { auth } from './services/firebase';
import Category from './pages/Category';
import ReactLoading from "react-loading";

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
        <ReactLoading
        type={"spin"}
        color={"blue"}
        height={"100px"}
        width={"100px"}
      />
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
