// DataContext.js
import { createContext, useState, useEffect } from 'react';
import jsonData from '../assets/blogData.json'; // Adjust the path as necessary
// Create a context with initial value (optional)
export const DataContext = createContext();

// Provider component
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  // console.log('DataContext:', jsonData);
  

  const fetchData = () => {
    try {
     
      
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
