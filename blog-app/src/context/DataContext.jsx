// DataContext.js
import { createContext, useState, useEffect } from 'react';

// Create a context with initial value (optional)
export const DataContext = createContext();

// Provider component
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://coderespite.com/api/blogsData.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
};
